'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _index = require('./index.js');

var _TagMap = require('./TagMap.js');

var _TagMap2 = _interopRequireDefault(_TagMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tags = function (_MySQLModel) {
	(0, _inherits3.default)(Tags, _MySQLModel);

	function Tags() {
		(0, _classCallCheck3.default)(this, Tags);
		return (0, _possibleConstructorReturn3.default)(this, (Tags.__proto__ || (0, _getPrototypeOf2.default)(Tags)).apply(this, arguments));
	}

	(0, _createClass3.default)(Tags, [{
		key: 'createTable',
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
				var sql;
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								sql = 'create table ' + this.tableName + ' (\n\t\t\tid int not null auto_increment primary key,\n\t\t\tname varchar(255) unique\n\t\t);';
								_context.next = 3;
								return this.query(sql);

							case 3:
								return _context.abrupt('return', _context.sent);

							case 4:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function createTable() {
				return _ref.apply(this, arguments);
			}

			return createTable;
		}()
	}, {
		key: 'saveTags',
		value: function () {
			var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(tags) {
				var _this2 = this;

				var idArray;
				return _regenerator2.default.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								_context3.next = 2;
								return _promise2.default.all(tags.map(function () {
									var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(tag) {
										var result, _ref4, _ref5, OkPacket;

										return _regenerator2.default.wrap(function _callee2$(_context2) {
											while (1) {
												switch (_context2.prev = _context2.next) {
													case 0:
														_context2.next = 2;
														return _this2.selectOnce(['id'], '?? = ?', { name: tag });

													case 2:
														result = _context2.sent;

														if (!(result !== null)) {
															_context2.next = 5;
															break;
														}

														return _context2.abrupt('return', result.id);

													case 5:
														_context2.next = 7;
														return _this2.insert({ name: tag });

													case 7:
														_ref4 = _context2.sent;
														_ref5 = (0, _slicedToArray3.default)(_ref4, 1);
														OkPacket = _ref5[0];
														return _context2.abrupt('return', OkPacket.insertId);

													case 11:
													case 'end':
														return _context2.stop();
												}
											}
										}, _callee2, _this2);
									}));

									return function (_x2) {
										return _ref3.apply(this, arguments);
									};
								}()));

							case 2:
								idArray = _context3.sent;
								return _context3.abrupt('return', idArray);

							case 4:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function saveTags(_x) {
				return _ref2.apply(this, arguments);
			}

			return saveTags;
		}()
	}, {
		key: 'deleteUnusedTags',
		value: function () {
			var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
				return _regenerator2.default.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								_context4.next = 2;
								return this.delete('not exists (select * from ?? where ' + this.tableName + '.id = tagId)', [new _TagMap2.default().tableName]);

							case 2:
								return _context4.abrupt('return', _context4.sent);

							case 3:
							case 'end':
								return _context4.stop();
						}
					}
				}, _callee4, this);
			}));

			function deleteUnusedTags() {
				return _ref6.apply(this, arguments);
			}

			return deleteUnusedTags;
		}()
	}, {
		key: 'getAll',
		value: function () {
			var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
				return _regenerator2.default.wrap(function _callee5$(_context5) {
					while (1) {
						switch (_context5.prev = _context5.next) {
							case 0:
								_context5.next = 2;
								return this.query('select t.name, count(t.name) as count from ?? t join ?? m on t.id = m.tagId group by t.name order by t.name asc;', [this.tableName, new _TagMap2.default().tableName]);

							case 2:
								return _context5.abrupt('return', _context5.sent);

							case 3:
							case 'end':
								return _context5.stop();
						}
					}
				}, _callee5, this);
			}));

			function getAll() {
				return _ref7.apply(this, arguments);
			}

			return getAll;
		}()
	}, {
		key: 'selectTags',
		value: function () {
			var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(contentId) {
				var _ref9, _ref10, results;

				return _regenerator2.default.wrap(function _callee6$(_context6) {
					while (1) {
						switch (_context6.prev = _context6.next) {
							case 0:
								_context6.next = 2;
								return this.select(['name'], 'id in(select tagId from ' + new _TagMap2.default().tableName + ' where contentId = ?)', [contentId]);

							case 2:
								_ref9 = _context6.sent;
								_ref10 = (0, _slicedToArray3.default)(_ref9, 1);
								results = _ref10[0];
								return _context6.abrupt('return', results.map(function (result) {
									return result.name;
								}));

							case 6:
							case 'end':
								return _context6.stop();
						}
					}
				}, _callee6, this);
			}));

			function selectTags(_x3) {
				return _ref8.apply(this, arguments);
			}

			return selectTags;
		}()
	}]);
	return Tags;
}(_index.MySQLModel);

exports.default = Tags;