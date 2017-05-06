'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _isNan = require('babel-runtime/core-js/number/is-nan');

var _isNan2 = _interopRequireDefault(_isNan);

var changeFilename = function () {
	var _ref18 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(files) {
		var result, count;
		return _regenerator2.default.wrap(function _callee8$(_context8) {
			while (1) {
				switch (_context8.prev = _context8.next) {
					case 0:
						_context8.next = 2;
						return new _Contents2.default().selectOnce(['id'], undefined, undefined, 'order by id desc');

					case 2:
						result = _context8.sent;
						count = result === null ? 0 : result.id;


						files.forEach(function (file) {
							file.filename = count + '_' + file.filename;
							count++;
						});

					case 5:
					case 'end':
						return _context8.stop();
				}
			}
		}, _callee8, this);
	}));

	return function changeFilename(_x20) {
		return _ref18.apply(this, arguments);
	};
}();

var saveUploadFiles = function () {
	var _ref19 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(files) {
		var _this = this;

		return _regenerator2.default.wrap(function _callee10$(_context10) {
			while (1) {
				switch (_context10.prev = _context10.next) {
					case 0:
						return _context10.abrupt('return', _promise2.default.all(files.map(function () {
							var _ref20 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(file) {
								var contentsPath, thumbnailPath;
								return _regenerator2.default.wrap(function _callee9$(_context9) {
									while (1) {
										switch (_context9.prev = _context9.next) {
											case 0:
												contentsPath = _config2.default.contentsDir + '/' + file.filename;
												thumbnailPath = _config2.default.contentsDir + '/thumbnails/' + file.filename;
												_context9.next = 4;
												return _imageProcessor2.default.createContent(file.path, contentsPath);

											case 4:
												_context9.next = 6;
												return _imageProcessor2.default.createThumbnail(file.path, thumbnailPath);

											case 6:
												_fs2.default.unlink(file.path, function (err) {
													if (err) throw err;
												});

											case 7:
											case 'end':
												return _context9.stop();
										}
									}
								}, _callee9, _this);
							}));

							return function (_x22) {
								return _ref20.apply(this, arguments);
							};
						}())));

					case 1:
					case 'end':
						return _context10.stop();
				}
			}
		}, _callee10, this);
	}));

	return function saveUploadFiles(_x21) {
		return _ref19.apply(this, arguments);
	};
}();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

var _jwtManager = require('../common/jwtManager.js');

var _jwtManager2 = _interopRequireDefault(_jwtManager);

var _validator = require('../common/validator.js');

var _validator2 = _interopRequireDefault(_validator);

var _imageProcessor = require('../common/imageProcessor.js');

var _imageProcessor2 = _interopRequireDefault(_imageProcessor);

var _fscopy = require('../common/fscopy.js');

var _fscopy2 = _interopRequireDefault(_fscopy);

var _Contents = require('../models/Contents.js');

var _Contents2 = _interopRequireDefault(_Contents);

var _Users = require('../models/Users.js');

var _Users2 = _interopRequireDefault(_Users);

var _Comments = require('../models/Comments.js');

var _Comments2 = _interopRequireDefault(_Comments);

var _Favorites = require('../models/Favorites.js');

var _Favorites2 = _interopRequireDefault(_Favorites);

var _Tags = require('../models/Tags.js');

var _Tags2 = _interopRequireDefault(_Tags);

var _TagMap = require('../models/TagMap.js');

var _TagMap2 = _interopRequireDefault(_TagMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res, next) {
	res.locals.interval = _config2.default.contentsInterval;
	var page = Math.floor(req.query.page);
	res.locals.currentPage = page <= 0 || (0, _isNan2.default)(page) ? 1 : page;
	res.locals.offset = (res.locals.currentPage - 1) * res.locals.interval;
	res.locals.count = 0;
	res.locals.contents = [];
	next();
});

