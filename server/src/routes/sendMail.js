import express from 'express';
import multer from 'multer';
import jwtManager from '../common/jwtManager.js';
import validator from '../common/validator.js';
import mailer from '../common/mailer.js';
import Users from '../models/Users.js';

const router = express.Router();

const upload = multer().none();

router.post('/', upload,
	async (req, res, next) => {
		if(! req.xhr) return res.sendStatus(403);
		next();
	},
	
	async (req, res, next) => {
		if(req.query.at !== 'register') return next();

		try {
			var decoded = await jwtManager.verifyActivationToken(req.body.activationToken);
			if(decoded.email !== req.body.to) throw new Error();
		}catch(e) {
			console.log(e);
			return res.sendStatus(400);
		}
		mailer.sendRegisterMail({
			to: req.body.to,
			userName: decoded.userName,
			activationToken: req.body.activationToken,
		}).catch((err) => { console.log(err); });

		return res.sendStatus(204);
	},
	
	async (req, res, next) => {
		if(req.query.at !== 'activation') return next();

		if(! validator.validateEmail(req.body.to)) return res.sendStatus(400);
		try {
			var decoded = await jwtManager.verifyUserAuthToken(req.body.userToken);
		}catch(e) {
			console.log(e);
			return res.sendStatus(400);
		}

		try {
			const activationToken = await jwtManager.createActivationToken({
				userId: decoded.userId,
				userName: decoded.userName,
			});

			await mailer.sendActivationMail({
				to: req.body.to,
				userName: decoded.userName,
				activationToken,
			});
		}catch(e) {
			console.log(e);
			return res.sendStatus(500);			
		}

		return res.sendStatus(204);
	},

	async (req, res, next) => {
		if(req.query.at !== 'passwordReissueRequest') return next();

		if(! validator.validateEmail(req.body.email)) return res.sendStatus(400);

		try {
			const result = await new Users().selectOnce(['userName'], 'email = ?', [req.body.email]);
			if(result === null) return res.sendStatus(400);

			const passwordReissueToken = await jwtManager.createPasswordReissueToken({
				email: req.body.email,
			});

			mailer.sendPasswordReissueRequestMail({
				to: req.body.email,
				userName: result.userName,
				passwordReissueToken,
			}).catch((err) => { console.log(err); });

			return res.sendStatus(204);
		}catch(e) {
			console.log(e);
			return res.sendStatus(500);
		}
	},

	async (req, res) => {
		res.sendStatus(404);
	},
);

export default router;