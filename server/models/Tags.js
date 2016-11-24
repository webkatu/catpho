import mysql from '../common/mysqlConnection';

export default class Tags {
	constructor() {
		this.tableName = 'tags';
	}

	createTable() {
		const sql = `create table ${this.tableName} (
			id int not null auto_increment primary key,
			name varchar(255)
		);`

		return new Promise((res, rej) => {
			mysql.query(sql, (...args) => {
				res(...args);
			});
		});
	}
}