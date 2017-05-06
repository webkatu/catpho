'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _isNan = require('babel-runtime/core-js/number/is-nan');

var _isNan2 = _interopRequireDefault(_isNan);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var validate = function () {
	var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(currentUser, body, file) {
		var email, nickname, currentPassword, password, restoringAvatar, same, passed;
		return _regenerator2.default.wrap(function _callee6$(_context6) {
			while (1) {
				switch (_context6.prev = _context6.next) {
					case 0:
						email = body.email, nickname = body.nickname, currentPassword = body.currentPassword, password = body.password, restoringAvatar = body.restoringAvatar;

						if (!(currentUser === null)) {
							_context6.next = 3;
							break;
						}

						return _context6.abrupt('return', false);

					case 3:
						if (!(email !== '' && !_validator2.default.validateEmail(email))) {
							_context6.next = 5;
							break;
						}

						return _context6.abrupt('return', false);

					case 5:
						if (!(nickname !== '' && !_validator2.default.validateNickname(nickname))) {
							_context6.next = 7;
							break;
						}

						return _context6.abrupt('return', false);

					case 7:
						if (!(password !== '')) {
							_context6.next = 17;
							break;
						}

						if (_validator2.default.validatePassword(currentPassword)) {
							_context6.next = 10;
							break;
						}

						return _context6.abrupt('return', false);

					case 10:
						if (_validator2.default.validatePassword(password)) {
							_context6.next = 12;
							break;
						}

						return _context6.abrupt('return', false);

					case 12:
						_context6.next = 14;
						return _bcrypt2.default.compare(currentPassword, currentUser.password);

					case 14:
						same = _context6.sent;

						if (same) {
							_context6.next = 17;
							break;
						}

						return _context6.abrupt('return', false);

					case 17:
						passed = ['email', 'nickname', 'password'].some(function (prop) {
							if (body[prop] === '') return false;
							if (body[prop] === currentUser[prop]) return false;
							if (prop === 'password' && password === currentPassword) return false;
							return true;
						});
						//変更すべき要素がない時のリクエスト;

						if (!(passed === false && file === undefined && restoringAvatar === undefined)) {
							_context6.next = 20;
							break;
						}

						return _context6.abrupt('return', false);

					case 20:
						return _context6.abrupt('return', true);

					case 21:
					case 'end':
						return _context6.stop();
				}
			}
		}, _callee6, this);
	}));

	return function validate(_x15, _x16, _x17) {
		return _ref6.apply(this, arguments);
	};
}();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

var _bcrypt = require('../common/bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jwtManager = require('../common/jwtManager.js');

var _jwtManager2 = _interopRequireDefault(_jwtManager);

var _validator = require('../common/validator.js');

var _validator2 = _interopRequireDefault(_validator);

var _imageProcessor = require('../common/imageProcessor.js');

var _imageProcessor2 = _interopRequireDefault(_imageProcessor);

var _mailer = require('../common/mailer.js');

var _mailer2 = _interopRequireDefault(_mailer);

var _Users = require('../models/Users');

var _Users2 = _interopRequireDefault(_Users);

var _Contents = require('../models/Contents');

var _Contents2 = _interopRequireDefault(_Contents);

var _TagMap = require('../models/TagMap');

var _TagMap2 = _interopRequireDefault(_TagMap);

var _Tags = require('../models/Tags');

var _Tags2 = _interopRequireDefault(_Tags);

var _Favorites = require('../models/Favorites');

var _Favorites2 = _interopRequireDefault(_Favorites);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router({ mergeParams: true });

router.get('/', function () {
	var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
		var result, postCount;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return new _Users2.default().selectOnce(['id', 'userName', 'nickname', 'avatar', 'created'], '?? = ?', { userName: req.params.userName });

					case 3:
						result = _context.sent;

						if (!(result === null)) {
							_context.next = 6;
							break;
						}

						return _context.abrupt('return', res.sendStatus(404));

					case 6:
						_context.next = 8;
						return new _Contents2.default().count('*', '?? = ?', { userId: result.id });

					case 8:
						postCount = _context.sent;


						res.json({
							payload: {
								userName: result.userName,
								nickname: result.nickname,
								avatar: _config2.default.avatarsUrl + '/' + result.avatar,
								created: function () {
									var date = new Date(result.created);
									return date.getFullYear() + '/' + (date.getMonth() + 1);
								}(),
								postCount: postCount
							}
						});
						_context.next = 16;
						break;

					case 12:
						_context.prev = 12;
						_context.t0 = _context['catch'](0);

						console.log(_context.t0);
						return _context.abrupt('return', res.sendStatus(500));

					case 16:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 12]]);
	}));

	return function (_x, _x2, _x3) {
		return _ref.apply(this, arguments);
	};
}());

