'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _contents = require('./routes/contents.js');

var _contents2 = _interopRequireDefault(_contents);

var _content = require('./routes/content.js');

var _content2 = _interopRequireDefault(_content);

var _comments = require('./routes/comments.js');

var _comments2 = _interopRequireDefault(_comments);

var _comment = require('./routes/comment.js');

var _comment2 = _interopRequireDefault(_comment);

var _users = require('./routes/users.js');

var _users2 = _interopRequireDefault(_users);

var _user = require('./routes/user.js');

var _user2 = _interopRequireDefault(_user);

var _uploads = require('./routes/uploads.js');

var _uploads2 = _interopRequireDefault(_uploads);

var _tags = require('./routes/tags.js');

var _tags2 = _interopRequireDefault(_tags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEADER, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since');
	next();
});

app.use('/uploads', _uploads2.default);

app.param('contentId', function (req, res, next, value) {
	req.params.contentId = Number(value);
	next();
});

app.param('commentId', function (req, res, next, value) {
	req.params.commentId = Number(value);
	next();
});

app.use('/contents', _contents2.default);

app.use('/contents/:contentId', _content2.default);

app.use('/contents/:contentId/comments', _comments2.default);

app.use('/contents/:contentId/comments/:commentId', _comment2.default);

app.use('/users', _users2.default);

app.use('/users/:userName', _user2.default);

app.use('/tags', _tags2.default);

app.listen(3001, function () {
	console.log('server started.');
});