router.get('/',
//tagによる検索;
function () {
	var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
		var result, tagId, count, _ref2, _ref3, results;

		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						if (!(req.query.tag === undefined)) {
							_context.next = 2;
							break;
						}

						return _context.abrupt('return', next());

					case 2:
						if (!Array.isArray(req.query.tag)) {
							_context.next = 4;
							break;
						}

						return _context.abrupt('return', next('route'));

					case 4:
						_context.prev = 4;
						_context.next = 7;
						return new _Tags2.default().selectOnce(['id'], '?? = ?', { name: req.query.tag });

					case 7:
						result = _context.sent;

						if (!(result === null)) {
							_context.next = 10;
							break;
						}

						return _context.abrupt('return', next('route'));

					case 10:
						tagId = result.id;
						_context.next = 13;
						return new _TagMap2.default().count('*', '?? = ?', { tagId: tagId });

					case 13:
						count = _context.sent;
						_context.next = 16;
						return new _Contents2.default().select(['id', 'filename'], 'id in (select contentId from ?? where tagId = ?)', [new _TagMap2.default().tableName, tagId], 'order by id desc limit ? offset ?', [res.locals.interval, res.locals.offset]);

					case 16:
						_ref2 = _context.sent;
						_ref3 = (0, _slicedToArray3.default)(_ref2, 1);
						results = _ref3[0];


						res.locals.count = count;
						res.locals.contents = results;
						return _context.abrupt('return', next('route'));

					case 24:
						_context.prev = 24;
						_context.t0 = _context['catch'](4);

						console.log(_context.t0);
						return _context.abrupt('return', res.sendStatus(500));

					case 28:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[4, 24]]);
	}));

	return function (_x, _x2, _x3) {
		return _ref.apply(this, arguments);
	};
}(),

//投稿者による検索;
function () {
	var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
		var users, result, userId, contents, count, _ref5, _ref6, results;

		return _regenerator2.default.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						if (!(req.query.poster === undefined)) {
							_context2.next = 2;
							break;
						}

						return _context2.abrupt('return', next());

					case 2:
						if (!Array.isArray(req.query.poster)) {
							_context2.next = 4;
							break;
						}

						return _context2.abrupt('return', next('route'));

					case 4:
						_context2.prev = 4;
						users = new _Users2.default();
						_context2.next = 8;
						return users.selectOnce(['id'], '?? = ?', { userName: req.query.poster });

					case 8:
						result = _context2.sent;

						if (!(result === null)) {
							_context2.next = 11;
							break;
						}

						return _context2.abrupt('return', next('route'));

					case 11:
						userId = result.id;
						contents = new _Contents2.default();
						_context2.next = 15;
						return contents.count('*', '?? = ?', { userId: userId });

					case 15:
						count = _context2.sent;
						_context2.next = 18;
						return contents.select(['id', 'filename'], '?? = ?', { userId: userId }, 'order by id desc limit ? offset ?', [res.locals.interval, res.locals.offset]);

					case 18:
						_ref5 = _context2.sent;
						_ref6 = (0, _slicedToArray3.default)(_ref5, 1);
						results = _ref6[0];


						res.locals.count = count;
						res.locals.contents = results;
						return _context2.abrupt('return', next('route'));

					case 26:
						_context2.prev = 26;
						_context2.t0 = _context2['catch'](4);

						console.log(_context2.t0);
						return _context2.abrupt('return', res.sendStatus(500));

					case 30:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined, [[4, 26]]);
	}));

	return function (_x4, _x5, _x6) {
		return _ref4.apply(this, arguments);
	};
}(),

//お気に入り検索;
function () {
	var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
		var decoded, userId, favorites, contents, count, _ref8, _ref9, results;

		return _regenerator2.default.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						if (!(req.query.favoritesOf === undefined)) {
							_context3.next = 2;
							break;
						}

						return _context3.abrupt('return', next());

					case 2:
						if (!Array.isArray(req.query.favoritesOf)) {
							_context3.next = 4;
							break;
						}

						return _context3.abrupt('return', next('route'));

					case 4:
						if (!(req.query.userToken === undefined)) {
							_context3.next = 6;
							break;
						}

						return _context3.abrupt('return', next('route'));

					case 6:
						_context3.prev = 6;
						_context3.next = 9;
						return _jwtManager2.default.verifyUserAuthToken(req.query.userToken);

					case 9:
						decoded = _context3.sent;
						_context3.next = 15;
						break;

					case 12:
						_context3.prev = 12;
						_context3.t0 = _context3['catch'](6);
						return _context3.abrupt('return', next('route'));

					case 15:
						if (!(req.query.favoritesOf !== decoded.userName)) {
							_context3.next = 17;
							break;
						}

						return _context3.abrupt('return', next('route'));

					case 17:
						userId = decoded.userId;
						_context3.prev = 18;
						favorites = new _Favorites2.default();
						contents = new _Contents2.default();
						_context3.next = 23;
						return favorites.count('*', '?? = ?', { userId: userId });

					case 23:
						count = _context3.sent;
						_context3.next = 26;
						return contents.select(['id', 'filename'], 'id in (select contentId from ' + favorites.tableName + ' where ?? = ?)', { userId: userId }, 'order by id desc limit ? offset ?', [res.locals.interval, res.locals.offset]);

					case 26:
						_ref8 = _context3.sent;
						_ref9 = (0, _slicedToArray3.default)(_ref8, 1);
						results = _ref9[0];


						res.locals.count = count;
						res.locals.contents = results;
						return _context3.abrupt('return', next('route'));

					case 34:
						_context3.prev = 34;
						_context3.t1 = _context3['catch'](18);

						console.log(_context3.t1);
						return _context3.abrupt('return', res.sendStatus(500));

					case 38:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, undefined, [[6, 12], [18, 34]]);
	}));

	return function (_x7, _x8, _x9) {
		return _ref7.apply(this, arguments);
	};
}(),

