import { MySQLModel } from './index.js';
import Users from './Users.js';
import config from '../config.js';

export default class Comments extends MySQLModel {
	async createTable() {
		const sql = `create table ${this.tableName} (
			id int not null auto_increment primary key,
			contentId int not null,
			userId int not null,
			comment text
		);`;

		return await this.query(sql);
	}

	async selectComments(contentId) {
		const sql = `select c.id, c.userId, c.comment, u.userName, u.nickname, u.avatar from ${this.tableName} c join ${new Users().tableName} u on c.userId = u.id where c.contentId = ?;`;
		const [ results ] = await this.query(sql, [contentId]);
		results.forEach((result) => {
			result.avatar = `${config.avatarsUrl}/${result.avatar}`;
		});
		return results;
	}
}