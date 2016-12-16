import express from 'express';
import fs from 'fs';
import config from '../config.js'
import Contents from '../models/Contents.js';


const router = express.Router();

router.get('/', async (req, res, next) => {
	const contents = new Contents();
	const interval = 20;
	const currentPage = Number(req.query.page) || 1;

	try {
		var count = await contents.count();
		var [ results ] = await contents.selectAtPage(['id', 'filename'], currentPage, interval);
	}catch(e) { return res.sendStatus(500); }

	res.json({
		success: true,
		payload: {
			interval,
			currentPage,
			maxPage: Math.ceil(count / interval),
			contents: results,
		}
	});
});

export default router;