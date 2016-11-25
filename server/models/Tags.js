import { MySQLModel } from './index.js';

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
}