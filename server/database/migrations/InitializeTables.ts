import { type DataPatchInterface } from '../interface/DataPatchInterface.ts';
import ResourceConnection from '../ResourceConnection.ts';
import { TYPE_VARCHAR } from '../ResourceConnection.ts';

class InitializeTables implements DataPatchInterface {
    public async apply() {
        await this.createMenuTable();
    }

    private async createMenuTable() {
        const resourceConnection = new ResourceConnection();

        await resourceConnection.createTable('menu');
        
        await resourceConnection
            .addColumns([
                { name: 'code', type: TYPE_VARCHAR },
                { name: 'title', type: TYPE_VARCHAR }
            ]);
    }
}

export default InitializeTables;