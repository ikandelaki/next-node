import BaseRepository from "./BaseRepository";

export default class MenuRepository extends BaseRepository {
    constructor() {
        super();

        this.tableName = 'menu';
    }
}