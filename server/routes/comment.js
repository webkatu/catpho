import express from 'express';
import JWTManager from '../common/JWTManager.js'
import Comments from '../models/Comments.js';

const router = express.Router({ mergeParams: true });

router.delete('/:id/comments/:commentId', async (req, res) => {
	try {
		if(Number.isNaN(req.params.contentId)) throw new Error();
		if(Number.isNaN(req.params.commentId)) throw new Error();
		var decoded = await new JWTManager().verifyUserAuthToken(req.body.userToken);
	}catch(e) { return res.sendStatus(400); }

	try {
		const comments = new Comments();
		const [ OkPacket ] = await comments.delete(
			'id = ? and contentId = ? and userId = ?', 
			[req.params.commentId, req.params.contentId, decoded.userId]
		);
		if(OkPacket.affectedRows === 0) return res.sendStatus(400);

		const [ results ] = await comments.selectComments(req.params.contentId);

		res.json({
			success: true,
			payload: {
				comments: results,
			},
		});
	}catch(e) { return res.sendStatus(500); }
});

export default router;