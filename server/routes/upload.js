import express from 'express';
import fs from 'fs';
import multer from 'multer';
import config from '../config.js';
import Contents from '../models/Contents.js';
import mysql from '../utils/mysqlConnection.js';
import getDateTime from '../utils/getDateTime.js';


const router = express.Router();
const upload = multer({dest: config.tmpDir });

router.post('/', upload.array('files'), async (req, res, next) => {

	const contents = new Contents();
	const userId = 1;
	const dataArray = [];

	var [err, count] = await contents.count();

	req.files.forEach((file) => {
		count++;
		const filename = count + file.filename;
		const filePath = config.contentsDir + '/' + filename;
		const thumbnailPath = config.contentsDir + '/thumbnails/' + filename;

		let r = fs.createReadStream(file.path);
		let w = fs.createWriteStream(filePath);
		r.on('error', () => {res.sendStatus(500)});
		w.on('error', () => {res.sendStatus(500)});
		r.pipe(w);

		w = fs.createWriteStream(thumbnailPath);
		w.on('error', () => {res.sendStatus(500)});
		r.pipe(w);

		fs.unlink(file.path);

		const values = {
			userId,
			filename,
			mimetype: file.mimetype,
			name: req.body.name,
			sex: req.body.sex,
			age: Number(req.body.age),
			tweet: req.body.tweet,
			created: new Date().toISOString().slice(0, 19).replace('T', ' '),
		};

		dataArray.push(values);
	});

	const columns = Object.keys(dataArray[0]);
	const valuesArray = dataArray.map((data) => {
		const values = [];
		columns.forEach((key) => {
			values.push(data[key]);
		});
		return values;
	});

	var [err, result] = await contents.insertMultiple(columns, valuesArray);
	if(err) return res.sendStatus(500);

	const startInsertId = result.insertId;
	const lastInsertId = startInsertId + result.affectedRows - 1;

	res.json({res: 'ok'});

});

export default router;