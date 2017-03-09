import { MySQLModel } from './index.js';
import Users from './Users.js';

export default class Comments extends MySQLModel {
	createTable() {
		const sql = `create table ${this.tableName} (
			id int not null auto_increment primary key,
			contentId int not null,
			userId int not null,
			comment text
		);`;

		return this.query(sql);
	}

	selectComments(contentId) {
		const sql = `select c.id, c.userId, c.comment, u.userName, u.nickname, u.avatar from ${this.tableName} c, ${new Users().tableName} u where c.contentId = ? and c.userId = u.id;`;
		return this.query(sql, [contentId]);
	}
}