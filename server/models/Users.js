import config from '../config.js';
import bcrypt from '../common/bcrypt.js';
import { MySQLModel } from './index.js';

export default class Users extends MySQLModel {
	async createTable() {
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

		return await this.query(sql);
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

	async activate(id) {
		return await this.update({ activation: 1 }, '?? = ?', { id });
	}
}