import ResourceConnection from "../database/ResourceConnection";

export default class BaseModel {
    protected mainTableName = '';
    protected entity_id: number | null = null;

    public getById(id: string | number) {
        // TODO
    }

    public getMainTableName() {
        return this.mainTableName;
    }

    public setMainTableName(tableName: string) {
        this.mainTableName = tableName;

        return this;
    }

    public save() {
        const resourceConnection = new ResourceConnection();
        resourceConnection.setTableName(this.getMainTableName());
        // TODO
    }
}