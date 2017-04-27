import express from 'express';
import multer from 'multer';
import config from '../config.js';
import jwtManager from '../common/jwtManager.js'
import validator from '../common/validator.js'
import Contents from '../models/Contents.js';
import Comments from '../models/Comments.js';

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
	try {
		const results = await new Comments().selectComments(req.params.contentId);

		res.json({
			payload: {
				comments: results,
			}
		});
	}catch(e) {
		console.log(e);
		return res.sendStatus(500);
	}
});

const upload = multer().none();
router.post('/', upload, async (req, res) => {
	try {
		if(! validator.validateComment(req.body.comment)) throw new Error();
		var decoded = await jwtManager.verifyUserAuthToken(req.body.userToken);
		const result = await new Contents().selectOnce('*', 'id = ?', [req.params.contentId]);
		if(result === null) throw new Error();
	}catch(e) {
		return res.sendStatus(400);
	}

	try {
		const comments = new Comments();
		const [ OkPacket ] = await comments.insert({
			contentId: req.params.contentId,
			userId: decoded.userId,
			comment: req.body.comment,
			created: new Date(),
		});

		const results = await comments.selectComments(req.params.contentId);

		res.json({
			payload: {
				comments: results,
				commentId: OkPacket.insertId,
			},
		});
	}catch(e) {
		console.log(e);
		return res.sendStatus(500);
	}
});

export default router;