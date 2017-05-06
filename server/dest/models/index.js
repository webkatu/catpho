'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MySQLModel = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _mysqlConnection = require('../common/mysqlConnection');

var _mysqlConnection2 = _interopRequireDefault(_mysqlConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MySQLModel = exports.MySQLModel = function () {
	function MySQLModel(tableName) {
		(0, _classCallCheck3.default)(this, MySQLModel);

		this.mysql = _mysqlConnection2.default;
		this.tableName = tableName;

		if (tableName === undefined) {
			this.tableName = this.constructor.name.toLowerCase();
		}
	}

	(0, _createClass3.default)(MySQLModel, [{
		key: 'dropTable',
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
				var sql;
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								sql = 'drop table ' + this.tableName + ';';
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

			function dropTable() {
				return _ref.apply(this, arguments);
			}

			return dropTable;
		}()
	}, {
		key: 'insert',
		value: function () {
			var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
				var columns,
				    values,
				    data,
				    sql,
				    _args2 = arguments;
				return _regenerator2.default.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								columns = void 0, values = void 0;
								_context2.t0 = _args2.length;
								_context2.next = _context2.t0 === 1 ? 4 : _context2.t0 === 2 ? 8 : 11;
								break;

							case 4:
								data = _args2.length <= 0 ? undefined : _args2[0];

								columns = (0, _keys2.default)(data);
								values = columns.map(function (key) {
									return data[key];
								});
								return _context2.abrupt('break', 12);

							case 8:
								columns = _args2.length <= 0 ? undefined : _args2[0];
								values = _args2.length <= 1 ? undefined : _args2[1];
								return _context2.abrupt('break', 12);

							case 11:
								throw new Error();

							case 12:
								sql = 'insert into ' + this.tableName + ' (??) values (?);';
								_context2.next = 15;
								return this.query(sql, [columns, values]);

							case 15:
								return _context2.abrupt('return', _context2.sent);

							case 16:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function insert() {
				return _ref2.apply(this, arguments);
			}

			return insert;
		}()
	}, {
		key: 'insertMultiple',
		value: function () {
			var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
				var columns,
				    valuesArray,
				    dataArray,
				    valuesSql,
				    sql,
				    _args3 = arguments;
				return _regenerator2.default.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								columns = void 0, valuesArray = void 0;
								_context3.t0 = _args3.length;
								_context3.next = _context3.t0 === 1 ? 4 : _context3.t0 === 2 ? 10 : 13;
								break;

							case 4:
								dataArray = _args3.length <= 0 ? undefined : _args3[0];

								if (!(dataArray.length === 0)) {
									_context3.next = 7;
									break;
								}

								return _context3.abrupt('return');

							case 7:

								columns = (0, _keys2.default)(dataArray[0]);
								valuesArray = dataArray.map(function (data) {
									var values = columns.map(function (key) {
										return data[key];
									});
									return values;
								});
								return _context3.abrupt('break', 14);

							case 10:
								columns = _args3.length <= 0 ? undefined : _args3[0];
								valuesArray = _args3.length <= 1 ? undefined : _args3[1];
								return _context3.abrupt('break', 14);

							case 13:
								throw new Error();

							case 14:
								valuesSql = '';

								valuesArray.forEach(function () {
									valuesSql += ' (?),';
								});
								valuesSql = valuesSql.slice(0, -1);

								sql = 'insert into ' + this.tableName + ' (??) values ' + valuesSql + ';';
								_context3.next = 20;
								return this.query(sql, [columns].concat((0, _toConsumableArray3.default)(valuesArray)));

							case 20:
								return _context3.abrupt('return', _context3.sent);

							case 21:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function insertMultiple() {
				return _ref3.apply(this, arguments);
			}

			return insertMultiple;
		}()
	}, {
		key: 'update',
		value: function () {
			var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(setData) {
				var wherePhrase = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
				var whereData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
				var dataArray, setPhrase, prop, sql;
				return _regenerator2.default.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								if (!(wherePhrase === '')) {
									_context4.next = 2;
									break;
								}

								throw new Error();

							case 2:
								wherePhrase = 'where ' + wherePhrase;
								dataArray = [];
								setPhrase = 'set ';

								(0, _keys2.default)(setData).forEach(function (key) {
									setPhrase += '?? = ?, ';
									dataArray.push(key, setData[key]);
								});
								setPhrase = setPhrase.slice(0, -2);

								if (Array.isArray(whereData)) dataArray.push.apply(dataArray, (0, _toConsumableArray3.default)(whereData));else for (prop in whereData) {
									dataArray.push(prop, whereData[prop]);
								}sql = 'update ' + this.tableName + ' ' + setPhrase + ' ' + wherePhrase + ';';
								_context4.next = 11;
								return this.query(sql, dataArray);

							case 11:
								return _context4.abrupt('return', _context4.sent);

							case 12:
							case 'end':
								return _context4.stop();
						}
					}
				}, _callee4, this);
			}));

			function update(_x) {
				return _ref4.apply(this, arguments);
			}

			return update;
		}()
	}, {
		key: 'delete',
		value: function () {
			var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
				var wherePhrase = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
				var whereData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
				var dataArray, prop, sql;
				return _regenerator2.default.wrap(function _callee5$(_context5) {
					while (1) {
						switch (_context5.prev = _context5.next) {
							case 0:
								if (!(wherePhrase === '')) {
									_context5.next = 2;
									break;
								}

								throw new Error();

							case 2:
								wherePhrase = 'where ' + wherePhrase;
								dataArray = [];


								if (Array.isArray(whereData)) dataArray.push.apply(dataArray, (0, _toConsumableArray3.default)(whereData));else for (prop in whereData) {
									dataArray.push(prop, whereData[prop]);
								}sql = 'delete from ' + this.tableName + ' ' + wherePhrase + ';';
								_context5.next = 8;
								return this.query(sql, dataArray);

							case 8:
								return _context5.abrupt('return', _context5.sent);

							case 9:
							case 'end':
								return _context5.stop();
						}
					}
				}, _callee5, this);
			}));

			function _delete() {
				return _ref5.apply(this, arguments);
			}

			return _delete;
		}()
	}, {
		key: 'select',
		value: function () {
			var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(cols) {
				var wherePhrase = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
				var whereData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
				var otherPhrase = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
				var otherDataArray = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
				var dataArray, colsPhrase, prop, sql;
				return _regenerator2.default.wrap(function _callee6$(_context6) {
					while (1) {
						switch (_context6.prev = _context6.next) {
							case 0:
								if (wherePhrase) wherePhrase = 'where ' + wherePhrase;
								dataArray = [];
								colsPhrase = '*';

								if (Array.isArray(cols)) {
									colsPhrase = '';
									cols.forEach(function (col) {
										colsPhrase += '??,';
										dataArray.push(col);
									});
									colsPhrase = colsPhrase.slice(0, -1);
								}

								if (Array.isArray(whereData)) dataArray.push.apply(dataArray, (0, _toConsumableArray3.default)(whereData));else for (prop in whereData) {
									dataArray.push(prop, whereData[prop]);
								}sql = 'select ' + colsPhrase + ' from ' + this.tableName + ' ' + wherePhrase + ' ' + otherPhrase + ';';
								_context6.next = 8;
								return this.query(sql, [].concat(dataArray, (0, _toConsumableArray3.default)(otherDataArray)));

							case 8:
								return _context6.abrupt('return', _context6.sent);

							case 9:
							case 'end':
								return _context6.stop();
						}
					}
				}, _callee6, this);
			}));

			function select(_x6) {
				return _ref6.apply(this, arguments);
			}

			return select;
		}()
	}, {
		key: 'selectOnce',
		value: function () {
			var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(cols, wherePhrase, whereData) {
				var otherPhrase = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
				var otherDataArray = arguments[4];
				var results, result;
				return _regenerator2.default.wrap(function _callee7$(_context7) {
					while (1) {
						switch (_context7.prev = _context7.next) {
							case 0:
								_context7.next = 2;
								return this.select(cols, wherePhrase, whereData, otherPhrase + ' limit 1', otherDataArray);

							case 2:
								results = _context7.sent;
								result = results[0][0];

								if (result === undefined) result = null;
								return _context7.abrupt('return', result);

							case 6:
							case 'end':
								return _context7.stop();
						}
					}
				}, _callee7, this);
			}));

			function selectOnce(_x11, _x12, _x13) {
				return _ref7.apply(this, arguments);
			}

			return selectOnce;
		}()
	}, {
		key: 'count',
		value: function () {
			var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {
				var col = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';
				var wherePhrase = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
				var whereData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

				var dataArray, prop, sql, _ref9, _ref10, results, count;

				return _regenerator2.default.wrap(function _callee8$(_context8) {
					while (1) {
						switch (_context8.prev = _context8.next) {
							case 0:
								if (wherePhrase) wherePhrase = 'where ' + wherePhrase;
								dataArray = [col];


								if (Array.isArray(whereData)) dataArray.push.apply(dataArray, (0, _toConsumableArray3.default)(whereData));else for (prop in whereData) {
									dataArray.push(prop, whereData[prop]);
								}sql = 'select count(?) from ' + this.tableName + ' ' + wherePhrase + ';';
								_context8.next = 6;
								return this.query(sql, dataArray);

							case 6:
								_ref9 = _context8.sent;
								_ref10 = (0, _slicedToArray3.default)(_ref9, 1);
								results = _ref10[0];
								count = results[0]['count(\'' + col + '\')'];
								return _context8.abrupt('return', count);

							case 11:
							case 'end':
								return _context8.stop();
						}
					}
				}, _callee8, this);
			}));

			function count() {
				return _ref8.apply(this, arguments);
			}

			return count;
		}()
	}, {
		key: 'query',
		value: function () {
			var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9() {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}

				return _regenerator2.default.wrap(function _callee9$(_context9) {
					while (1) {
						switch (_context9.prev = _context9.next) {
							case 0:
								_context9.next = 2;
								return new _promise2.default(function (res, rej) {
									_mysqlConnection2.default.query.apply(_mysqlConnection2.default, args.concat([function () {
										for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
											args[_key2] = arguments[_key2];
										}

										var err = args[0];
										if (err) {
											return rej(err);
										}

										res(args.slice(1));
									}]));
								});

							case 2:
								return _context9.abrupt('return', _context9.sent);

							case 3:
							case 'end':
								return _context9.stop();
						}
					}
				}, _callee9, this);
			}));

			function query() {
				return _ref11.apply(this, arguments);
			}

			return query;
		}()
	}]);
	return MySQLModel;
}();