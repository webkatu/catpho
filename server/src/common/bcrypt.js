import bcrypt from 'bcrypt';
import config from '../config.js';

export default {
	async createHash(data) {
		return await this.hash(data, config.bcrypt.salt);
	},

	async hash(data, salt) {
		return await new Promise((res, rej) => {
			bcrypt.hash(data, salt, (err, encrypted) => {
				if(err) return rej(err);
				res(encrypted);
			});
		});
	},

	async compare(data, encrypted) {
		return await new Promise((res, rej) => {
			bcrypt.compare(data, encrypted, (err, same) => {
				if(err) return rej(err);
				res(same);
			});
		});
	},
};