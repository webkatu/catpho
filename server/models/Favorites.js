import { MySQLModel } from './index.js';

export default class Favorites extends MySQLModel {
	createTable() {
		const sql = `create table ${this.tableName} (
			id int not null auto_increment primary key,
			userId int not null,
			contentId int not null
		);`;

		return this.query(sql);
	}

	isFavorite(userId, contentId) {
		return (async () => {
			const [ results ] = await this.select(
				['id'],
				'userId = ? and contentId = ?',
				[userId, contentId]);
			return results.length !== 0
		})();
	}

	remove(userId, contentId) {
		const sql = `delete from ${this.tableName} where userId = ? and contentId = ?;`;

		return this.query(sql, [userId, contentId]);
	}
}