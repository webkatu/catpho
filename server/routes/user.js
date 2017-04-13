import express from 'express';
import multer from 'multer';
import fs from 'fs';
import config from '../config.js'
import bcrypt from '../common/bcrypt';
import jwtManager from '../common/jwtManager.js';
import validator from '../common/validator.js';
import imageProcessor from '../common/imageProcessor.js';
import mailer from '../common/mailer.js';
import Users from '../models/Users';
import Contents from '../models/Contents';
import TagMap from '../models/TagMap';
import Tags from '../models/Tags';
import Favorites from '../models/Favorites';

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res, next) => {
	try {
		const result = await new Users().selectOnce(
			['id', 'userName', 'nickname', 'avatar', 'created'],
			'?? = ?',
			{ userName: req.params.userName }
		);
		if(result === null) return res.sendStatus(404);

		const postCount = await new Contents().count(
			'*', 
			'?? = ?',
			{ userId: result.id }
		);

		res.json({
			payload: {
				userName: result.userName,
				nickname: result.nickname,
				avatar: config.avatarsUrl + '/' + result.avatar,
				created: (() => {
					const date = new Date(result.created);
					return `${date.getFullYear()}/${date.getMonth() + 1}`;
				})(),
				postCount,
			},
		});
	}catch(e) {
		console.log(e);
		return res.sendStatus(500);
	}
});


const upload = multer({
	dest: config.tmpDir,
	limits: {
		fileSize: validator.rule.fileMaxSize,
	},
	fileFilter(req, file, cb) {
		if(validator.validateImageFile(file)) return cb(null, true);

		req.fileValidationError = true;
		cb(null, false);
	},
}).single('avatar');

router.patch('/',
	(req, res, next) => {
		upload(req, res, (err) => {
			if(err || req.fileValidationError) {
				console.log(err, req.fileValidationError);
				return res.sendStatus(400);
			}
			next();
		});
	},

	//passwordReissue
	async (req, res, next) => {
		if(req.body.passwordReissueToken === undefined) return next();

		try {
			const decoded = await jwtManager.verifyPasswordReissueToken(req.body.passwordReissueToken);
			const result = await new Users().selectOnce(
				['id'],
				'userName = ? and email = ?',
				[req.params.userName, decoded.email],
			);
			if(result === null) throw new Error();

			var userId = result.id;
			var email = decoded.email;
		}catch(e) {
			return res.sendStatus(400);
		}

		try {
			const password = await new Users().reissuePassword(userId);
			console.log(email, password);
			mailer.sendPasswordReissueMail({
				to: email,
				password,
			}).catch((err) => { console.log(err); });

			return res.sendStatus(204);
		}catch(e) {
			console.log(e);
			return res.sendStatus(500);
		}
	},

	//validation
	async (req, res, next) => {
		try {
			const decoded = await jwtManager.verifyUserAuthToken(req.body.userToken);
			if(req.params.userName !== decoded.userName) throw new Error();

			res.locals.userId = decoded.userId;
			res.locals.userName = decoded.userName;
			next();
		}catch(e) {
			console.log(e);
			return res.sendStatus(401);
		}
	},

	//activation
	async (req, res, next) => {
		if(req.body.activationToken === undefined) return next();

		try {
			const decoded = await jwtManager.verifyActivationToken(req.body.activationToken);
			if(decoded.userName !== res.locals.userName) throw new Error();
		}catch(e){
			return res.sendStatus(400);
		}

		try {
			await new Users().activate(res.locals.userId);
			return res.json({ payload: { activation: 1 } });
		}catch(e) {
			console.log(e);
			return res.sendStatus(500);
		}
	},

	async (req, res) => {
		console.log(req.file, req.body);

		try {
			const currentUser = await new Users().selectOnce('*', 'id = ?', [res.locals.userId]);
			if(! await validate(currentUser, req.body, req.file)) return res.sendStatus(400);

			const data = {};
			if(req.body.nickname !== '' && req.body.nickname !== currentUser.nickname) data.nickname = req.body.nickname;
			if(req.body.email !== '' && req.body.email !== currentUser.email) {
				data.email = req.body.email;
				data.activation = 0;
			}
			if(req.body.password !== '' && req.body.password !== req.body.currentPassword) data.password = await bcrypt.createHash(req.body.password);
			if(req.body.restoringAvatar) data.avatar = config.defaultAvatarFileName
			if(req.file) data.avatar = req.file.filename;

			await new Users().update(data, 'id = ?', [res.locals.userId]);
			
			if(req.file) {
				await imageProcessor.createAvatar(req.file.path, `${config.avatarsDir}/${req.file.filename}`);
				fs.unlink(req.file.path, () => {});
			}
			//avatarが変更されたら以前のavatarを消す;
			if(data.avatar) {
				if(currentUser.avatar !== config.defaultAvatarFileName) {
					fs.unlink(`${config.avatarsDir}/${currentUser.avatar}`, () => {});
				}
			}
	
			var user = { ... data }
			delete user.password;
			if(user.avatar) user.avatar = `${config.avatarsUrl}/${user.avatar}`;
		}catch(e) {
			console.log(e);
			return res.sendStatus(500);
		}

		res.json({ payload: { ...user } });
	}
);

