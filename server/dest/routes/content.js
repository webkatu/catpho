'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _isNan = require('babel-runtime/core-js/number/is-nan');

var _isNan2 = _interopRequireDefault(_isNan);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getContent = function () {
	var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(id) {
		var _ref3, _ref4, results, content, prevId, nextId;

		return _regenerator2.default.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.next = 2;
						return new _Contents2.default().selectContent(id);

					case 2:
						_ref3 = _context2.sent;
						_ref4 = (0, _slicedToArray3.default)(_ref3, 1);
						results = _ref4[0];
						content = {};
						prevId = 0;
						nextId = 0;

						if (results.length === 3) {
							content = results[0];
							prevId = results[1].id;
							nextId = results[2].id;
						} else if (results.length === 2) {
							if (results[0].id !== id) {
								//コンテンツが無い場合;
								prevId = results[0].id;
								nextId = results[1].id;
							} else {
								//idが先頭か末尾のとき;
								content = results[0];
								if (results[1].id < id) prevId = results[1].id;else nextId = results[1].id;
							}
						} else if (results.length === 1) {
							//コンテンツが1個しかないとき;
							if (results[0].id === id) content = results[0];
							//コンテンツが無くかつidが先頭か末尾のとき;
							else if (results[0].id < id) prevId = results[0].id;else nextId = results[0].id;
						}

						content.prevId = prevId;
						content.nextId = nextId;
						return _context2.abrupt('return', content);

					case 12:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, this);
	}));

	return function getContent(_x3) {
		return _ref2.apply(this, arguments);
	};
}();

var getPoster = function () {
	var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(userId) {
		var poster, result;
		return _regenerator2.default.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						poster = {
							avatar: '',
							userName: '',
							nickname: ''
						};
						_context3.next = 3;
						return new _Users2.default().selectOnce(['userName', 'nickname', 'avatar'], '?? = ?', { id: userId });

					case 3:
						result = _context3.sent;

						if (!(result === null)) {
							_context3.next = 6;
							break;
						}

						return _context3.abrupt('return', poster);

					case 6:
						return _context3.abrupt('return', (0, _assign2.default)(poster, result, {
							avatar: _config2.default.avatarsUrl + '/' + result.avatar
						}));

					case 7:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, this);
	}));

	return function getPoster(_x4) {
		return _ref5.apply(this, arguments);
	};
}();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

var _jwtManager = require('../common/jwtManager.js');

var _jwtManager2 = _interopRequireDefault(_jwtManager);

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

var router = _express2.default.Router({ mergeParams: true });

router.get('/', function () {
	var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res) {
		var userId, decoded, content, comments, favorites, tags;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						if (!(0, _isNan2.default)(req.params.contentId)) {
							_context.next = 2;
							break;
						}

						return _context.abrupt('return', res.sendStatus(404));

					case 2:
						userId = 0;
						_context.prev = 3;
						_context.next = 6;
						return _jwtManager2.default.verifyUserAuthToken(req.query.userToken);

					case 6:
						decoded = _context.sent;

						userId = decoded.userId;
						_context.next = 12;
						break;

					case 10:
						_context.prev = 10;
						_context.t0 = _context['catch'](3);

					case 12:
						_context.prev = 12;
						_context.next = 15;
						return getContent(req.params.contentId);

					case 15:
						content = _context.sent;

						if (!(content.id === undefined)) {
							_context.next = 18;
							break;
						}

						return _context.abrupt('return', res.json({
							payload: {
								content: content,
								prevId: content.prevId,
								nextId: content.nextId,
								isFavorite: false,
								commentsCount: 0
							}
						}));

					case 18:
						comments = new _Comments2.default();
						favorites = new _Favorites2.default();
						tags = new _Tags2.default();
						_context.t1 = res;
						_context.t2 = content.id;
						_context.t3 = content.name;
						_context.t4 = content.age;
						_context.t5 = content.sex;
						_context.t6 = content.description;
						_context.t7 = content.created;
						_context.t8 = _config2.default.contentsUrl + '/' + content.filename;
						_context.next = 31;
						return getPoster(content.userId);

					case 31:
						_context.t9 = _context.sent;
						_context.next = 34;
						return favorites.count('*', '?? = ?', { contentId: content.id });

					case 34:
						_context.t10 = _context.sent;
						_context.next = 37;
						return tags.selectTags(content.id);

					case 37:
						_context.t11 = _context.sent;
						_context.t12 = {
							id: _context.t2,
							name: _context.t3,
							age: _context.t4,
							sex: _context.t5,
							description: _context.t6,
							postedDate: _context.t7,
							imageURL: _context.t8,
							poster: _context.t9,
							favoritesCount: _context.t10,
							tags: _context.t11
						};
						_context.t13 = content.prevId;
						_context.t14 = content.nextId;
						_context.next = 43;
						return favorites.isFavorite(userId, content.id);

					case 43:
						_context.t15 = _context.sent;
						_context.next = 46;
						return comments.count('*', '?? = ?', { contentId: content.id });

					case 46:
						_context.t16 = _context.sent;
						_context.t17 = {
							content: _context.t12,
							prevId: _context.t13,
							nextId: _context.t14,
							isFavorite: _context.t15,
							commentsCount: _context.t16
						};
						_context.t18 = {
							payload: _context.t17
						};

						_context.t1.json.call(_context.t1, _context.t18);

						_context.next = 56;
						break;

					case 52:
						_context.prev = 52;
						_context.t19 = _context['catch'](12);

						console.log(_context.t19);
						return _context.abrupt('return', res.sendStatus(500));

					case 56:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[3, 10], [12, 52]]);
	}));

	return function (_x, _x2) {
		return _ref.apply(this, arguments);
	};
}());