var upload = (0, _multer2.default)({
	dest: _config2.default.tmpDir,
	limits: {
		fileSize: _validator2.default.rule.fileMaxSize
	},
	fileFilter: function fileFilter(req, file, cb) {
		if (_validator2.default.validateImageFile(file)) return cb(null, true);

		req.fileValidationError = true;
		cb(null, false);
	}
}).single('avatar');

router.patch('/', function (req, res, next) {
	upload(req, res, function (err) {
		if (err || req.fileValidationError) {
			console.log(err, req.fileValidationError);
			return res.sendStatus(400);
		}
		next();
	});
},

//passwordReissue
function () {
	var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
		var decoded, result, userId, userName, email, password;
		return _regenerator2.default.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						if (!(req.body.passwordReissueToken === undefined)) {
							_context2.next = 2;
							break;
						}

						return _context2.abrupt('return', next());

					case 2:
						_context2.prev = 2;
						_context2.next = 5;
						return _jwtManager2.default.verifyPasswordReissueToken(req.body.passwordReissueToken);

					case 5:
						decoded = _context2.sent;
						_context2.next = 8;
						return new _Users2.default().selectOnce(['id', 'userName'], 'userName = ? and email = ?', [req.params.userName, decoded.email]);

					case 8:
						result = _context2.sent;

						if (!(result === null)) {
							_context2.next = 11;
							break;
						}

						throw new Error();

					case 11:
						userId = result.id;
						userName = result.userName;
						email = decoded.email;
						_context2.next = 19;
						break;

					case 16:
						_context2.prev = 16;
						_context2.t0 = _context2['catch'](2);
						return _context2.abrupt('return', res.sendStatus(400));

					case 19:
						_context2.prev = 19;
						_context2.next = 22;
						return new _Users2.default().reissuePassword(userId);

					case 22:
						password = _context2.sent;

						_mailer2.default.sendPasswordReissueMail({
							to: email,
							userName: userName,
							password: password
						}).catch(function (err) {
							console.log(err);
						});

						return _context2.abrupt('return', res.sendStatus(204));

					case 27:
						_context2.prev = 27;
						_context2.t1 = _context2['catch'](19);

						console.log(_context2.t1);
						return _context2.abrupt('return', res.sendStatus(500));

					case 31:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined, [[2, 16], [19, 27]]);
	}));

	return function (_x4, _x5, _x6) {
		return _ref2.apply(this, arguments);
	};
}(),

//validation
function () {
	var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
		var decoded;
		return _regenerator2.default.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						_context3.prev = 0;
						_context3.next = 3;
						return _jwtManager2.default.verifyUserAuthToken(req.body.userToken);

					case 3:
						decoded = _context3.sent;

						if (!(req.params.userName !== decoded.userName)) {
							_context3.next = 6;
							break;
						}

						throw new Error();

					case 6:

						res.locals.userId = decoded.userId;
						res.locals.userName = decoded.userName;
						next();
						_context3.next = 15;
						break;

					case 11:
						_context3.prev = 11;
						_context3.t0 = _context3['catch'](0);

						console.log(_context3.t0);
						return _context3.abrupt('return', res.sendStatus(401));

					case 15:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, undefined, [[0, 11]]);
	}));

	return function (_x7, _x8, _x9) {
		return _ref3.apply(this, arguments);
	};
}(),

