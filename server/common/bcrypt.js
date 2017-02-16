import bcrypt from 'bcrypt';
import config from '../config.js';

export default {
	createHash(data) {
		return this.hash(data, config.bcrypt.salt);
	},

	hash(data, salt) {
		return new Promise((res, rej) => {
			bcrypt.hash(data, salt, (err, encrypted) => {
				if(err) return rej(err);
				res(encrypted);
			});
		});
	},

	compare(data, encrypted) {
		return new Promise((res, rej) => {
			bcrypt.compare(data, encrypted, (err, same) => {
				if(err) return rej(err);
				res(same);
			});
		});
	},
};