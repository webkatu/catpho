import express from 'express';
import bodyParser from 'body-parser';
import contents from './routes/contents.js';
import upload from './routes/upload.js';
import uploads from './routes/uploads.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(__dirname + '/../public'));

app.use(['/', '/contents'], contents);

app.use('/upload', upload);

app.use('/uploads/', uploads);

app.get('*', (req, res, next) => {
	res.sendFile('/public/index.html', { root: __dirname + '/..'});
})

app.listen(3000, () => {
	console.log('server started.');
})