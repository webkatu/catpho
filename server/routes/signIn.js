import express from 'express';
import bcrypt from 'bcrypt';
import JWTManager from '../common/JWTManager.js';
import Validator from '../common/Validator.js';
import Users from '../models/Users.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
	try {
		const jwtManager = new JWTManager();
		const decoded = await jwtManager.verifyUserAuthToken(req.body.userToken);
		var [ [ user ] ] = await new Users().selectBy('userName', decoded.userName);
	}catch(e) {
		res.sendStatus(404);
	}

	res.json({
		success: true,
		payload: {
			id: user.id,
			userName: user.userName,
			email: user.email,
			nickname: user.nickname,
		}
	});

});

router.post('/authentication', async (req, res, next) => {
	if(! validateBody(req.body)) return res.sendStatus(400);

	try {
		var user = await authenticate(req.body.emailOrUserName, req.body.password);
		if(user === null) {
			return res.json({
				success: false,
				error: {
					code: 1,
					message: 'user not found.'
				}
			});
		}
		const jwtManager = new JWTManager();
		var token = await jwtManager.createUserAuthToken({
			userName: user.userName,
		});
	}catch(e) { return res.sendStatus(500); }

	res.json({
		success: true,
		payload: {
			id: user.id,
			userName: user.userName,
			email: user.email,
			nickname: user.nickname,
			token,
		}
	});

});

function validateBody(body) {
	const validator = new Validator();
	const { emailOrUserName, password } = body;

	if(! validator.validateEmailOrUserName(emailOrUserName)) return false;
	if(! validator.validatePassword(password)) return false;

	return true;
}

async function authenticate(emailOrUserName, password) {
	const users = new Users();
	const [ results ] = await users.selectUserByEmailOrUserName(emailOrUserName);
	if(results.length === 0) return null;

	const user = results[0];
	const isValid = await new Promise((res, rej) => {
		bcrypt.compare(password, user.password, (err, isValid) => {
			if(err) return rej(err);
			res(isValid);
		});
	});
	if(isValid === false) return null;

	return user;
}

export default router;