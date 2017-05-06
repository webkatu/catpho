'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

var _jwtManager = require('../common/jwtManager.js');

var _jwtManager2 = _interopRequireDefault(_jwtManager);

var _validator = require('../common/validator.js');

var _validator2 = _interopRequireDefault(_validator);

var _Users = require('../models/Users');

var _Users2 = _interopRequireDefault(_Users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function () {
	var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						if (!(req.query.userToken || req.query.emailOrUserName || req.query.password)) {
							_context.next = 2;
							break;
						}

						return _context.abrupt('return', next());

					case 2:
						return _context.abrupt('return', res.sendStatus(404));

					case 3:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function (_x, _x2, _x3) {
		return _ref.apply(this, arguments);
	};
}(),

//自動ログイン
function () {
	var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
		var decoded, user;
		return _regenerator2.default.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						if (!(req.query.userToken === undefined)) {
							_context2.next = 2;
							break;
						}

						return _context2.abrupt('return', next());

					case 2:
						_context2.prev = 2;
						_context2.next = 5;
						return _jwtManager2.default.verifyUserAuthToken(req.query.userToken);

					case 5:
						decoded = _context2.sent;

						if (!(decoded.expiresIn < new Date().getTime())) {
							_context2.next = 8;
							break;
						}

						throw new Error();

					case 8:
						_context2.next = 13;
						break;

					case 10:
						_context2.prev = 10;
						_context2.t0 = _context2['catch'](2);
						return _context2.abrupt('return', res.sendStatus(401));

					case 13:
						_context2.prev = 13;
						_context2.next = 16;
						return new _Users2.default().selectOnce(['id', 'email', 'userName', 'nickname', 'avatar', 'activation'], 'id = ? and userName = ?', [decoded.userId, decoded.userName]);

					case 16:
						user = _context2.sent;

						if (!(user === null)) {
							_context2.next = 19;
							break;
						}

						return _context2.abrupt('return', res.sendStatus(401));

					case 19:
						_context2.next = 25;
						break;

					case 21:
						_context2.prev = 21;
						_context2.t1 = _context2['catch'](13);

						console.log(_context2.t1);
						return _context2.abrupt('return', res.sendStatus(500));

					case 25:

						res.json({
							payload: (0, _extends3.default)({}, user, {
								avatar: _config2.default.avatarsUrl + '/' + user.avatar,
								userToken: req.query.userToken
							})
						});

					case 26:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined, [[2, 10], [13, 21]]);
	}));

	return function (_x4, _x5, _x6) {
		return _ref2.apply(this, arguments);
	};
}(),

//手動ログイン
function () {
	var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
		var user, userToken;
		return _regenerator2.default.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						if (!(!_validator2.default.validateEmailOrUserName(req.query.emailOrUserName) || !_validator2.default.validatePassword(req.query.password))) {
							_context3.next = 2;
							break;
						}

						return _context3.abrupt('return', res.sendStatus(401));

					case 2:
						_context3.prev = 2;
						_context3.next = 5;
						return new _Users2.default().authenticate(req.query.emailOrUserName, req.query.password);

					case 5:
						user = _context3.sent;

						if (!(user === null)) {
							_context3.next = 8;
							break;
						}

						return _context3.abrupt('return', res.sendStatus(401));

					case 8:
						_context3.next = 10;
						return _jwtManager2.default.createUserAuthToken({
							userId: user.id,
							userName: user.userName
						});

					case 10:
						userToken = _context3.sent;
						_context3.next = 17;
						break;

					case 13:
						_context3.prev = 13;
						_context3.t0 = _context3['catch'](2);

						console.log(_context3.t0);
						return _context3.abrupt('return', res.sendStatus(500));

					case 17:

						res.json({
							payload: (0, _extends3.default)({}, user, {
								avatar: _config2.default.avatarsUrl + '/' + user.avatar,
								userToken: userToken
							})
						});

					case 18:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, undefined, [[2, 13]]);
	}));

	return function (_x7, _x8, _x9) {
		return _ref3.apply(this, arguments);
	};
}());

var upload = (0, _multer2.default)().none();
router.post('/', upload, function () {
	var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res) {
		var users, result, _ref5, _ref6, OkPacket, user, userToken, activationToken;

		return _regenerator2.default.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						if (!(!_validator2.default.validateEmail(req.body.email) || !_validator2.default.validateUserName(req.body.userName) || !_validator2.default.validatePassword(req.body.password))) {
							_context4.next = 2;
							break;
						}

						return _context4.abrupt('return', res.sendStatus(400));

					case 2:
						_context4.prev = 2;
						users = new _Users2.default();
						//すでに登録されていれば登録拒否;

						_context4.next = 6;
						return users.selectOnce('id', 'email = ? or userName = ?', [req.body.email, req.body.userName]);

					case 6:
						result = _context4.sent;

						if (!result) {
							_context4.next = 9;
							break;
						}

						return _context4.abrupt('return', res.sendStatus(401));

					case 9:
						_context4.next = 11;
						return users.register(req.body);

					case 11:
						_ref5 = _context4.sent;
						_ref6 = (0, _slicedToArray3.default)(_ref5, 1);
						OkPacket = _ref6[0];
						user = {
							id: OkPacket.insertId,
							email: req.body.email,
							userName: req.body.userName,
							nickname: req.body.userName,
							avatar: _config2.default.defaultAvatarFileName,
							activation: 0
						};
						_context4.next = 17;
						return _jwtManager2.default.createUserAuthToken({
							userId: OkPacket.insertId,
							userName: req.body.userName
						});

					case 17:
						userToken = _context4.sent;
						_context4.next = 20;
						return _jwtManager2.default.createActivationToken({
							userId: OkPacket.insertId,
							userName: req.body.userName,
							email: req.body.email
						});

					case 20:
						activationToken = _context4.sent;
						_context4.next = 27;
						break;

					case 23:
						_context4.prev = 23;
						_context4.t0 = _context4['catch'](2);

						console.log(_context4.t0);
						return _context4.abrupt('return', res.sendStatus(500));

					case 27:

						res.json({
							payload: (0, _extends3.default)({}, user, {
								avatar: _config2.default.avatarsUrl + '/' + user.avatar,
								userToken: userToken,
								activationToken: activationToken
							})
						});

					case 28:
					case 'end':
						return _context4.stop();
				}
			}
		}, _callee4, undefined, [[2, 23]]);
	}));

	return function (_x10, _x11) {
		return _ref4.apply(this, arguments);
	};
}());

exports.default = router;