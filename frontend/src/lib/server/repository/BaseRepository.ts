import ResourceConnection from "../database/ResourceConnection";

export default class BaseRepository {
    protected tableName: string = '';
    protected fields: Array<string> = [];

    /**
     * Get all rows from the database
     */
    public async getAll() {
        if (!this.tableName) {
            throw new Error('Please provide a proper tableName.');
        }

        const resourceConnection = new ResourceConnection();
        const connection = await resourceConnection.getConnection();
        if (!connection) throw new Error('Database connection not available');

        try {
            if (!this.fields?.length) {
                // mysql2 (and similar clients) return [rows, fields]
                const [rows] = await connection.query(`SELECT * FROM ${this.tableName}`) as any;
                return rows ?? [];
            }

            const parsedFields = this.fields.join(',');
            const [rows] = await connection.query(`SELECT ${parsedFields} FROM ${this.tableName}`) as any;
            return rows ?? [];
        } catch (err) {
            console.error('Repository getAll error', err);
            throw err;
        }
    }

    /**
     * Select which fields/columns need to be returned by database queries
     * -- Used by methods like getAll, getById, etc.
     */
    public addFieldToSelect(fields: string | string[]): void {
        if (typeof fields === 'string') {
            this.fields.push(fields);

            return;
        }

        this.fields.push(...fields);
    }
}