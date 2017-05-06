import express from 'express';
import Tags from '../models/Tags.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		const [ results ] = await new Tags().getAll();
		return res.json({
			payload: { tags: results },
		});
	}catch(e) {
		console.log(e);
		return res.sendStatus(500);
	}
});

export default router;