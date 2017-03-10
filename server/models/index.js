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

	update(setData, wherePhrase = '', whereData = []) {
		if(wherePhrase === '') throw new Error();
		wherePhrase = 'where ' + wherePhrase;
		const dataArray = [];
		
		let setPhrase = 'set ';
		Object.keys(setData).forEach((key) => {
			setPhrase += '?? = ?, ';
			dataArray.push(key, setData[key]);
		});
		setPhrase = setPhrase.slice(0, -2);

		if(Array.isArray(whereData)) dataArray.push(...whereData);
		else for(const prop in whereData) dataArray.push(prop, whereData[prop]);

		const sql = `update ${this.tableName} ${setPhrase} ${wherePhrase};`;

		return this.query(sql, dataArray);
	}

	delete(wherePhrase = '', whereData = []) {
		if(wherePhrase === '') throw new Error();
		wherePhrase = 'where ' + wherePhrase;
		const dataArray = [];
		
		if(Array.isArray(whereData)) dataArray.push(...whereData);
		else for(const prop in whereData) dataArray.push(prop, whereData[prop]);

		const sql = `delete from ${this.tableName} ${wherePhrase};`;
		return this.query(sql, dataArray);
	}

	select(cols, wherePhrase = '', whereData = [], otherPhrase = '', otherDataArray = []) {
		if(wherePhrase) wherePhrase = 'where ' + wherePhrase;
		const dataArray = [];

		let colsPhrase = '*';
		if(Array.isArray(cols)) {
			colsPhrase = '';
			cols.forEach((col) => {
				colsPhrase += '??,';
				dataArray.push(col);
			});
			colsPhrase = colsPhrase.slice(0, -1);
		}

		if(Array.isArray(whereData)) dataArray.push(...whereData);
		else for(const prop in whereData) dataArray.push(prop, whereData[prop]);

		const sql = `select ${colsPhrase} from ${this.tableName} ${wherePhrase} ${otherPhrase};`;
		return this.query(sql, [...dataArray, ...otherDataArray]);
	}

	selectOnce(cols, wherePhrase, whereData) {
		return (async () => {
			const results = await this.select(cols, wherePhrase, whereData, 'limit 1');
			let result = results[0][0];
			if(result === undefined) result = null;
			return result;
		})();
	}

	count(col = '*', wherePhrase = '', whereData = []) {
		if(wherePhrase) wherePhrase = 'where ' + wherePhrase;
		const dataArray = [col];

		if(Array.isArray(whereData)) dataArray.push(...whereData);
		else for(const prop in whereData) dataArray.push(prop, whereData[prop]);

		const sql = `select count(?) from ${this.tableName} ${wherePhrase};`;

		return (async () => {
			const [ results ] = await this.query(sql, dataArray);
			const count = results[0][`count('${col}')`];
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
		console.log(args);
		return new Promise((res, rej) => {
			mysql.query(...args, (...args) => {
				const err = args[0];
				if(err) { return rej(err); }

				res(args.slice(1));
			});
		});
	}
}