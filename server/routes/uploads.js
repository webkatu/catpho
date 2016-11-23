import express from 'express';
import fs from 'fs';
import config from '../config.js';

const router = express.Router();

router.get('/contents/:filename', (req, res, next) => {
	const filePath = config.contentsDir + '/' + req.params.filename;
	const r = fs.createReadStream(filePath);

	r.on('error', () => {
		res.sendStatus(404);
	});

	r.pipe(res);
});

router.get('/contents/thumbnails/:filename', (req, res, next) => {
	const filePath = config.contentsDir + '/thumbnails/' + req.params.filename;
	const r = fs.createReadStream(filePath);

	r.on('error', (err) => {
		res.sendStatus(404);
	});

	r.pipe(res);
});

export default router;