async function validate(currentUser, body, file) {
	const { email, nickname, currentPassword, password, restoringAvatar } = body;

	if(currentUser === null) return false;
	if(email !== '' && ! validator.validateEmail(email)) return false;
	if(nickname !== '' && ! validator.validateNickname(nickname)) return false;
	if(password !== '') {
		if(! validator.validatePassword(currentPassword)) return false;
		if(! validator.validatePassword(password)) return false;
		
		const same = await bcrypt.compare(currentPassword, currentUser.password);
		if(! same) return false;
	}

	const passed = ['email', 'nickname', 'password'].some((prop) => {
		if(body[prop] === '') return false;
		if(body[prop] === currentUser[prop]) return false;
		if(prop === 'password' && password === currentPassword) return false;
		return true;
	});
	//変更すべき要素がない時のリクエスト;
	if(passed === false && file === undefined && restoringAvatar === undefined) return false;

	return true;
}

router.delete('/', async (req, res, next) => {
	try {
		const decoded = await jwtManager.verifyUserAuthToken(req.query.userToken);
		var userId = decoded.userId;
		if(decoded.userName !== req.params.userName) throw new Error();
	}catch(e) {
		return res.sendStatus(401);
	}

	const users = new Users();
	const contents = new Contents();
	const mysql = users.mysql;
	mysql.beginTransaction(async (err) => {
		try {
			if(err) throw err;

			await new Favorites().deleteByWithdrawal(userId);
			await new TagMap().deleteByUserId(userId);
			await new Tags().deleteUnusedTags();
			
			const { avatar } = await users.selectOnce('avatar', 'id = ?', [userId]);
			const [ deletedFilenames ] = await contents.select('filename', '?? = ?', { userId });
			
			await users.delete('id = ?', [userId]);
			await contents.delete('?? = ?', { userId });

			mysql.commit((err) => {
				if(err) throw err;
				
				if(avatar !== config.defaultAvatarFileName) {
					fs.unlink(`${config.avatarsDir}/${avatar}`, ()=>{});
				}

				deletedFilenames.forEach((obj) => {
					fs.unlink(`${config.contentsDir}/${obj.filename}`, ()=>{});
					fs.unlink(`${config.contentsDir}/thumbnails/${obj.filename}`, ()=>{});
				});

				res.sendStatus(204);
			});
		}catch(e) {
			console.log(e);
			mysql.rollback();
			res.sendStatus(500);
		}
	})

})

router.post('/favorites', async (req, res) => {
	const contentId = Number(req.body.contentId);
	try {
		if(Number.isNaN(contentId)) throw new Error();
		var decoded = await jwtManager.verifyUserAuthToken(req.body.userToken);
		if(req.params.userName !== decoded.userName) throw new Error();
	}catch(e) { return res.sendStatus(400); }

	try {
		const [ OkPacket ] = await new Favorites().insert({
			userId: decoded.userId,
			contentId: contentId,
		});

		res.sendStatus(204);
	}catch(e) {
		console.log(e);
		return res.sendStatus(500);
	}
});

router.delete('/favorites/:contentId', async (req, res) => {
	const contentId = Number(req.params.contentId);
	try {
		if(Number.isNaN(contentId)) throw new Error();
		var decoded = await jwtManager.verifyUserAuthToken(req.body.userToken);
		if(req.params.userName !== decoded.userName) throw new Error();
	}catch(e) { return res.sendStatus(400); }

	try {
		const sql = `delete from ${this.tableName} where userId = ? and contentId = ?;`;
		const [ OkPacket ] = await new Favorites().delete(
			'userId = ? and contentId = ?',
			[decoded.userId, contentId],
		);
		if(OkPacket.affectedRows === 0) return res.sendStatus(400);
		
		res.sendStatus(204);
	}catch(e) {
		console.log(e);
		return res.sendStatus(500);
	}
});

export default router;