//activation
function () {
	var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, next) {
		var decoded;
		return _regenerator2.default.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						if (!(req.body.activationToken === undefined)) {
							_context4.next = 2;
							break;
						}

						return _context4.abrupt('return', next());

					case 2:
						_context4.prev = 2;
						_context4.next = 5;
						return _jwtManager2.default.verifyActivationToken(req.body.activationToken);

					case 5:
						decoded = _context4.sent;

						if (!(decoded.userName !== res.locals.userName)) {
							_context4.next = 8;
							break;
						}

						throw new Error();

					case 8:
						_context4.next = 13;
						break;

					case 10:
						_context4.prev = 10;
						_context4.t0 = _context4['catch'](2);
						return _context4.abrupt('return', res.sendStatus(400));

					case 13:
						_context4.prev = 13;
						_context4.next = 16;
						return new _Users2.default().activate(res.locals.userId);

					case 16:
						return _context4.abrupt('return', res.json({ payload: { activation: 1 } }));

					case 19:
						_context4.prev = 19;
						_context4.t1 = _context4['catch'](13);

						console.log(_context4.t1);
						return _context4.abrupt('return', res.sendStatus(500));

					case 23:
					case 'end':
						return _context4.stop();
				}
			}
		}, _callee4, undefined, [[2, 10], [13, 19]]);
	}));

	return function (_x10, _x11, _x12) {
		return _ref4.apply(this, arguments);
	};
}(), function () {
	var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(req, res) {
		var currentUser, data, user;
		return _regenerator2.default.wrap(function _callee5$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						_context5.prev = 0;
						_context5.next = 3;
						return new _Users2.default().selectOnce('*', 'id = ?', [res.locals.userId]);

					case 3:
						currentUser = _context5.sent;
						_context5.next = 6;
						return validate(currentUser, req.body, req.file);

					case 6:
						if (_context5.sent) {
							_context5.next = 8;
							break;
						}

						return _context5.abrupt('return', res.sendStatus(400));

					case 8:
						data = {};

						if (req.body.nickname !== '' && req.body.nickname !== currentUser.nickname) data.nickname = req.body.nickname;
						if (req.body.email !== '' && req.body.email !== currentUser.email) {
							data.email = req.body.email;
							data.activation = 0;
						}

						if (!(req.body.password !== '' && req.body.password !== req.body.currentPassword)) {
							_context5.next = 15;
							break;
						}

						_context5.next = 14;
						return _bcrypt2.default.createHash(req.body.password);

					case 14:
						data.password = _context5.sent;

					case 15:
						if (req.body.restoringAvatar) data.avatar = _config2.default.defaultAvatarFileName;
						if (req.file) data.avatar = req.file.filename;

						_context5.next = 19;
						return new _Users2.default().update(data, 'id = ?', [res.locals.userId]);

					case 19:
						if (!req.file) {
							_context5.next = 23;
							break;
						}

						_context5.next = 22;
						return _imageProcessor2.default.createAvatar(req.file.path, _config2.default.avatarsDir + '/' + req.file.filename);

					case 22:
						_fs2.default.unlink(req.file.path, function () {});

					case 23:
						//avatarが変更されたら以前のavatarを消す;
						if (data.avatar) {
							if (currentUser.avatar !== _config2.default.defaultAvatarFileName) {
								_fs2.default.unlink(_config2.default.avatarsDir + '/' + currentUser.avatar, function () {});
							}
						}

						user = (0, _extends3.default)({}, data);

						delete user.password;
						if (user.avatar) user.avatar = _config2.default.avatarsUrl + '/' + user.avatar;
						_context5.next = 33;
						break;

					case 29:
						_context5.prev = 29;
						_context5.t0 = _context5['catch'](0);

						console.log(_context5.t0);
						return _context5.abrupt('return', res.sendStatus(500));

					case 33:

						res.json({ payload: (0, _extends3.default)({}, user) });

					case 34:
					case 'end':
						return _context5.stop();
				}
			}
		}, _callee5, undefined, [[0, 29]]);
	}));

	return function (_x13, _x14) {
		return _ref5.apply(this, arguments);
	};
}());

