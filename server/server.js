import express from 'express';
import url from 'url';
import bodyParser from 'body-parser';
import contents from './routes/contents.js';
import upload from './routes/upload.js';
import uploads from './routes/uploads.js';
import signIn from './routes/signIn.js';
import signUp from './routes/signUp.js';
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
	res.sendFile('/public/index.html', { root: __dirname + '/..'});
});

app.use(['/', '/contents'], contents);

app.use('/upload', upload);

app.use('/signin', signIn);

app.use('/signup', signUp);

app.use('/activation', activation);


app.listen(3000, () => {
	console.log('server started.');
})