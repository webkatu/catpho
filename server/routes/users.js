import express from 'express';
import JWTManager from '../common/JWTManager.js';
import Favorites from '../models/Favorites';

const router = express.Router();

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