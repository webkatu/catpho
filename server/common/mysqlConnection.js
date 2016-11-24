import mysql from 'mysql';
import config from '../config.js';

export default mysql.createConnection({
	host: config.mysql.host,
	user: config.mysql.user,
	password: config.mysql.password,
	database: config.mysql.database,
});