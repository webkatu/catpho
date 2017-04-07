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

	async saveTags(tags) {
		const idArray = await Promise.all(tags.map(async (tag) => {
			const result = await this.selectOnce(['id'], '?? = ?', { name: tag });
			if(result !== null) return result.id;

			const [ OkPacket ] = await this.insert({ name: tag });
			return OkPacket.insertId;
		}));

		return idArray;
	}

	async deleteUnusedTags() {
		return await this.delete(
			`not exists (select * from ?? where ${this.tableName}.id = tagId)`,
			[new TagMap().tableName]
		);
	}

	async getAll() {
		return await this.query(
			'select t.name, count(t.name) as count from ?? t join ?? m on t.id = m.tagId group by t.name order by t.name asc;',
			[this.tableName, new TagMap().tableName],
		);
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
		return (async () => {
			const [ results ] = await this.select(
				['name'],
				`id in(select tagId from ${new TagMap().tableName} where contentId = ?)`,
				[contentId]
			);
			return results.map(result => result.name);
		})();
	}
}