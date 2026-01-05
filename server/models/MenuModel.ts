import ResourceConnection from "../database/ResourceConnection.ts";
import BaseModel from "./BaseModel.ts";
import { type MenuItemsType } from "../types/MenuItemsType.ts";

export default class MenuModel extends BaseModel {
    protected title: string = '';
    protected code: string = '';
    protected items: MenuItemsType[] = [];

    constructor() {
        super();

        this.mainTableName = 'menu';
    }

    public setTitle(title: string) {
        this.title = title;

        return this;
    }

    public getTitle() {
        return this.title;
    }

    public setCode(code: string) {
        this.code = code;

        return this;
    }

    public getCode() {
        return this.code;
    }

    public setItems(items: MenuItemsType[]) {
        this.items = items;

        return this;
    }

    public getItems() {
        return this.items;
    }

    public async save() {
        const resourceConnection = new ResourceConnection();
        resourceConnection.setTableName(this.getMainTableName());

        const query = `INSERT INTO ${this.getMainTableName()} (title, code) VALUES ('${this.getTitle()}', '${this.getCode()}');`
        const data = await resourceConnection.execute(query);
        const items = this.getItems();

        if (items?.length) {
            resourceConnection.setTableName('menu_item')
            let query = `INSERT INTO menu_item (title, href) VALUES `;

            items.forEach(({ title, link }) => {
                query += `('${title}', '${link}')`;
            })

            query += ';';
            const result = resourceConnection.execute(query);
            console.log('>> result', result);
        }
        
        console.log('>> data', data);
    }
}