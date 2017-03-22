import express from 'express';
import multer from 'multer';
import config from '../config.js'
import bcrypt from '../common/bcrypt';
import JWTManager from '../common/JWTManager.js';
import Validator from '../common/Validator.js';
import Users from '../models/Users';
import Favorites from '../models/Favorites';

const router = express.Router();

router.get('/', 
	async (req, res, next) => {
		if(req.query.userToken || req.query.emailOrUserName || req.query.password) return next();

		return res.sendStatus(404);
	},

	async (req, res, next) => {
		if(req.query.userToken === undefined) return next();

		try {
			var decoded = await new JWTManager().verifyUserAuthToken(req.query.userToken);
		}catch(e) {
			console.log(e);
			return res.sendStatus(401);
		}
		
		try {
			var user = await new Users().selectOnce(
				['id', 'email', 'userName', 'nickname', 'avatar'],
				'id = ? and userName = ?',
				[decoded.userId, decoded.userName],
			);
			if(user === null) return res.sendStatus(401);

			var userToken = (
				(new Date().getTime() <= decoded.expiresIn)
				? req.query.userToken
				: await new JWTManager().createUserAuthToken({
					userId: user.id,
					userName: user.userName,
				})
			);
		}catch(e) {
			console.log(e);
			return res.sendStatus(500);
		}

		res.json({
			payload: { ...user, userToken },
		});
	},

	async (req, res, next) => {
		const validator = new Validator();
		if(! validator.validateEmailOrUserName(req.query.emailOrUserName) || ! validator.validatePassword(req.query.password)) {
			return res.sendStatus(401);
		}

		try {
			var user = await new Users().authenticate(req.query.emailOrUserName, req.query.password);
			if(user === null) return res.sendStatus(401);
			var userToken = await new JWTManager().createUserAuthToken({
				userId: user.id,
				userName: user.userName,
			});
		}catch(e) {
			console.log(e);
			return res.sendStatus(500);
		}

		res.json({
			payload: { ...user, userToken },
		});
	}
);

const upload = multer().none();
router.post('/', upload, async (req, res) => {
	const validator = new Validator();
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
		};

		const jwtManager = new JWTManager();
		var userToken = await jwtManager.createUserAuthToken({
			userId: OkPacket.insertId,
			userName: req.body.userName,
		});

		const activationToken = await jwtManager.createActivationToken({
			userId: OkPacket.insertId,
			userName: req.body.userName,
		});
/*
		await new Mailer().sendRegisterMail({
			to: req.body.email,
			token: activationToken,
		});
*/
	}catch(e) {
		console.log(e);
		return res.sendStatus(500);
	}

	res.json({
		payload: { ...user, userToken },
	});

});

router.patch('/:userName', multer({dest: config.tmpDir}).single('avatar'), async (req, res) => {
	console.log(req.file, req.body);
	try {
		var decoded = await new JWTManager().verifyUserAuthToken(req.body.userToken);
	}catch(e) { return res.sendStatus(401); }
	
	try{
		if(req.params.userName !== decoded.userName) throw new Error();
		if(! await validateBody(req.body, decoded.userId)) throw new Error();
	}catch(e) {
		console.log(e);
		return res.sendStatus(422);
	}

	//avatarのvalidationとファイル処理;



	const data = {};
	['nickname', 'email'].forEach((prop) => {
		if(req.body[prop] === '') return;
		data[prop] = req.body[prop];
	});
	if(req.body.password) data.password = await bcrypt.createHash(req.body.password);
	if(req.file) data.avatar = req.file.filename;

	try {
		const [ result ] = await new Users().updateUser(data, decoded.userId);
	}catch(e) {console.log(e); return res.sendStatus(500); }

	const user = { ... data }
	delete user.password;
	res.json({
		success: true,
		payload: user,
	});

});

async function validateBody(body, userId) {
	const { email, nickname, currentPassword, password } = body;
	const validator = new Validator();

	if(email !== '' && ! validator.validateEmail(email)) return false;
	if(nickname !== '' && ! validator.validateNickname(nickname)) return false;
	if(currentPassword !== '' && password !== '') {
		if(! validator.validatePassword(currentPassword)) return false;
		if(! validator.validatePassword(password)) return false;
		
		//DBのパスワードと比較
		const [ result ] = await new Users().selectOnce(['password'], 'where ?? = ?', { id: userId });
		const same = bcrypt.compare(currentPassword, result.password);
		if(! same) return false;
	}

	return true;
}

router.post('/:userName/favorites', async (req, res) => {
	const contentId = Number(req.body.contentId);
	try {
		if(Number.isNaN(contentId)) throw new Error();
		var decoded = await new JWTManager().verifyUserAuthToken(req.body.userToken);
		if(req.params.userName !== decoded.userName) throw new Error();
	}catch(e) { return res.sendStatus(400); }

	try {
		const [ OkPacket ] = await new Favorites().insert({
			userId: decoded.userId,
			contentId: contentId,
		});

		res.sendStatus(201);
	}catch(e) { return res.sendStatus(500); }
});

router.delete('/:userName/favorites/:contentId', async (req, res) => {
	const contentId = Number(req.params.contentId);
	try {
		if(Number.isNaN(contentId)) throw new Error();
		var decoded = await new JWTManager().verifyUserAuthToken(req.body.userToken);
		if(req.params.userName !== decoded.userName) throw new Error();
	}catch(e) { return res.sendStatus(400); }

	try {
		const [ OkPacket ] = await new Favorites().remove(decoded.userId, contentId);
		if(OkPacket.affectedRows === 0) return res.sendStatus(400);
		
		res.sendStatus(204);
	}catch(e) { return res.sendStatus(500); }
});

export default router;