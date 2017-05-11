import express from 'express';
import bodyParser from 'body-parser';
import url from 'url';
import sendMail from './routes/sendMail.js';
import contentShare from './routes/contentShare.js';
import config from './config.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', express.static(config.publicDir, { index: false }));

app.use('/sendmail', sendMail);

app.use('/contents/:contentId', contentShare);

app.get('*', (req, res, next) => {
	res.sendFile('/index.html', { root: config.publicDir });
});



app.listen(3000, () => {
	console.log('server started.');
})