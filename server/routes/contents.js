import express from 'express';
import fs from 'fs';
import multer from 'multer';
import config from '../config.js'
import JWTManager from '../common/JWTManager.js'
import validationRule from '../common/validationRule.js'
import Validator from '../common/Validator.js'
import ImageProcessor from '../common/ImageProcessor.js'
import fscopy from '../common/fscopy.js';
import Contents from '../models/Contents.js';
import Users from '../models/Users.js';
import Comments from '../models/Comments.js';
import Favorites from '../models/Favorites.js';
import Tags from '../models/Tags.js';
import TagMap from '../models/TagMap.js';


const router = express.Router();

router.get('/', (req, res, next) => {
	res.locals.interval = 20;
	const page = Math.floor(req.query.page);
	res.locals.currentPage = (page <= 0 || Number.isNaN(page)) ? 1 : page;
	res.locals.offset = (res.locals.currentPage - 1) * res.locals.interval;
	res.locals.count = 0;
	res.locals.contents = [];
	console.log(req.query);
	next();
});

router.get('/', 
	async (req, res, next) => {
		if(req.query.poster === undefined) return next();

		try {
			const users = new Users();
			const result = await users.selectOnce(['id'], '?? = ?', {userName: req.query.poster});
			if(result === null) return next('route');

			const userId = result.id;

			const contents = new Contents();
			const count = await contents.count('*', '?? = ?', { userId: userId });
			const [ results ] = await contents.select(
				['id', 'filename'], 
				'?? = ?', 
				{ userId: userId },
				'order by id desc limit ? offset ?',
				[ res.locals.interval, res.locals.offset ]
			);

			res.locals.count = count;
			res.locals.contents = results;
		}catch(e) {
			console.log(e);
			return res.sendStatus(500);
		}
		next('route');
	},
	
	async (req, res, next) => {
		if(req.query.favoritesOf === undefined) return next();

		if(req.query.userToken === undefined) return next('route');
		try {
			var decoded = await new JWTManager().verifyUserAuthToken(req.query.userToken);
		}catch(e) { return next('route'); }
		if(req.query.favoritesOf !== decoded.userName) return next('route');

		const userId = decoded.userId;
		try {
			const favorites = new Favorites();
			const contents = new Contents();
			const count = await favorites.count('*', '?? = ?', { userId: userId });
			const [ results ] = await contents.select(
				['id', 'filename'],
				`id in (select contentId from ${favorites.tableName} where ?? = ?)`,
				{ userId: userId },
				'order by id desc limit ? offset ?',
				[res.locals.interval, res.locals.offset]
			);

			res.locals.count = count;
			res.locals.contents = results;
		}catch(e) {
			console.log(e);
			return res.sendStatus(500);
		}
		next('route');
	},

	async (req, res, next) => {
		if(req.query.includingCommentsOf === undefined) return next();

		try {
			const users = new Users();
			const result = await users.selectOnce(['id'], '?? = ?', { userName: req.query.includingCommentsOf });
			if(result === null) return next('route');
			
			const userId = result.id;
			const comments = new Comments();
			const contents = new Contents();

			const count = await comments.count('distinct contentId', '?? = ?', { userId: userId });
			const [ results ] = await contents.select(
				['id', 'filename'],
				`id in (select contentId from ${comments.tableName} where ?? = ?)`,
				{ userId: userId },
				'order by id desc limit ? offset ?',
				[res.locals.interval, res.locals.offset]
			);

			res.locals.count = count;
			res.locals.contents = results;
		}catch(e) {
			console.log(e);
			return res.sendStatus(500);
		}
		next('route');
	},

	async (req, res, next) => {
		const contents = new Contents();
		try {
			const count = await contents.count();
			const [ results ] = await contents.select(
				['id', 'filename'],
				undefined,
				undefined,
				'order by id desc limit ? offset ?',
				[res.locals.interval, res.locals.offset]
			);

			res.locals.count = count;
			res.locals.contents = results;
		}catch(e) {
			console.log(e);
			return res.sendStatus(500);
		}
		next('route');
	}
);

router.get('/', (req, res) => {
	const { interval, currentPage, count, contents } = res.locals;
	res.json({
		payload: {
			interval,
			currentPage,
			maxPage: Math.ceil(count / interval),
			contents,
		},
	});
});


const upload = multer({
	dest: config.tmpDir,
	limits: {
		fileSize: validationRule.fileMaxSize,
		files: validationRule.fileMaxLength,
	},
	fileFilter(req, file, cb) {
		if(new Validator().validateImageFile(file)) return cb(null, true);

		req.fileValidationError = true;
		cb(null, false);
	},
}).array('files');

router.post('/',
	(req, res, next) => {
		upload(req, res, (err) => {
			if(err || req.fileValidationError) {
				return res.sendStatus(400);
			}

			next();
		});
	},
	async (req, res, next) => {

		Object.assign(req.body, formatBody(req.body));
		req.body.userId = 1;

		const validator = new Validator();
		if(! validator.validateContentBody(req.body)) return res.sendStatus(400);
		console.log(req.body);
		console.log(req.files);

		try {
			await changeFilename(req.files);
			await saveUploadFiles(req.files);

			const contents = new Contents();
			const mysql = contents.mysql;
			mysql.beginTransaction(async (err) => {
				try {
					if(err) throw err;

					var contentIdArray = await contents.saveContents(req.files, req.body);
					var tagIdArray = await new Tags().saveTags(req.body.tags);
					await new TagMap().saveTagMap(contentIdArray, tagIdArray);

					mysql.commit((err) => { if(err) throw err; });
					res.sendStatus(204);
				}catch(e) {
					console.log(e);
					mysql.rollback();
					return res.sendStatus(500);
				}
			});
		}catch(e) {
			console.log(e);
			return res.sendStatus(500);
		}
	}
);


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

async function changeFilename(files) {
	const contents = new Contents();

	let count = await contents.count();

	files.forEach((file) => {
		count++;
		file.filename = count + '_' + file.filename;
	});
}

async function saveUploadFiles(files) {
	return Promise.all(files.map(async (file) => {
		const imageProcessor = new ImageProcessor();
		const contentsPath = config.contentsDir + '/' + file.filename;
		const thumbnailPath = config.contentsDir + '/thumbnails/' + file.filename;

		await imageProcessor.createContent(file.path, contentsPath);
		await imageProcessor.createThumbnail(file.path, thumbnailPath);
		fs.unlink(file.path, (err) => { if(err) throw err; });
	}));
}

export default router;