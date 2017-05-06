import mysql from '../common/mysqlConnection';

export class MySQLModel {
	constructor(tableName) {
		this.mysql = mysql;
		this.tableName = tableName;

		if(tableName === undefined) {
			this.tableName = this.constructor.name.toLowerCase();
		}
	}

	async dropTable() {
		const sql = `drop table ${this.tableName};`;
		return await this.query(sql);
	}

	async insert(...args) {
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
		return await this.query(sql, [columns, values]);
	}

	async insertMultiple(...args) {
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

		return await this.query(sql, [columns, ...valuesArray]);
	}

	async update(setData, wherePhrase = '', whereData = []) {
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

		return await this.query(sql, dataArray);
	}

	async delete(wherePhrase = '', whereData = []) {
		if(wherePhrase === '') throw new Error();
		wherePhrase = 'where ' + wherePhrase;
		const dataArray = [];
		
		if(Array.isArray(whereData)) dataArray.push(...whereData);
		else for(const prop in whereData) dataArray.push(prop, whereData[prop]);

		const sql = `delete from ${this.tableName} ${wherePhrase};`;
		return await this.query(sql, dataArray);
	}

	async select(cols, wherePhrase = '', whereData = [], otherPhrase = '', otherDataArray = []) {
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
		return await this.query(sql, [...dataArray, ...otherDataArray]);
	}

	async selectOnce(cols, wherePhrase, whereData, otherPhrase = '', otherDataArray) {
		const results = await this.select(cols, wherePhrase, whereData, `${otherPhrase} limit 1`, otherDataArray);
		let result = results[0][0];
		if(result === undefined) result = null;
		return result;
	}

	async count(col = '*', wherePhrase = '', whereData = []) {
		if(wherePhrase) wherePhrase = 'where ' + wherePhrase;
		const dataArray = [col];

		if(Array.isArray(whereData)) dataArray.push(...whereData);
		else for(const prop in whereData) dataArray.push(prop, whereData[prop]);

		const sql = `select count(?) from ${this.tableName} ${wherePhrase};`;

		const [ results ] = await this.query(sql, dataArray);
		const count = results[0][`count('${col}')`];
		return count;
	}

	async query(...args) {
		//console.log(args);
		return await new Promise((res, rej) => {
			mysql.query(...args, (...args) => {
				const err = args[0];
				if(err) { return rej(err); }

				res(args.slice(1));
			});
		});
	}
}