import express from 'express';
import jwtManager from '../common/jwtManager.js';
import validator from '../common/validator.js';
import mailer from '../common/mailer.js';

const router = express.Router();

router.post('/', 
	async (req, res, next) => {
		console.log(req.query, req.body);
		if(! req.xhr) return res.sendStatus(403);
		next();
	},
	async (req, res, next) => {
		if(req.query.at !== 'register') return next();

		try {
			const decoded = await jwtManager.verifyActivationToken(req.body.activationToken);
			if(decoded.email !== req.body.to) throw new Error();
		}catch(e) {
			console.log(e);
			return res.sendStatus(403);
		}
		mailer.sendRegisterMail({
			to: req.body.to,
			activationToken: req.body.activationToken,
		}).catch((err) => { console.log(err); });

		return res.sendStatus(204);
	},
	async (req, res, next) => {
		if(req.query.at !== 'activation') return next();

		try {
			const decoded = await jwtManager.verifyActivationToken(req.body.activationToken);
			if(decoded.email !== req.body.to) throw new Error();
		}catch(e) {
			console.log(e);
			return res.sendStatus(403);
		}
		mailer.sendActivationMail({
			to: req.body.to,
			activationToken: req.body.activationToken,
		}).catch((err) => { console.log(err); });

		return res.sendStatus(204);
	},
	async (req, res) => {
		res.sendStatus(404);
	},
);

export default router;