//コメント投稿者による検索;
function () {
	var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, next) {
		var users, result, userId, comments, contents, count, _ref11, _ref12, results;

		return _regenerator2.default.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						if (!(req.query.includingCommentsOf === undefined)) {
							_context4.next = 2;
							break;
						}

						return _context4.abrupt('return', next());

					case 2:
						if (!Array.isArray(req.query.includingCommentsOf)) {
							_context4.next = 4;
							break;
						}

						return _context4.abrupt('return', next('route'));

					case 4:
						_context4.prev = 4;
						users = new _Users2.default();
						_context4.next = 8;
						return users.selectOnce(['id'], '?? = ?', { userName: req.query.includingCommentsOf });

					case 8:
						result = _context4.sent;

						if (!(result === null)) {
							_context4.next = 11;
							break;
						}

						return _context4.abrupt('return', next('route'));

					case 11:
						userId = result.id;
						comments = new _Comments2.default();
						contents = new _Contents2.default();
						_context4.next = 16;
						return comments.count('distinct contentId', '?? = ?', { userId: userId });

					case 16:
						count = _context4.sent;
						_context4.next = 19;
						return contents.select(['id', 'filename'], 'id in (select contentId from ' + comments.tableName + ' where ?? = ?)', { userId: userId }, 'order by id desc limit ? offset ?', [res.locals.interval, res.locals.offset]);

					case 19:
						_ref11 = _context4.sent;
						_ref12 = (0, _slicedToArray3.default)(_ref11, 1);
						results = _ref12[0];


						res.locals.count = count;
						res.locals.contents = results;
						return _context4.abrupt('return', next('route'));

					case 27:
						_context4.prev = 27;
						_context4.t0 = _context4['catch'](4);

						console.log(_context4.t0);
						return _context4.abrupt('return', res.sendStatus(500));

					case 31:
					case 'end':
						return _context4.stop();
				}
			}
		}, _callee4, undefined, [[4, 27]]);
	}));

	return function (_x10, _x11, _x12) {
		return _ref10.apply(this, arguments);
	};
}(),

//条件なし検索;
function () {
	var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(req, res, next) {
		var contents, count, _ref14, _ref15, results;

		return _regenerator2.default.wrap(function _callee5$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						contents = new _Contents2.default();
						_context5.prev = 1;
						_context5.next = 4;
						return contents.count();

					case 4:
						count = _context5.sent;
						_context5.next = 7;
						return contents.select(['id', 'filename'], undefined, undefined, 'order by id desc limit ? offset ?', [res.locals.interval, res.locals.offset]);

					case 7:
						_ref14 = _context5.sent;
						_ref15 = (0, _slicedToArray3.default)(_ref14, 1);
						results = _ref15[0];


						res.locals.count = count;
						res.locals.contents = results;
						return _context5.abrupt('return', next('route'));

					case 15:
						_context5.prev = 15;
						_context5.t0 = _context5['catch'](1);

						console.log(_context5.t0);
						return _context5.abrupt('return', res.sendStatus(500));

					case 19:
					case 'end':
						return _context5.stop();
				}
			}
		}, _callee5, undefined, [[1, 15]]);
	}));

	return function (_x13, _x14, _x15) {
		return _ref13.apply(this, arguments);
	};
}());

router.get('/', function (req, res) {
	var _res$locals = res.locals,
	    interval = _res$locals.interval,
	    currentPage = _res$locals.currentPage,
	    count = _res$locals.count,
	    contents = _res$locals.contents;

	res.json({
		payload: {
			interval: interval,
			currentPage: currentPage,
			maxPage: Math.ceil(count / interval),
			contents: contents.map(function (content) {
				return (0, _extends3.default)({}, content, {
					thumbnail: _config2.default.thumbnailsUrl + '/' + content.filename
				});
			})
		}
	});
});

