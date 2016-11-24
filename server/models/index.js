import mysql from '../utils/mysqlConnection';

export class MySQLModel {
	constructor(tableName) {
		this.mysql = mysql;
		this.tableName = tableName;

		if(tableName === undefined) {
			this.tableName = this.constructor.name.toLowerCase();
		}
	}

	dropTable() {
		const sql = `drop table ${this.tableName};`;
		return this.query(sql);
	}

	insert(columns, values) {
		const sql = `insert into ${this.tableName} (??) values (?);`;
		return this.query(sql, [columns, values]);
	}

	insertMultiple(columns, valuesArray) {
		let valuesSql = '';
		valuesArray.forEach(() => {
			valuesSql += ' (?),';
		});
		valuesSql = valuesSql.slice(0, -1);

		const sql = `insert into ${this.tableName} (??) values ${valuesSql};`;

		return this.query(sql, [columns, ...valuesArray]);
	}

	count() {
		const sql = `select count(*) from ${this.tableName};`;

		return (async () => {
			try {
				const [results] = await this.query(sql);
				const count = results[0]['count(*)'];
				return Promise.resolve(count);
			}catch(e) {
				return Promise.reject(e);
			}
		})();
	}

	selectAll() {
		const sql = `select * from ${this.tableName};`;

		return this.query(sql);
	}

	query(...args) {
		return new Promise((res, rej) => {
			mysql.query(...args, (...args) => {
				const err = args[0];
				if(err) { return rej(err); }

				res(args.slice(1));
			});
		});
	}
}