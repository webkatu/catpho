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
		return this.query(sql).then((args) => {
			const [err, results] = args;
			const count = (results)
				? results[0]['count(*)']
				: results;

			return Promise.resolve([err, count]);
		});
	}

	selectAll() {
		const sql = `select * from ${this.tableName};`;

		return this.query(sql);
	}

	query(...args) {
		return new Promise((res) => {
			mysql.query(...args, (...args) => {
				res(args);
			});
		});
	}
}