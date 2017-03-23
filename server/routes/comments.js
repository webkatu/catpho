import express from 'express';
import multer from 'multer';
import jwtManager from '../common/jwtManager.js'
import validator from '../common/validator.js'
import Contents from '../models/Contents.js';
import Comments from '../models/Comments.js';

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
	try {
		const comments = new Comments();
		const [ results ] = await comments.selectComments(req.params.contentId);
		res.json({
			success: true,
			payload: {
				comments: results,
			}
		});
	}catch(e) { return res.sendStatus(500); }
});


router.post('/', multer().none(), async (req, res) => {
	try {
		if(! validator.validateComment(req.body.comment)) throw new Error();
		var decoded = await jwtManager.verifyUserAuthToken(req.body.userToken);
		const [ results ] = await new Contents().select('*', 'id = ?', [req.params.contentId]);
		if(results.length === 0) throw new Error();
	}catch(e) {
		return res.sendStatus(400);
	}

	try {
		const comments = new Comments();
		const [ OkPacket ] = await comments.insert({
			contentId: req.params.contentId,
			userId: decoded.userId,
			comment: req.body.comment,
		});

		const [ results ] = await comments.selectComments(req.params.contentId);

		res.json({
			success: true,
			payload: {
				comments: results,
				commentId: OkPacket.insertId,
			},
		});
	}catch(e) { console.log(e);return res.sendStatus(500); }
});

export default router;