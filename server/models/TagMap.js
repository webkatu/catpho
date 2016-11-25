import { MySQLModel } from './index.js';

export default class TagMap extends MySQLModel {
	createTable() {
		const sql = `create table ${this.tableName} (
			id int not null auto_increment primary key,
			contentId int not null,
			tagId int not null
		);`;

		return this.query(sql);
	}
}