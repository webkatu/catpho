import mysql from '../utils/mysqlConnection';

export default class Tagmap {
	constructor() {
		this.tableName = 'tagmap';
	}

	createTable() {
		const sql = `create table ${this.tableName} (
			id int not null auto_increment primary key,
			tag_id int not null,
			content_id int not null
		);`

		return new Promise((res, rej) => {
			mysql.query(sql, (...args) => {
				res(...args);
			});
		});
	}
}