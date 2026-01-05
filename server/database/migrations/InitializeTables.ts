import { type DataPatchInterface } from '../interface/DataPatchInterface.ts';
import ResourceConnection from '../ResourceConnection.ts';
import { TYPE_VARCHAR } from '../ResourceConnection.ts';

class InitializeTables implements DataPatchInterface {
    public async apply() {
        await this.createMenuTable();
        await this.createMenuItemTable();
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

    private async createMenuItemTable() {
        const resourceConnection = new ResourceConnection();

        await resourceConnection.createTable('menu_item');
        
        await resourceConnection
            .addColumns([
                { name: 'code', type: TYPE_VARCHAR },
                { name: 'title', type: TYPE_VARCHAR },
                { name: 'href', type: TYPE_VARCHAR },
                { name: 'parent_id', type: TYPE_VARCHAR, constraint: 'REFERENCES menu(entity_id)' }
            ]);
    }
}

export default InitializeTables;