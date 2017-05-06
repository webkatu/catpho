import express from 'express';
import bodyParser from 'body-parser';
import url from 'url';
import contents from './routes/contents.js';
import content from './routes/content.js';
import comments from './routes/comments.js';
import comment from './routes/comment.js';
import users from './routes/users.js';
import user from './routes/user.js';
import uploads from './routes/uploads.js';
import tags from './routes/tags.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEADER, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since');
	next();
});

app.use('/uploads', uploads);

app.param('contentId', (req, res, next, value) => {
	req.params.contentId = Number(value);
	next();
});

app.param('commentId', (req, res, next, value) => {
	req.params.commentId = Number(value);
	next();
});

app.use('/contents', contents);

app.use('/contents/:contentId', content);

app.use('/contents/:contentId/comments', comments);

app.use('/contents/:contentId/comments/:commentId', comment);

app.use('/users', users);

app.use('/users/:userName', user);

app.use('/tags', tags);

app.listen(3001, () => {
	console.log('server started.');
})