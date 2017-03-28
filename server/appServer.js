import express from 'express';
import bodyParser from 'body-parser';
import url from 'url';
import sendMail from './routes/sendMail.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
app.use((req, res, next) => {
	const fullURL = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
	const urlObj = url.parse(fullURL);
	req.URL = { ...urlObj, origin: `${urlObj.protocol}//${urlObj.host}`, };
	next();
});
*/

app.use('/', express.static(__dirname + '/../public', { index: false }));

app.use('/sendmail', sendMail);

app.get('*', (req, res, next) => {
	res.sendFile('/public/index.html', { root: __dirname + '/..' });
});



app.listen(3000, () => {
	console.log('server started.');
})