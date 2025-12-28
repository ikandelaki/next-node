import ResourceConnection from './database/ResourceConnection.ts';

const resourceConnection = new ResourceConnection();
resourceConnection.init();
resourceConnection.runMigrations();