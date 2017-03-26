import config from '../config.js';
import bcrypt from '../common/bcrypt.js';
import { MySQLModel } from './index.js';

export default class Users extends MySQLModel {
	createTable() {
		const sql = `create table ${this.tableName} (
			id int not null auto_increment primary key,
			email varchar(255) not null unique,
			userName varchar(255) not null unique,
			password varchar(255) not null,
			nickname varchar(255),
			avatar varchar(255),
			activation tinyint(1),
			created datetime,
			modified timestamp
		);`;

		return this.query(sql);
	}

	async register(body) {
		const { email, userName, password } = body;
		const data = {
			email,
			userName,
			password: await bcrypt.createHash(password),
			nickname: userName,
			avatar: config.defaultAvatarFileName,
			activation: 0,
			created: new Date(),
		};

		return await this.insert(data);
	}

	async authenticate(emailOrUserName, password) {
		const user = await this.selectOnce(
			['id', 'email', 'userName', 'password', 'nickname', 'avatar', 'activation'],
			'email = ? or userName = ?',
			[emailOrUserName, emailOrUserName],
		);
		if(user === null) return null;

		const same = await bcrypt.compare(password, user.password);
		if(same === false) return null;
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