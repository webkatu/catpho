import mysql from '../common/mysqlConnection';

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

	insert(...args) {
		let columns, values;
		switch(args.length) {
			case 1:
				const data = args[0];
				columns = Object.keys(data);
				values = columns.map(key => data[key]);
				break;

			case 2:
				columns = args[0];
				values = args[1];
				break;

			default:
				throw new Error();
		}

		const sql = `insert into ${this.tableName} (??) values (?);`;
		return this.query(sql, [columns, values]);
	}

	insertMultiple(...args) {
		let columns, valuesArray;
		switch(args.length) {
			case 1:
				const dataArray = args[0];
				if(dataArray.length === 0) return;

				columns = Object.keys(dataArray[0]);
				valuesArray = dataArray.map((data) => {
					const values = columns.map(key => data[key]);
					return values;
				});
				break;

			case 2:
				columns = args[0];
				valuesArray = args[1];
				break;

			default:
				throw new Error();
		}

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
			const [results] = await this.query(sql);
			const count = results[0]['count(*)'];
			return count;
		})();
	}

	countOf(col, value) {
		const sql = `select count(*) from ${this.tableName} where ?? = ?;`;

		return (async () => {
			const [results] = await this.query(sql, [col, value]);
			const count = results[0]['count(*)'];
			return count;
		})();
	}

	selectBy(col, value) {
		const sql = `select * from ${this.tableName} where ?? = ?;`;
		return this.query(sql, [col, value]);
	}

	selectAll() {
		const sql = `select * from ${this.tableName};`;

		return this.query(sql);
	}

	deleteBy(col, value) {
		const sql = `delete from ${this.tableName} where ?? = ?;`;
		return this.query(sql, [col, value]);
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