import express from 'express';
import fs from 'fs';
import config from '../config.js'
import Images from '../models/images.js';
import Contents from '../models/Contents.js';


const router = express.Router();

router.post('/', async (req, res, next) => {
	const contents = new Contents();
	const interval = req.body.interval;
	const currentPage = Number(req.query.page) || 1;

	var [err, count] = await contents.count();
	if(err) return res.sendStatus(500);
	var [err, results] = await contents.selectAtPage(['id', 'filename'], currentPage, interval);
	if(err) return res.sendStatus(500);

	const json = {
		interval,
		currentPage,
		maxPage: Math.ceil(count / interval),
		contents: results,
	};
	res.json(json);
});

export default router;