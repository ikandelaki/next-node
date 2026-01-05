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
        return this;
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

        const data = await resourceConnection.setQuery(
            `INSERT INTO ${this.getMainTableName()} (title, code) VALUES (${this.getTitle()}, ${this.getCode()})`
        ).execute();

        // if (this.getItems()?.length) {
        //     resourceConnection.setTableName('menu_item')
        //     resourceConnection.setQuery(
        //         `INSERT INTO menu_item (title, href) VALUES `
        //     )

        //     this.getItems().forEach(({ title, link }) => {
        //         resourceConnection.setQuery(`(${title}, ${link})`)
        //     })

        //     resourceConnection.setQuery(`;`);
        //     const result = resourceConnection.execute();
        //     console.log('>> result', result);
        // }
        
        console.log('>> data', data);
    }
}