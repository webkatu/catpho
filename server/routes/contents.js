import express from 'express';
import fs from 'fs';
import multer from 'multer';
import config from '../config.js'
import jwtManager from '../common/jwtManager.js'
import validator from '../common/validator.js'
import imageProcessor from '../common/imageProcessor.js'
import fscopy from '../common/fscopy.js';
import Contents from '../models/Contents.js';
import Users from '../models/Users.js';
import Comments from '../models/Comments.js';
import Favorites from '../models/Favorites.js';
import Tags from '../models/Tags.js';
import TagMap from '../models/TagMap.js';


const router = express.Router();

router.get('/', (req, res, next) => {
	res.locals.interval = 1;
	const page = Math.floor(req.query.page);
	res.locals.currentPage = (page <= 0 || Number.isNaN(page)) ? 1 : page;
	res.locals.offset = (res.locals.currentPage - 1) * res.locals.interval;
	res.locals.count = 0;
	res.locals.contents = [];
	console.log(req.query);
	next();
});

router.get('/', 
	//tagによる検索;
	async (req, res, next) => {
		if(req.query.tag === undefined) return next();
		//同じqueryが複数ある時は対応しない;
		if(Array.isArray(req.query.tag)) return next('route');

		try {
			const result = await new Tags().selectOnce(['id'], '?? = ?', { name: req.query.tag });
			if(result === null) return next('route');
			const tagId = result.id;

			const count = await new TagMap().count('*', '?? = ?', { tagId });
			const [ results ] = await new Contents().select(
				['id', 'filename'],
				'id in (select contentId from ?? where tagId = ?)',
				[new TagMap().tableName, tagId],
				'order by id desc limit ? offset ?',
				[res.locals.interval, res.locals.offset],
			);

			res.locals.count = count;
			res.locals.contents = results;
			return next('route');
		}catch(e) {
			console.log(e);
			return res.sendStatus(500);
		}
	},

	//投稿者による検索;
	async (req, res, next) => {
		if(req.query.poster === undefined) return next();
		//同じqueryが複数ある時は対応しない;
		if(Array.isArray(req.query.poster)) return next('route');

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
				[res.locals.interval, res.locals.offset]
			);

			res.locals.count = count;
			res.locals.contents = results;
			return next('route');
		}catch(e) {
			console.log(e);
			return res.sendStatus(500);
		}
	},
	
	//お気に入り検索;
	async (req, res, next) => {
		if(req.query.favoritesOf === undefined) return next();
		//同じqueryが複数ある時は対応しない;
		if(Array.isArray(req.query.favoritesOf)) return next('route');

		if(req.query.userToken === undefined) return next('route');
		try {
			var decoded = await jwtManager.verifyUserAuthToken(req.query.userToken);
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
			return next('route');
		}catch(e) {
			console.log(e);
			return res.sendStatus(500);
		}
	},

	//コメント投稿者による検索;
	async (req, res, next) => {
		if(req.query.includingCommentsOf === undefined) return next();
		//同じqueryが複数ある時は対応しない;
		if(Array.isArray(req.query.includingCommentsOf)) return next('route');

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
			return next('route');
		}catch(e) {
			console.log(e);
			return res.sendStatus(500);
		}
	},

	//条件なし検索;
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
			return next('route');
		}catch(e) {
			console.log(e);
			return res.sendStatus(500);
		}
	}
);

router.get('/', (req, res) => {
	const { interval, currentPage, count, contents } = res.locals;
	res.json({
		payload: {
			interval,
			currentPage,
			maxPage: Math.ceil(count / interval),
			contents: contents.map((content) => {
				return {
					...content,
					thumbnail: `${config.thumbnailsUrl}/${content.filename}`
				};
			}),
		},
	});
});


const upload = multer({
	dest: config.tmpDir,
	limits: {
		fileSize: validator.rule.fileMaxSize,
		files: validator.rule.fileMaxLength,
	},
	fileFilter(req, file, cb) {
		if(validator.validateImageFile(file)) return cb(null, true);

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
		try {
			const decoded = await jwtManager.verifyUserAuthToken(req.body.userToken);
			var userId = decoded.userId;
		}catch(e) {
			return res.sendStatus(401);
		}

		try {
			Object.assign(req.body, formatBody(req.body), { userId });
			if(! validator.validateContentBody(req.body)) return res.sendStatus(400);
			await changeFilename(req.files);

			const contents = new Contents();
			const mysql = contents.mysql;
			mysql.beginTransaction(async (err) => {
				try {
					if(err) throw err;

					var contentIdArray = await contents.saveContents(req.files, req.body);
					var tagIdArray = await new Tags().saveTags(req.body.tags);
					await new TagMap().saveTagMap(contentIdArray, tagIdArray);
					await saveUploadFiles(req.files);

					mysql.commit((err) => {
						if(err) throw err;

						res.sendStatus(204);
					});
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
	//tag文字列を配列にすると同時に重複は消す;
	const tags = (tag === '') ? [] : [ ...new Set(tag.split(/[\s ]+/)) ];

	const description = String(body.description).trim();

	return { name, sex, age, tag, tags, description };
}

async function changeFilename(files) {
	const result = await new Contents().selectOnce(['id'], undefined, undefined, 'order by id desc');
	let count = (result === null) ? 0 : result.id;

	files.forEach((file) => {
		file.filename = count + '_' + file.filename;
		count++;
	});
}

async function saveUploadFiles(files) {
	return Promise.all(files.map(async (file) => {
		const contentsPath = config.contentsDir + '/' + file.filename;
		const thumbnailPath = config.contentsDir + '/thumbnails/' + file.filename;

		await imageProcessor.createContent(file.path, contentsPath);
		await imageProcessor.createThumbnail(file.path, thumbnailPath);
		fs.unlink(file.path, (err) => { if(err) throw err; });
	}));
}

export default router;