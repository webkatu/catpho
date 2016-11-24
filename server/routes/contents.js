import express from 'express';
import fs from 'fs';
import config from '../config.js'
import Contents from '../models/Contents.js';


const router = express.Router();

router.post('/', async (req, res, next) => {
	const contents = new Contents();
	const interval = req.body.interval;
	const currentPage = Number(req.query.page) || 1;

	try { var count = await contents.count(); }
	catch(e) { return res.sendStatus(500); }

	try { var [results] = await contents.selectAtPage(['id', 'filename'], currentPage, interval); }
	catch(e) { return res.sendStatus(500); }

	const json = {
		interval,
		currentPage,
		maxPage: Math.ceil(count / interval),
		contents: results,
	};
	res.json(json);
});

export default router;