import jwt from 'jsonwebtoken';
import config from '../config.js';

export default {
	createUserAuthToken(payload) {
		return new Promise((res, rej) => {
			jwt.sign(
				{
					...payload,
					expiresIn: new Date().getTime() + config.userAuthJWT.expiresIn,
				},
				config.userAuthJWT.secretKey,
				{},
				(err, token) => {
					if(err) return rej(err);
					res(token);
				}
			);
		});
	},

	createActivationToken(payload) {
		return new Promise((res, rej) => {
			jwt.sign(
				payload,
				config.activationJWT.secretKey,
				{ expiresIn: config.activationJWT.expiresIn },
				(err, token) => {
					if(err) return rej(err);
					res(token);
				}
			);
		});
	},

	createPasswordReissueToken(payload) {
		return new Promise((res, rej) => {
			jwt.sign(
				payload,
				config.passwordReissueJWT.secretKey,
				{ expiresIn: config.passwordReissueJWT.expiresIn },
				(err, token) => {
					if(err) return rej(err);
					res(token);
				}
			);
		});
	},

	verifyUserAuthToken(token) {
		return new Promise((res, rej) => {
			jwt.verify(token, config.userAuthJWT.secretKey, (err, decoded) => {
				if(err) return rej(err);
				res(decoded);
			});
		});
	},

	verifyActivationToken(token) {
		return new Promise((res, rej) => {
			jwt.verify(token, config.activationJWT.secretKey, (err, decoded) => {
				if(err) return rej(err);
				res(decoded);
			});
		});
	},

	verifyPasswordReissueToken(token) {
		return new Promise((res, rej) => {
			jwt.verify(token, config.passwordReissueJWT.secretKey, (err, decoded) => {
				if(err) return rej(err);
				res(decoded);
			});
		});
	},
};