import express from 'express';
import multer from 'multer';
import bcrypt from 'bcrypt';
import uuid from 'uuid';
import JWTManager from '../common/JWTManager.js';
import config from '../config.js';
import Validator from '../common/Validator.js';
import sendMail from '../common/sendMail.js';
import Users from '../models/Users.js';

const router = express.Router();

router.post('/', multer().none(), async (req, res, next) => {
	console.log(req.body);
	if(! validateBody(req.body)) return res.sendStatus(400);
	const users = new Users();
	try {
		if(await users.exists('email', req.body.email)) {
			return res.json({
				success: false,
				error: {
					message: 'email is already taken.'
				}
			});
		}

		if(await users.exists('userName', req.body.userName)) {
			return res.json({
				success: false,
				error: {
					message: 'username is already taken.'
				}
			});
		}

		var [ OkPacket ] = await saveUsers(req.body);

		const jwtManager = new JWTManager();	
		const activationToken = await jwtManager.createActivationToken({
			userId: OkPacket.insertId,
			userName: req.body.userName,
		});

		const activationURL = `${req.URL.origin}/activation/${activationToken}`;

		await sendMail({
			from: config.mail.from,
			to: req.body.email,
			subject: 'activation',
			html: `please access to <a href="${activationURL}">${activationURL}</a>`,
		});

		var token = await jwtManager.createUserAuthToken({
			userName: req.body.userName,
		});
	}
	catch(e) { console.log(e); return res.sendStatus(500); }

	res.json({
		success: true,
		payload: {
			id: OkPacket.insertId,
			userName: req.body.userName,
			email: req.body.email,
			nickname: req.body.userName,
			token,
		}
	});
});

function validateBody(body) {
	const validator = new Validator();
	const { email, userName, password } = body;

	if(! validator.validateEmail(email)) return false;
	if(! validator.validateUserName(userName)) return false;
	if(! validator.validatePassword(password)) return false;
	return true;
}

function encrypt(text) {
	const c = config.crypto;
	const cipher = crypto.createCipher(c.algorithm, c.password);
	cipher.update(text, c.inputEncoding, c.outputEncoding);
	return clipher.final(c.outputEncoding);
}

async function createHash(text) {
	return await new Promise((res, rej) => {
		bcrypt.hash(text, 10, (err, hash) => {
			if(err) return rej(err);
			return res(hash);
		});
	});
}

async function saveUsers(body) {
	const users = new Users();
	const { email, userName, password } = body;
	const data = {
		email,
		userName,
		password: await createHash(password),
		nickname: userName,
		activation: 0,
		created: new Date(),
	}

	return await users.insert(data);

}

export default router;