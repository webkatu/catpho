import { MySQLModel } from './index.js';
import Contents from './Contents.js';

export default class Favorites extends MySQLModel {
	createTable() {
		const sql = `create table ${this.tableName} (
			id int not null auto_increment primary key,
			userId int not null,
			contentId int not null
		);`;

		return this.query(sql);
	}

	async deleteByWithdrawal(userId) {
		return await this.delete(
			`userId = ? or contentId in (select id from ?? where userId = ?)`,
			[userId, new Contents().tableName, userId],
		);
	}

	async isFavorite(userId, contentId) {
		const result = await this.selectOnce(
			['id'],
			'userId = ? and contentId = ?',
			[userId, contentId]);
		return results !== null;
	}
}