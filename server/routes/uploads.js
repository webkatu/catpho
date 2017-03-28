import express from 'express';
import fs from 'fs';
import config from '../config.js';

const router = express.Router();

router.get('/*', (req, res, next) => {
	const filePath = `${config.uploadsDir}/${req.params[0]}`;
	const r = fs.createReadStream(filePath);

	r.on('error', () => {
		res.sendStatus(404);
	});

	r.pipe(res);
});

export default router;