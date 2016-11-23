import { MySQLModel } from './index.js';

export default class Contents extends MySQLModel {
	createTable() {
		const sql = `create table ${this.tableName} (
			id int not null auto_increment primary key,
			userId int not null,
			filename varchar(255),
			mimetype varchar(255),
			name varchar(255),
			sex enum('none', 'male', 'female'),
			age int,
			tweet varchar(255),
			created datetime,
			modified timestamp
		);`;

		return this.query(sql);
	}

	selectAtPage(columns, page, limit) {

		const offset = (page - 1) * limit;
		const sql = `select ?? from ${this.tableName} order by id desc limit ? offset ?;`;
		return this.query(sql, [columns, limit, offset]);
	}

}