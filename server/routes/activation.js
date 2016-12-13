import express from 'express';
import JWTManager from '../common/JWTManager.js';
import Users from '../models/Users.js';

const router = express.Router();

router.post('/:token', async (req, res, next) => {
	const jwtManager = new JWTManager();
	try {
		var userAuthJWTPayload = await jwtManager.verifyUserAuthToken(req.body.userToken);
	}catch(e) {
		return res.json({
			success: false,
			error: {
				message: 'user authentication failure'
			}
		});
	}

	try {
		var activationJWTPayload = await jwtManager.verifyActivationToken(req.params.token);
		if(userAuthJWTPayload.userName !== activationJWTPayload.userName) throw new Error();
	}catch(e) {
		return res.json({
			success: false,
			error: {
				message: 'activation token is incorrect',
			}
		});
	}

	try {
		const users = new Users();
		await users.activate(activationJWTPayload.userId);
	}catch(e) { return res.sendStatus(500); }

	res.json({ success: true });
});

export default router;