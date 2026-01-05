import mysql from 'mysql2/promise';
import { type Connection } from 'mysql2/promise';
import dotenv from 'dotenv';
import InitializeTables from './migrations/InitializeTables.ts';

export const TYPE_VARCHAR = 'VARCHAR(255)';

type MySQLConstraint =
    | 'NOT NULL'
    | 'NULL'
    | 'UNIQUE'
    | 'PRIMARY KEY'
    | 'FOREIGN KEY'
    | 'AUTO_INCREMENT'
    | 'UNSIGNED'
    | 'BINARY'
    | `DEFAULT ${string}`
    | `CHECK (${string})`
    | `REFERENCES ${string}(${string})`
    | string;

const DEFAULT_PORT = 3306;

/**
 * Class ResourceConnection
 * - Can be used for database manipulation and queries.
 * @init - Initialize the database connection
 * @getConnection - Get connection to the database
 * @initDatabase - initialize the database (only used for the first time to create the DB)
 * @runMigrations - TODO::Should get all the files under migrations directory and run the apply() methods
 * -- It should also store in a separate db table the classes that already ran, to avoid them running every time npm start is run
 * @setQuery - Set current sql query to the object, later to be executed on the DB.
 * @clearQuery - Clear current query
 * @getQuery - Get current query
 * @setTablename - Set the table name to which we want to run queries on
 * @getTablename - Get which table we are running queries on
 * @createTable - Create a database table. It automatically initializes the entity_id column
 * @addColumn - Add column to the table.
 * @addColumns - Add multiple columns to the table.
 * @execute - Execute current sql query (stored in this.query)
 * @columnExists - Check if the column already exists.
 */
class ResourceConnection {
    private connection: Connection | null = null;
    private query: string = '';
    private tableName: string | null = null;

    async init() {
        if (this.connection) {
            return this.connection;
        }

        try {
            const {
                parsed: {
                    DB_HOST = '',
                    DB_USER = '',
                    DB_PASSWORD = '',
                    DB_PORT = DEFAULT_PORT
                } = {}
            } = dotenv.config() || {};

            this.connection = await mysql.createConnection({
                host: DB_HOST,
                user: DB_USER,
                password: DB_PASSWORD,
                port: Number(DB_PORT)
            });

            await this.initDatabase();

            return this.connection;
        } catch (error) {
            this.connection = null;

            console.log('>> Database connection error: ', error)
        }
    }

    public async getConnection() {
        if (this.connection) {
            return this.connection;
        }

        return await this.init();
    }

    private async initDatabase() {
        const {
            parsed: {
                DB_NAME = ''
            } = {}
        } = dotenv.config() || {};

        if (!DB_NAME) {
            throw new Error('Please provide a proper DB_NAME value');
        }

        const connection = await this.getConnection();

        if (!connection) {
            throw new Error('No connection available to initialize database');
        }

        try {
            // Create the database if it doesn't exist and set it as the current schema
            await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
            await connection.query(`USE \`${DB_NAME}\``);
        } catch (error) {
            throw new Error(`Could not create or select database ${DB_NAME}: ${error}`);
        }
    }

    public async runMigrations() {
        const initTables = new InitializeTables();
        await initTables.apply();
    }

    public setQuery(query: string = '') {
        this.query = this.query ? this.query + query : query;

        return this;
    }

    public clearQuery() {
        this.query = '';

        return this;
    }

    public getQuery() {
        return this.query;
    }

    public setTableName(tableName: string) {
        this.tableName = tableName;

        return this;
    }

    public getTableName() {
        return this.tableName;
    }

    public async createTable(tableName: string) {
        if (!tableName) {
            return this;
        }
        
        this.setTableName(tableName);
        await this.execute(`CREATE TABLE IF NOT EXISTS ${tableName}(entity_id varchar(255) PRIMARY KEY);`);
        
        return this;
    }

    public async addColumn(columnName: string, type: string, constraint?: MySQLConstraint) {
        const tableName = this.getTableName();

        if (!tableName) {
            throw Error('Provide a proper table name before trying to add a column');
        }

        const constraintSql = constraint ? ` ${constraint}` : '';

        await this.execute(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${type}${constraintSql};`);

        return this;
    }

    public async addColumns(columns: Array<{name: string, type: string, constraint?: MySQLConstraint}>) {
        const tableName = this.getTableName();

        if (!tableName) {
            throw new Error('Provide a proper table name before trying to add a column');
        }

        for (const { name, type, constraint } of columns) {
            const exists = await this.columnExists(tableName, name);

            if (exists) {
                continue;
            }

            const constraintSql = constraint ? ` ${constraint}` : '';
            await this.execute(
                `ALTER TABLE ${tableName} ADD COLUMN ${name} ${type}${constraintSql};`
            );
        }

        return this;
    }

    public async execute(query: string = '') {
        if (!query) {
            return this;
        }

        const connection = await this.getConnection();

        return connection?.execute(query);;
    }

    private async columnExists(table: string, column: string): Promise<boolean> {
        const connection = await this.getConnection();

        const [rows] = await connection!.execute(
            `
            SELECT COUNT(*) as count
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_SCHEMA = DATABASE()
                AND TABLE_NAME = ?
                AND COLUMN_NAME = ?
            `,
            [table, column]
        );

        return (rows as any)[0].count > 0;
    }
}

export default ResourceConnection;