router.delete('/', function () {
	var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(req, res) {
		var decoded, contents;
		return _regenerator2.default.wrap(function _callee5$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						_context5.prev = 0;

						if (!(0, _isNan2.default)(req.params.contentId)) {
							_context5.next = 3;
							break;
						}

						throw new Error();

					case 3:
						_context5.next = 5;
						return _jwtManager2.default.verifyUserAuthToken(req.body.userToken);

					case 5:
						decoded = _context5.sent;
						_context5.next = 11;
						break;

					case 8:
						_context5.prev = 8;
						_context5.t0 = _context5['catch'](0);
						return _context5.abrupt('return', res.sendStatus(400));

					case 11:
						contents = new _Contents2.default();

						contents.mysql.beginTransaction(function () {
							var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(err) {
								var result, _ref8, _ref9, OkPacket;

								return _regenerator2.default.wrap(function _callee4$(_context4) {
									while (1) {
										switch (_context4.prev = _context4.next) {
											case 0:
												_context4.prev = 0;

												if (!err) {
													_context4.next = 3;
													break;
												}

												throw err;

											case 3:
												_context4.next = 5;
												return contents.selectOnce(['filename'], 'id = ?', [req.params.contentId]);

											case 5:
												result = _context4.sent;
												_context4.next = 8;
												return contents.delete('id = ? and userId = ?', [req.params.contentId, decoded.userId]);

											case 8:
												_ref8 = _context4.sent;
												_ref9 = (0, _slicedToArray3.default)(_ref8, 1);
												OkPacket = _ref9[0];

												if (!(OkPacket.affectedRows === 0)) {
													_context4.next = 13;
													break;
												}

												return _context4.abrupt('return', res.sendStatus(400).end());

											case 13:
												_context4.next = 15;
												return new _TagMap2.default().delete('contentId = ?', [req.params.contentId]);

											case 15:
												_context4.next = 17;
												return new _Tags2.default().deleteUnusedTags();

											case 17:
												_context4.next = 19;
												return new _Comments2.default().delete('contentId = ?', [req.params.contentId]);

											case 19:
												_context4.next = 21;
												return new _Favorites2.default().delete('contentId = ?', [req.params.contentId]);

											case 21:

												contents.mysql.commit(function (err) {
													if (err) throw err;
													_fs2.default.unlink(_config2.default.contentsDir + '/' + result.filename, function (err) {
														if (err) throw err;
													});
													_fs2.default.unlink(_config2.default.contentsDir + '/thumbnails/' + result.filename, function (err) {
														if (err) throw err;
													});
												});
												res.sendStatus(204);
												_context4.next = 30;
												break;

											case 25:
												_context4.prev = 25;
												_context4.t0 = _context4['catch'](0);

												console.log(_context4.t0);
												contents.mysql.rollback();
												return _context4.abrupt('return', res.sendStatus(500));

											case 30:
											case 'end':
												return _context4.stop();
										}
									}
								}, _callee4, undefined, [[0, 25]]);
							}));

							return function (_x7) {
								return _ref7.apply(this, arguments);
							};
						}());

					case 13:
					case 'end':
						return _context5.stop();
				}
			}
		}, _callee5, undefined, [[0, 8]]);
	}));

	return function (_x5, _x6) {
		return _ref6.apply(this, arguments);
	};
}());

exports.default = router;