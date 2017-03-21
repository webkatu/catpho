import bcrypt from 'bcrypt';
import mysql from '../common/mysqlConnection';
import { MySQLModel } from './index.js';

export default class Users extends MySQLModel {
	createTable() {
		const sql = `create table ${this.tableName} (
			id int not null auto_increment primary key,
			email varchar(255) not null unique,
			userName varchar(255) not null unique,
			password varchar(255) not null,
			nickname varchar(255),
			avatar varchar(255) default 'default.jpg',
			activation tinyint(1),
			created datetime,
			modified timestamp
		);`;

		return this.query(sql);
	}

	async authenticate(emailOrUserName, password) {
		const user = await this.selectOnce(
			['id', 'email', 'userName', 'password', 'nickname', 'avatar'],
			'email = ? or userName = ?',
			[emailOrUserName, emailOrUserName],
		);
		if(user === null) return null;

		const isValid = await new Promise((res, rej) => {
			bcrypt.compare(password, user.password, (err, isValid) => {
				if(err) return rej(err);
				res(isValid);
			});
		});
		if(isValid === false) return null;
		delete user.password;
		return user;
	}

	selectUserByEmailOrUserName(emailOrUserName) {
		const sql = `select * from ${this.tableName} where email = ? or userName = ?;`;
		return this.query(sql, [emailOrUserName, emailOrUserName]);
	}

	exists(col, val) {
		const sql = `select id from ${this.tableName} where ?? = ?;`;
		return (async () => {
			const [results] = await this.query(sql, [col, val]);
			return results.length !== 0;
		})();
	}

	activate(id) {
		const sql = `update ${this.tableName} set activation = 1 where id = ?;`;
		return this.query(sql, [id]);
	}

	updateUser(setData, id) {
		const wherePhrase = 'where ?? = ?';
		const whereData = { id };

		return this.update(setData, wherePhrase, whereData);
	}

	updateUserWithPassword(setData, id, password) {
		const wherePhrase = 'where ?? = ? and ?? = ?';
		const whereData = { id, password };

		return this.update(setData, wherePhrase, whereData);
	}
}