router.delete('/', function () {
	var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(req, res, next) {
		var decoded, userId, users, contents, mysql;
		return _regenerator2.default.wrap(function _callee8$(_context8) {
			while (1) {
				switch (_context8.prev = _context8.next) {
					case 0:
						_context8.prev = 0;
						_context8.next = 3;
						return _jwtManager2.default.verifyUserAuthToken(req.query.userToken);

					case 3:
						decoded = _context8.sent;
						userId = decoded.userId;

						if (!(decoded.userName !== req.params.userName)) {
							_context8.next = 7;
							break;
						}

						throw new Error();

					case 7:
						_context8.next = 12;
						break;

					case 9:
						_context8.prev = 9;
						_context8.t0 = _context8['catch'](0);
						return _context8.abrupt('return', res.sendStatus(401));

					case 12:
						users = new _Users2.default();
						contents = new _Contents2.default();
						mysql = users.mysql;

						mysql.beginTransaction(function () {
							var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(err) {
								var _ref9, avatar, _ref10, _ref11, deletedFilenames;

								return _regenerator2.default.wrap(function _callee7$(_context7) {
									while (1) {
										switch (_context7.prev = _context7.next) {
											case 0:
												_context7.prev = 0;

												if (!err) {
													_context7.next = 3;
													break;
												}

												throw err;

											case 3:
												_context7.next = 5;
												return new _Favorites2.default().deleteByWithdrawal(userId);

											case 5:
												_context7.next = 7;
												return new _TagMap2.default().deleteByUserId(userId);

											case 7:
												_context7.next = 9;
												return new _Tags2.default().deleteUnusedTags();

											case 9:
												_context7.next = 11;
												return users.selectOnce('avatar', 'id = ?', [userId]);

											case 11:
												_ref9 = _context7.sent;
												avatar = _ref9.avatar;
												_context7.next = 15;
												return contents.select('filename', '?? = ?', { userId: userId });

											case 15:
												_ref10 = _context7.sent;
												_ref11 = (0, _slicedToArray3.default)(_ref10, 1);
												deletedFilenames = _ref11[0];
												_context7.next = 20;
												return users.delete('id = ?', [userId]);

											case 20:
												_context7.next = 22;
												return contents.delete('?? = ?', { userId: userId });

											case 22:

												mysql.commit(function (err) {
													if (err) throw err;

													if (avatar !== _config2.default.defaultAvatarFileName) {
														_fs2.default.unlink(_config2.default.avatarsDir + '/' + avatar, function () {});
													}

													deletedFilenames.forEach(function (obj) {
														_fs2.default.unlink(_config2.default.contentsDir + '/' + obj.filename, function () {});
														_fs2.default.unlink(_config2.default.contentsDir + '/thumbnails/' + obj.filename, function () {});
													});

													res.sendStatus(204);
												});
												_context7.next = 30;
												break;

											case 25:
												_context7.prev = 25;
												_context7.t0 = _context7['catch'](0);

												console.log(_context7.t0);
												mysql.rollback();
												res.sendStatus(500);

											case 30:
											case 'end':
												return _context7.stop();
										}
									}
								}, _callee7, undefined, [[0, 25]]);
							}));

							return function (_x21) {
								return _ref8.apply(this, arguments);
							};
						}());

					case 16:
					case 'end':
						return _context8.stop();
				}
			}
		}, _callee8, undefined, [[0, 9]]);
	}));

	return function (_x18, _x19, _x20) {
		return _ref7.apply(this, arguments);
	};
}());

