import express from 'express';
import bcrypt from 'bcrypt';
import uuid from 'uuid';
import config from '../config.js';
import validationRule from '../common/validationRule.js';
import sendMail from '../common/sendMail.js';
import Users from '../models/Users.js';
import ActivationCodes from '../models/ActivationCodes.js';

const router = express.Router();

router.post('/', (req, res, next) => {
	if(! validateBody(req.body)) return res.sendStatus(400);
	
	const users = new Users();
	try {
		if(! await users.exists('email', req.body.email)) {
			return res.json({
				ok: false,
				isEmailAlreadyTaken: true,
			});
		}

		if(! await users.exists('userName', req.body.userName)) {
			return res.json({
				ok: false,
				isUserNameAlreadyTaken: true,
			});
		}

		await saveUsers(req.body);
	}
	catch(e) { return res.sendStatus(500); }

	const activationCodes = new ActivationCodes();
	activationCodes.code = uuid.v4();
	activationCodes.email = req.body.email;
	activationCodes.save();

	res.json({ ok: true });


	const activationURL = `${req.protocol}://${req.hostname}/activation/${activationCodes.code}`;

	await sendMail({
		from: config.mail.from,
		to: 'mail@webkatu.com',
		subject: 'activation',
		html: `please access to ${activationURL}`,
	});
});

function validateBody(body) {
	const { email, userName, password } = body;

	if(email.length > validationRule.emailMaxLength) return false;
	if(! validationRule.emailPattern.test(email)) return false;

	if(userName.length < validationRule.userNameMinLength) return false;
	if(userName.length > validationRule.userNameMaxLength) return false;
	if(! validationRule.userNamePattern.test(userName)) return false;

	if(password.length < validationRule.passwordMinLength) return false;
	if(password.length > validationRule.passwordMaxLength) return false;
	if(! validationRule.passwordPattern.test(password)) return false;

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
		email: encrypt(email),
		userName,
		password: await createHash(password),
		nickname: userName,
		activation: 0,
		created: new Date(),
	}

	return await users.insert(data);

}

export default router;