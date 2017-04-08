import { MySQLModel } from './index.js';
import Contents from './Contents.js';

export default class TagMap extends MySQLModel {
	async createTable() {
		const sql = `create table ${this.tableName} (
			id int not null auto_increment primary key,
			contentId int not null,
			tagId int not null
		);`;

		return await this.query(sql);
	}

	async saveTagMap(contentIdArray, tagIdArray) {
		if(contentIdArray.length === 0 || tagIdArray.length ===0) return;

		const dataArray = [];
		contentIdArray.forEach((contentId) => {
			tagIdArray.forEach((tagId) => {
				dataArray.push({ contentId, tagId });
			})
		});

		return await this.insertMultiple(dataArray);
	}

	async deleteByUserId(userId) {
		return await this.delete(
			'contentId in (select id from ?? where userId = ?)',
			[new Contents().tableName, userId],
		);
	}

}