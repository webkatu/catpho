import mysql from '../utils/mysqlConnection';
import { MySQLModel } from './index.js';

export default class Users extends MySQLModel {
	createTable() {
		const sql = `create table ${this.tableName} (
			id int not null auto_increment primary key,
			_id varchar(255) not null,
			password varchar(255) not null,
			mail varchar(255),
			created datetime,
			modified timestamp
		);`;

		return this.query(sql);
	}
}