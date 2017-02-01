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

router.get('/', async (req, res) => {
	const contents = new Contents();
	const interval = 20;
	const currentPage = Number(req.query.page) || 1;

	try {
		var count = await contents.count();
		var [ results ] = await contents.selectAtPage(['id', 'filename'], currentPage, interval);
	}catch(e) { return res.sendStatus(500); }

	res.json({
		success: true,
		payload: {
			interval,
			currentPage,
			maxPage: Math.ceil(count / interval),
			contents: results,
		}
	});
});

router.param('id', (req, res, next, id) => {
	req.params.id = Number(id);
	next();
});

router.get('/:id', async (req, res) => {
	let userId = 0
	try {
		if(Number.isNaN(req.params.id)) throw new Error();
		const decoded = await new JWTManager().verifyUserAuthToken(req.query.userToken);
		userId = decoded.userId;
	}catch(e) { console.log(e); }

	try {
		const content = await getContent(req.params.id);
		if(content === null) return res.sendStatus(404);

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
					favoritesCount: await favorites.countOf('contentId', content.id),
					tags: await tags.selectTags(content.id),
				},
				isFavorite: await favorites.isFavorite(userId, content.id),
				commentsCount: await comments.countOf('contentId', content.id),
			}
		});
	}catch(e) { return res.sendStatus(500); }
});

async function getContent(id) {
	const contents = new Contents();
	const [ results ] = await contents.selectContent(id);
	if(results.length === 0 || results[0].id !== id) return null;

	const content = results[0];
	let prevId = 0;
	let nextId = 0;
	if(results.length === 3) {
		prevId = results[1].id;
		nextId = results[2].id;
	}else if(results.length === 2) {
		if(results[1].id < content.id) prevId = results[1].id;
		else nextId = results[1].id;
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
	const [ results ] = await users.selectBy('id', userId);
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
			
			const [ OkPacket ] = await contents.deleteContent(req.params.id, decoded.userId);
			if(OkPacket.affectedRows === 0) return res.sendStatus(400).end();

			await new TagMap().deleteBy('contentId', req.params.id);
			await new Comments().deleteBy('contentId', req.params.id);
			await new Favorites().deleteBy('contentId', req.params.id);

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
		const [ results ] = await new Contents().selectBy('id', req.params.id);
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
		const [ OkPacket ] = await comments.remove(commentId, req.params.id, decoded.userId);
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