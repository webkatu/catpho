import { MySQLModel } from './index.js';

export default class TagMap extends MySQLModel {
	createTable() {
		const sql = `create table ${this.tableName} (
			id int not null auto_increment primary key,
			contentId int not null,
			tagId int not null
		);`;

		return this.query(sql);
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

}