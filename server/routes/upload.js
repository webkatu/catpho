import express from 'express';
import fs from 'fs';
import multer from 'multer';
import config from '../config.js';
import Contents from '../models/Contents.js';
import fscopy from '../common/fscopy.js';
import mysql from '../common/mysqlConnection.js';
import getDateTime from '../common/getDateTime.js';
import validationRule from '../common/validationRule.js';

const router = express.Router();
const upload = multer({dest: config.tmpDir });

router.post('/', upload.array('files'), async (req, res, next) => {

	Object.assign(req.body, formatBody(req.body));
	if(! validateBody(req.body)) return res.sendStatus(500);
	if(! validateFiles(req.files)) return res.sendStatus(500);

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

function formatBody(body) {
	const name = String(body.name).trim();
	
	let sex = String(body.sex).trim();
	if(! (sex === 'none' || sex === 'male' || sex === 'female')) {
		sex = 'none';
	}

	let age = Number(body.age);
	if(body.age === '' || isNaN(body.age)) {
		age = null;
	}

	const tag = String(body.tag).trim();
	const tags = tag.split(/[\s ]+/);

	const tweet = String(body.tweet).trim();

	return { name, sex, age, tag, tags, tweet };
}

function validateBody(body) {
	const { name, age, tags, tweet } = body;
	const { nameMaxLength, ageMin, ageMax, tagMaxCount, tagMaxLength, tweetMaxLength } = validationRule;
	
	if(name.length > nameMaxLength) return false;
	if(age < ageMin || age > ageMax) return false;
	if(tags.length > tagMaxCount) return false;
	if(! tags.every(tag => tag.length <= tagMaxLength)) return false;
	if(tweet.length > tweetMaxLength) return false;

	return true;
}

function validateFiles(files) {
	if(files.length === 0) return false;
	return true;
}

export default router;