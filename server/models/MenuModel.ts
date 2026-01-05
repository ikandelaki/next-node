import ResourceConnection from "../database/ResourceConnection.ts";

export default class MenuModel {
    public create() {
        const resourceConnection = new ResourceConnection();

        resourceConnection.setTableName('menu')
    }
}