var upload = (0, _multer2.default)({
	dest: _config2.default.tmpDir,
	limits: {
		fileSize: _validator2.default.rule.fileMaxSize,
		files: _validator2.default.rule.fileMaxLength
	},
	fileFilter: function fileFilter(req, file, cb) {
		if (_validator2.default.validateImageFile(file)) return cb(null, true);

		req.fileValidationError = true;
		cb(null, false);
	}
}).array('files');

router.post('/', function (req, res, next) {
	upload(req, res, function (err) {
		if (err || req.fileValidationError) {
			return res.sendStatus(400);
		}

		next();
	});
}, function () {
	var _ref16 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(req, res, next) {
		var decoded, userId, contents, mysql;
		return _regenerator2.default.wrap(function _callee7$(_context7) {
			while (1) {
				switch (_context7.prev = _context7.next) {
					case 0:
						_context7.prev = 0;
						_context7.next = 3;
						return _jwtManager2.default.verifyUserAuthToken(req.body.userToken);

					case 3:
						decoded = _context7.sent;
						userId = decoded.userId;
						_context7.next = 10;
						break;

					case 7:
						_context7.prev = 7;
						_context7.t0 = _context7['catch'](0);
						return _context7.abrupt('return', res.sendStatus(401));

					case 10:
						_context7.prev = 10;

						(0, _assign2.default)(req.body, formatBody(req.body), { userId: userId });

						if (_validator2.default.validateContentBody(req.body)) {
							_context7.next = 14;
							break;
						}

						return _context7.abrupt('return', res.sendStatus(400));

					case 14:
						_context7.next = 16;
						return changeFilename(req.files);

					case 16:
						contents = new _Contents2.default();
						mysql = contents.mysql;

						mysql.beginTransaction(function () {
							var _ref17 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(err) {
								var contentIdArray, tagIdArray;
								return _regenerator2.default.wrap(function _callee6$(_context6) {
									while (1) {
										switch (_context6.prev = _context6.next) {
											case 0:
												_context6.prev = 0;

												if (!err) {
													_context6.next = 3;
													break;
												}

												throw err;

											case 3:
												_context6.next = 5;
												return contents.saveContents(req.files, req.body);

											case 5:
												contentIdArray = _context6.sent;
												_context6.next = 8;
												return new _Tags2.default().saveTags(req.body.tags);

											case 8:
												tagIdArray = _context6.sent;
												_context6.next = 11;
												return new _TagMap2.default().saveTagMap(contentIdArray, tagIdArray);

											case 11:
												_context6.next = 13;
												return saveUploadFiles(req.files);

											case 13:

												mysql.commit(function (err) {
													if (err) throw err;

													res.sendStatus(204);
												});
												_context6.next = 21;
												break;

											case 16:
												_context6.prev = 16;
												_context6.t0 = _context6['catch'](0);

												console.log(_context6.t0);
												mysql.rollback();
												return _context6.abrupt('return', res.sendStatus(500));

											case 21:
											case 'end':
												return _context6.stop();
										}
									}
								}, _callee6, undefined, [[0, 16]]);
							}));

							return function (_x19) {
								return _ref17.apply(this, arguments);
							};
						}());
						_context7.next = 25;
						break;

					case 21:
						_context7.prev = 21;
						_context7.t1 = _context7['catch'](10);

						console.log(_context7.t1);
						return _context7.abrupt('return', res.sendStatus(500));

					case 25:
					case 'end':
						return _context7.stop();
				}
			}
		}, _callee7, undefined, [[0, 7], [10, 21]]);
	}));

	return function (_x16, _x17, _x18) {
		return _ref16.apply(this, arguments);
	};
}());

function formatBody(body) {
	var name = String(body.name).trim();

	var sex = String(body.sex).trim();
	if (!(sex === 'none' || sex === 'male' || sex === 'female')) {
		sex = 'none';
	}

	var age = Number(body.age);
	if (body.age === '' || isNaN(body.age)) {
		age = null;
	}

	var tag = String(body.tag).trim();
	//tag文字列を配列にすると同時に重複は消す;
	var tags = tag === '' ? [] : [].concat((0, _toConsumableArray3.default)(new _set2.default(tag.split(/[\s ]+/))));

	var description = String(body.description).trim();

	return { name: name, sex: sex, age: age, tag: tag, tags: tags, description: description };
}

exports.default = router;