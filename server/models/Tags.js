import { MySQLModel } from './index.js';
import TagMap from './TagMap.js';

export default class Tags extends MySQLModel {
	createTable() {
		const sql = `create table ${this.tableName} (
			id int not null auto_increment primary key,
			name varchar(255) unique
		);`;

		return this.query(sql);
	}

	selectIdByName(name) {
		return (async () => {
			const sql = `select id from ${this.tableName} where name = ?;`;
			const [ results ] = await this.query(sql, [name]);
			if(results.length === 0) return 0;
			return results[0]['id'];
		})();
	}

	selectTags(contentId) {
		const tagMap = new TagMap();
		const sql = `select name from ${this.tableName} where id in (select id from ${tagMap.tableName} where contentId = ?);`;

		return (async () => {
			const [ results ] = await this.query(sql, [contentId]);
			return results.map(result => result.name);
		})();
	}
}