router.post('/favorites', function () {
	var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(req, res) {
		var contentId, decoded, _ref13, _ref14, OkPacket;

		return _regenerator2.default.wrap(function _callee9$(_context9) {
			while (1) {
				switch (_context9.prev = _context9.next) {
					case 0:
						contentId = Number(req.body.contentId);
						_context9.prev = 1;

						if (!(0, _isNan2.default)(contentId)) {
							_context9.next = 4;
							break;
						}

						throw new Error();

					case 4:
						_context9.next = 6;
						return _jwtManager2.default.verifyUserAuthToken(req.body.userToken);

					case 6:
						decoded = _context9.sent;

						if (!(req.params.userName !== decoded.userName)) {
							_context9.next = 9;
							break;
						}

						throw new Error();

					case 9:
						_context9.next = 14;
						break;

					case 11:
						_context9.prev = 11;
						_context9.t0 = _context9['catch'](1);
						return _context9.abrupt('return', res.sendStatus(400));

					case 14:
						_context9.prev = 14;
						_context9.next = 17;
						return new _Favorites2.default().insert({
							userId: decoded.userId,
							contentId: contentId
						});

					case 17:
						_ref13 = _context9.sent;
						_ref14 = (0, _slicedToArray3.default)(_ref13, 1);
						OkPacket = _ref14[0];


						res.sendStatus(204);
						_context9.next = 27;
						break;

					case 23:
						_context9.prev = 23;
						_context9.t1 = _context9['catch'](14);

						console.log(_context9.t1);
						return _context9.abrupt('return', res.sendStatus(500));

					case 27:
					case 'end':
						return _context9.stop();
				}
			}
		}, _callee9, undefined, [[1, 11], [14, 23]]);
	}));

	return function (_x22, _x23) {
		return _ref12.apply(this, arguments);
	};
}());

router.delete('/favorites/:contentId', function () {
	var _ref15 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(req, res) {
		var contentId, decoded, _ref16, _ref17, OkPacket;

		return _regenerator2.default.wrap(function _callee10$(_context10) {
			while (1) {
				switch (_context10.prev = _context10.next) {
					case 0:
						contentId = Number(req.params.contentId);
						_context10.prev = 1;

						if (!(0, _isNan2.default)(contentId)) {
							_context10.next = 4;
							break;
						}

						throw new Error();

					case 4:
						_context10.next = 6;
						return _jwtManager2.default.verifyUserAuthToken(req.body.userToken);

					case 6:
						decoded = _context10.sent;

						if (!(req.params.userName !== decoded.userName)) {
							_context10.next = 9;
							break;
						}

						throw new Error();

					case 9:
						_context10.next = 14;
						break;

					case 11:
						_context10.prev = 11;
						_context10.t0 = _context10['catch'](1);
						return _context10.abrupt('return', res.sendStatus(400));

					case 14:
						_context10.prev = 14;
						_context10.next = 17;
						return new _Favorites2.default().delete('userId = ? and contentId = ?', [decoded.userId, contentId]);

					case 17:
						_ref16 = _context10.sent;
						_ref17 = (0, _slicedToArray3.default)(_ref16, 1);
						OkPacket = _ref17[0];

						if (!(OkPacket.affectedRows === 0)) {
							_context10.next = 22;
							break;
						}

						return _context10.abrupt('return', res.sendStatus(400));

					case 22:

						res.sendStatus(204);
						_context10.next = 29;
						break;

					case 25:
						_context10.prev = 25;
						_context10.t1 = _context10['catch'](14);

						console.log(_context10.t1);
						return _context10.abrupt('return', res.sendStatus(500));

					case 29:
					case 'end':
						return _context10.stop();
				}
			}
		}, _callee10, undefined, [[1, 11], [14, 25]]);
	}));

	return function (_x24, _x25) {
		return _ref15.apply(this, arguments);
	};
}());

exports.default = router;