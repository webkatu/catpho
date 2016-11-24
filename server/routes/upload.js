import express from 'express';
import fs from 'fs';
import multer from 'multer';
import config from '../config.js';
import Contents from '../models/Contents.js';
import fscopy from '../utils/fscopy.js';
import mysql from '../utils/mysqlConnection.js';
import getDateTime from '../utils/getDateTime.js';


const router = express.Router();
const upload = multer({dest: config.tmpDir });

router.post('/', upload.array('files'), async (req, res, next) => {

	const contents = new Contents();
	const userId = 1;
	const dataArray = [];

	try { var count = await contents.count(); }
	catch(e) { return res.sendStatus(500); }

	for(let i = 0; i < req.files.length; i++) {
		const file = req.files[0];

		count++;
		const filename = count + '_' + file.filename;
		const contentsPath = config.contentsDir + '/' + filename;
		const thumbnailPath = config.contentsDir + '/thumbnails/' + filename;

		try { await fscopy(file.path, contentsPath); }
		catch(e) { return res.sendStatus(500); }

		try { await fscopy(file.path, thumbnailPath); }
		catch(e) { return res.sendStatus(500); }


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
	}

	const columns = Object.keys(dataArray[0]);
	const valuesArray = dataArray.map((data) => {
		const values = [];
		columns.forEach((key) => {
			values.push(data[key]);
		});
		return values;
	});

	try { var [results] = await contents.insertMultiple(columns, valuesArray); }
	catch(e) { return res.sendStatus(500); }

	const startInsertId = results.insertId;
	const lastInsertId = startInsertId + results.affectedRows - 1;

	res.json({res: 'ok'});

});


export default router;