import express from 'express';
import fs from 'fs';
import config from '../config.js';
import jwtManager from '../common/jwtManager.js'
import Contents from '../models/Contents.js';
import Users from '../models/Users.js';
import Comments from '../models/Comments.js';
import Favorites from '../models/Favorites.js';
import Tags from '../models/Tags.js';
import TagMap from '../models/TagMap.js';

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
	if(Number.isNaN(req.params.contentId)) return res.sendStatus(404);
	
	let userId = 0;
	try {
		var decoded = await jwtManager.verifyUserAuthToken(req.query.userToken);
		userId = decoded.userId;
	}catch(e) {
		console.log(e);
	}

	try {
		const content = await getContent(req.params.contentId);
		if(content.id === undefined) {
			return res.json({
				payload: {
					content,
					prevId: content.prevId,
					nextId: content.nextId,
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
				},
				prevId: content.prevId,
				nextId: content.nextId,
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

router.delete('/', async (req, res) => {
	try {
		if(Number.isNaN(req.params.contentId)) throw new Error();
		var decoded = await jwtManager.verifyUserAuthToken(req.body.userToken);
	}catch(e) { return res.sendStatus(400); }

	const contents = new Contents();
	contents.mysql.beginTransaction(async (err) => {
		try {
			if(err) throw err;
			
			const result = await contents.selectOnce(['filename'], 'id = ?', [req.params.contentId]);
			const [ OkPacket ] = await contents.delete(
				'id = ? and userId = ?',
				[req.params.contentId, decoded.userId]
			);
			if(OkPacket.affectedRows === 0) return res.sendStatus(400).end();

			await new TagMap().delete('contentId = ?', [req.params.contentId]);
			await new Comments().delete('contentId = ?', [req.params.contentId]);
			await new Favorites().delete('contentId = ?', [req.params.contentId]);

			contents.mysql.commit((err) => {
				if(err) throw err;
				fs.unlink(`${config.contentsDir}/${result.filename}`, (err) => { if(err) throw err; });
				fs.unlink(`${config.contentsDir}/thumbnails/${result.filename}`, (err) => { if(err) throw err; });
			});	
			res.sendStatus(204);
		}catch(e) {
			contents.mysql.rollback();
			return res.sendStatus(500);
		}
	});

});

export default router;