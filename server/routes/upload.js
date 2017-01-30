import express from 'express';
import fs from 'fs';
import multer from 'multer';
import config from '../config.js';
import Contents from '../models/Contents.js';
import Tags from '../models/Tags.js';
import TagMap from '../models/TagMap.js';
import fscopy from '../common/fscopy.js';
import mysql from '../common/mysqlConnection.js';
import getDateTime from '../common/getDateTime.js';
import validationRule from '../common/validationRule.js';

const router = express.Router();
const upload = multer({dest: config.tmpDir });

router.post('/', upload.array('files'), async (req, res, next) => {

	Object.assign(req.body, formatBody(req.body));
	req.body.userId = 1;
	if(! validateBody(req.body)) return res.sendStatus(400);
	if(! validateFiles(req.files)) return res.sendStatus(400);
	console.log(req.body);
	console.log(req.files);

	try {
		await changeFilename(req.files);
		await saveUploadFiles(req.files);
		var contentIdArray = await saveContents(req.files, req.body);
		var tagIdArray = await saveTags(req.body.tags);
		await saveTagMap(contentIdArray, tagIdArray);
	}catch(e) { console.log(e);return res.sendStatus(500); }

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
	const tags = (tag === '') ? [] : tag.split(/[\s ]+/);

	const description = String(body.description).trim();

	return { name, sex, age, tag, tags, description };
}

function validateBody(body) {
	const { name, age, tags, description } = body;
	const { nameMaxLength, ageMin, ageMax, tagMaxCount, tagMaxLength, descriptionMaxLength } = validationRule;
	
	if(name.length > nameMaxLength) return false;
	if(age < ageMin || age > ageMax) return false;
	if(tags.length > tagMaxCount) return false;
	if(! tags.every(tag => tag.length <= tagMaxLength)) return false;
	if(description.length > descriptionMaxLength) return false;

	return true;
}

function validateFiles(files) {
	if(files.length === 0) return false;
	return true;
}

async function changeFilename(files) {
	const contents = new Contents();

	let count = await contents.count();

	files.forEach((file) => {
		count++;
		files.filename = count + '_' + file.filename;
	});
}

async function saveUploadFiles(files) {
	return Promise.all(files.map(async (file) => {
		const contentsPath = config.contentsDir + '/' + file.filename;
		const thumbnailPath = config.contentsDir + '/thumbnails/' + file.filename;

		await fscopy(file.path, contentsPath);
		await fscopy(file.path, thumbnailPath);
		fs.unlink(file.path);
	}));
}

async function saveContents(files, body) {
	const contents = new Contents();

	const dataArray = files.map((file) => {
		return {
			userId: body.userId,
			filename: file.filename,
			mimetype: file.mimetype,
			name: body.name,
			sex: body.sex,
			age: body.age,
			description: body.description,
			created: new Date(),
		}
	});
	
	const [ OkPacket ] = await contents.insertMultiple(dataArray);
	let insertId = OkPacket.insertId;

	return Array(OkPacket.affectedRows).fill(0).map(() => {
		return insertId++;
	});
}

async function saveTags(tags) {
	const tagsModel = new Tags();

	const idArray = await Promise.all(tags.map(async (tag) => {
		let id = await tagsModel.selectIdByName(tag);
		if(id === 0) {
			const [ OkPacket ] = await tagsModel.insert({ name: tag });
			id = OkPacket.insertId;
		}

		return id;		
	}));

	return idArray;
}

async function saveTagMap(contentIdArray, tagIdArray) {
	const tagMap = new TagMap();
	if(contentIdArray.length === 0 || tagIdArray.length ===0) return;

	const dataArray = [];
	contentIdArray.forEach((contentId) => {
		tagIdArray.forEach((tagId) => {
			dataArray.push({ contentId, tagId });
		})
	});

	return await tagMap.insertMultiple(dataArray);
}


export default router;