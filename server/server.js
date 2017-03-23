import express from 'express';
import url from 'url';
import bodyParser from 'body-parser';
import contents from './routes/contents.js';
import content from './routes/content.js';
import comments from './routes/comments.js';
import comment from './routes/comment.js';
import users from './routes/users.js';
import uploads from './routes/uploads.js';
import activation from './routes/activation.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
	const fullURL = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
	const urlObj = url.parse(fullURL);
	req.URL = { ...urlObj, origin: `${urlObj.protocol}//${urlObj.host}`, };
	next();
});

app.use('/', express.static(__dirname + '/../public', { index: false }));

app.use('/uploads', uploads);

app.get('*', (req, res, next) => {
	if(req.xhr) return next();
	res.sendFile('/public/index.html', { root: __dirname + '/..' });
});

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

app.use('/activation', activation);


app.listen(3000, () => {
	console.log('server started.');
})