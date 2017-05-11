'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _sendMail = require('./routes/sendMail.js');

var _sendMail2 = _interopRequireDefault(_sendMail);

var _contentShare = require('./routes/contentShare.js');

var _contentShare2 = _interopRequireDefault(_contentShare);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.use('/', _express2.default.static(_config2.default.publicDir, { index: false }));

app.use('/sendmail', _sendMail2.default);

app.use('/contents/:contentId', _contentShare2.default);

app.get('*', function (req, res, next) {
	res.sendFile('/index.html', { root: _config2.default.publicDir });
});

app.listen(3000, function () {
	console.log('server started.');
});