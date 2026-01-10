import BaseRepository from "./BaseRepository.js";

export default class MenuRepository extends BaseRepository {
    constructor() {
        super();

        this.tableName = 'menu';
    }
}