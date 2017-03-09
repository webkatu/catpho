import express from 'express';
import fs from 'fs';
import multer from 'multer';
import config from '../config.js'
import JWTManager from '../common/JWTManager.js'
import Validator from '../common/Validator.js'
import Contents from '../models/Contents.js';
import Users from '../models/Users.js';
import Comments from '../models/Comments.js';
import Favorites from '../models/Favorites.js';
import Tags from '../models/Tags.js';
import TagMap from '../models/TagMap.js';


const router = express.Router();

router.get('/', 
	(req, res, next) => {
		res.locals.interval = 20;
		const page = Math.floor(req.query.page);
		res.locals.currentPage = (page <= 0 || Number.isNaN(page)) ? 1 : page;
		res.locals.offset = (res.locals.currentPage - 1) * res.locals.interval;
		res.locals.count = 0;
		res.locals.contents = [];
		console.log(req.query);
		next();
	},

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


router.param('id', (req, res, next, id) => {
	req.params.id = Number(id);
	next();
});

router.get('/:id', async (req, res) => {
	if(Number.isNaN(req.params.id)) return res.sendStatus(404);
	
	let userId = 0;
	try {
		var decoded = await new JWTManager().verifyUserAuthToken(req.query.userToken);
		userId = decoded.userId;
	}catch(e) {
		console.log(e);
	}

	try {
		const content = await getContent(req.params.id);
		if(content.id === undefined) {
			return res.json({
				payload: {
					content,
					isFavorite: false,
					commentsCount: 0,
				},
			});
		}

		const comments = new Comments();
		const favorites = new Favorites();
		const tags = new Tags();

		res.json({
			success: true,
			payload: {
				content: {
					id: content.id,
					name: content.name,
					age: content.age,
					sex: content.sex,
					description: content.description,
					postedDate: content.created,
					imageURL: `/uploads/contents/${content.filename}`,
					poster: await getPoster(content.userId),
					favoritesCount: await favorites.count('*', '?? = ?', {contentId: content.id}),
					tags: await tags.selectTags(content.id),
					prevId: content.prevId,
					nextId: content.nextId,
				},
				isFavorite: await favorites.isFavorite(userId, content.id),
				commentsCount: await comments.count('*', '?? = ?', {contentId: content.id}),
			}
		});
	}catch(e) {
		console.log(e);
		return res.sendStatus(500);
	}
});

async function getContent(id) {
	const contents = new Contents();
	const [ results ] = await contents.selectContent(id);

	let content = {};
	let prevId = 0;
	let nextId = 0;
	if(results.length === 3) {
		content = results[0];
		prevId = results[1].id;
		nextId = results[2].id;
	}else if(results.length === 2) {
		if(results[0].id !== id) {
			//コンテンツが無い場合;
			prevId = results[0].id;
			nextId = results[1].id;
		}else {
			//idが先頭か末尾のとき;
			content = results[0];
			if(results[1].id < id) prevId = results[1].id;
			else nextId = results[1].id;
		}
	}else if(results.length === 1) {
		//コンテンツが無くかつidが先頭か末尾のとき;
		if(results[0].id < id) prevId = results[0].id;
		else nextId = results[0].id;
	}

	content.prevId = prevId;
	content.nextId = nextId;
	return content;
}

async function getPoster(userId) {
	const poster = {
		avatar: '',
		userName: '',
		nickname: '',
	};

	const users = new Users();
	const [ results ] = await users.select('*', '?? = ?', {id: userId});
	if(results.length !== 0) {
		const user = results[0];
		for(const prop in poster) poster[prop] = user[prop];
	}
	return poster;
}

router.delete('/:id', async (req, res) => {
	try {
		if(Number.isNaN(req.params.id)) throw new Error();
		var decoded = await new JWTManager().verifyUserAuthToken(req.body.userToken);
	}catch(e) { return res.sendStatus(400); }

	const contents = new Contents();
	try {
		contents.mysql.beginTransaction(async (err) => {
			if(err) throw err;
			
			const [ OkPacket ] = await contents.delete(
				'id = ? and userId = ?',
				[req.params.id, decoded.userId]
			);
			if(OkPacket.affectedRows === 0) return res.sendStatus(400).end();

			await new TagMap().delete('contentId = ?', [req.params.id]);
			await new Comments().delete('contentId = ?', [req.params.id]);
			await new Favorites().delete('contentId = ?', [req.params.id]);

			contents.mysql.commit((err) => { if(err) throw err;	});	
		});

		res.sendStatus(204);
	}catch(e) {
		contents.mysql.rollback();
		return res.sendStatus(500);
	}

});

router.get('/:id/comments', async (req, res) => {
	try {
		const comments = new Comments();
		const [ results ] = await comments.selectComments(req.params.id);
		res.json({
			success: true,
			payload: {
				comments: results,
			}
		});
	}catch(e) { return res.sendStatus(500); }
});


router.post('/:id/comments', multer().none(), async (req, res) => {
	try {
		const validator = new Validator();
		if(! validator.validateComment(req.body.comment)) throw new Error();
		var decoded = await new JWTManager().verifyUserAuthToken(req.body.userToken);
		const [ results ] = await new Contents().select('*', 'id = ?', [req.params.id]);
		if(results.length === 0) throw new Error();
	}catch(e) {
		return res.sendStatus(400);
	}

	try {
		const comments = new Comments();
		const [ OkPacket ] = await comments.insert({
			contentId: req.params.id,
			userId: decoded.userId,
			comment: req.body.comment,
		});

		const [ results ] = await comments.selectComments(req.params.id);

		res.json({
			success: true,
			payload: {
				comments: results,
				commentId: OkPacket.insertId,
			},
		});
	}catch(e) { console.log(e);return res.sendStatus(500); }
});


router.delete('/:id/comments/:commentId', async (req, res) => {
	const commentId = Number(req.params.commentId);
	try {
		if(Number.isNaN(req.params.id)) throw new Error();
		if(Number.isNaN(commentId)) throw new Error();
		var decoded = await new JWTManager().verifyUserAuthToken(req.body.userToken);
	}catch(e) { return res.sendStatus(400); }

	try {
		const comments = new Comments();
		const [ OkPacket ] = await comments.delete(
			'id = ? and contentId = ? and userId = ?', 
			[commentId, req.params.id, decoded.userId]
		);
		if(OkPacket.affectedRows === 0) return res.sendStatus(400);

		const [ results ] = await comments.selectComments(req.params.id);

		res.json({
			success: true,
			payload: {
				comments: results,
			},
		});
	}catch(e) { return res.sendStatus(500); }
});

export default router;