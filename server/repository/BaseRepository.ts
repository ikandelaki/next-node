import ResourceConnection from "../database/ResourceConnection.ts";

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

        try {
            if (!this.fields?.length) {
                const data = await connection?.query(`SELECT * FROM ${this.tableName}`);

                return data;
            }

            const parsedFields = this.fields.join(',');
            const data = await connection?.query(`SELECT ${parsedFields} from ${this.tableName}`);
            return data;
        } catch (err) {
            console.log('>> Repository getAll', err);
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