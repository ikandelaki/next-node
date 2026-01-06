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
        const connection = await resourceConnection.getConnection();
        const items = this.getItems();

        if (!items?.length) {
            throw new Error('Menu must have at least one link item');
        }

        const [menuResult] = await connection!.execute(
            `INSERT INTO ${this.getMainTableName()} (title, code) VALUES (?, ?);`,
            [this.getTitle(), this.getCode()]
        );
        
        const menuId = (menuResult as any).insertId;

        
        for (const { title, link } of items) {
            await connection!.execute(
                'INSERT INTO menu_item (title, href, parent_id) VALUES (?, ?, ?)',
                [title, link, menuId]
            );
        }
    }
}