import express from 'express';
import multer from 'multer';
import config from '../config.js'
import jwtManager from '../common/jwtManager.js';
import validator from '../common/validator.js';
import Users from '../models/Users';

const router = express.Router();

router.get('/', 
	async (req, res, next) => {
		if(req.query.userToken || req.query.emailOrUserName || req.query.password) return next();

		return res.sendStatus(404);
	},

	//自動ログイン
	async (req, res, next) => {
		if(req.query.userToken === undefined) return next();

		try {
			var decoded = await jwtManager.verifyUserAuthToken(req.query.userToken);
		}catch(e) {
			console.log(e);
			return res.sendStatus(401);
		}
		
		try {
			var user = await new Users().selectOnce(
				['id', 'email', 'userName', 'nickname', 'avatar', 'activation'],
				'id = ? and userName = ?',
				[decoded.userId, decoded.userName],
			);
			if(user === null) return res.sendStatus(401);

			var userToken = (
				(new Date().getTime() <= decoded.expiresIn)
				? req.query.userToken
				: await jwtManager.createUserAuthToken({
					userId: user.id,
					userName: user.userName,
				})
			);
		}catch(e) {
			console.log(e);
			return res.sendStatus(500);
		}

		res.json({
			payload: {
				...user,
				avatar: `${config.avatarsUrl}/${user.avatar}`,
				userToken,
			},
		});
	},

	//手動ログイン
	async (req, res, next) => {
		if(! validator.validateEmailOrUserName(req.query.emailOrUserName) || ! validator.validatePassword(req.query.password)) {
			return res.sendStatus(401);
		}

		try {
			var user = await new Users().authenticate(req.query.emailOrUserName, req.query.password);
			if(user === null) return res.sendStatus(401);
			var userToken = await jwtManager.createUserAuthToken({
				userId: user.id,
				userName: user.userName,
			});
		}catch(e) {
			console.log(e);
			return res.sendStatus(500);
		}

		res.json({
			payload: {
				...user,
				avatar: `${config.avatarsUrl}/${user.avatar}`,
				userToken,
			},
		});
	}
);

const upload = multer().none();
router.post('/', upload, async (req, res) => {
	if(! validator.validateEmail(req.body.email)
		|| ! validator.validateUserName(req.body.userName)
		|| ! validator.validatePassword(req.body.password)) {
		return res.sendStatus(400);
	}

	try {
		const users = new Users();
		//すでに登録されていれば登録拒否;
		const result = await users.selectOnce(
			'id', 
			'email = ? or userName = ?', 
			[req.body.email, req.body.userName],
		);
		if(result) return res.sendStatus(401);

		const [ OkPacket ] = await users.register(req.body);

		var user = {
			id: OkPacket.insertId,
			email: req.body.email,
			userName: req.body.userName,
			nickname: req.body.userName,
			avatar: config.defaultAvatarFileName,
			activation: 0,
		};

		var userToken = await jwtManager.createUserAuthToken({
			userId: OkPacket.insertId,
			userName: req.body.userName,
		});

		var activationToken = await jwtManager.createActivationToken({
			userId: OkPacket.insertId,
			userName: req.body.userName,
			email: req.body.email,
		});
	}catch(e) {
		console.log(e);
		return res.sendStatus(500);
	}

	res.json({
		payload: {
			...user,
			avatar: `${config.avatarsUrl}/${user.avatar}`,
			userToken,
			activationToken,
		},
	});

});

export default router;