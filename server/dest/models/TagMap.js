'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

var _Contents = require('./Contents.js');

var _Contents2 = _interopRequireDefault(_Contents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TagMap = function (_MySQLModel) {
	(0, _inherits3.default)(TagMap, _MySQLModel);

	function TagMap() {
		(0, _classCallCheck3.default)(this, TagMap);
		return (0, _possibleConstructorReturn3.default)(this, (TagMap.__proto__ || (0, _getPrototypeOf2.default)(TagMap)).apply(this, arguments));
	}

	(0, _createClass3.default)(TagMap, [{
		key: 'createTable',
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
				var sql;
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								sql = 'create table ' + this.tableName + ' (\n\t\t\tid int not null auto_increment primary key,\n\t\t\tcontentId int not null,\n\t\t\ttagId int not null\n\t\t);';
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
		key: 'saveTagMap',
		value: function () {
			var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(contentIdArray, tagIdArray) {
				var dataArray;
				return _regenerator2.default.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								if (!(contentIdArray.length === 0 || tagIdArray.length === 0)) {
									_context2.next = 2;
									break;
								}

								return _context2.abrupt('return');

							case 2:
								dataArray = [];

								contentIdArray.forEach(function (contentId) {
									tagIdArray.forEach(function (tagId) {
										dataArray.push({ contentId: contentId, tagId: tagId });
									});
								});

								_context2.next = 6;
								return this.insertMultiple(dataArray);

							case 6:
								return _context2.abrupt('return', _context2.sent);

							case 7:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function saveTagMap(_x, _x2) {
				return _ref2.apply(this, arguments);
			}

			return saveTagMap;
		}()
	}, {
		key: 'deleteByUserId',
		value: function () {
			var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(userId) {
				return _regenerator2.default.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								_context3.next = 2;
								return this.delete('contentId in (select id from ?? where userId = ?)', [new _Contents2.default().tableName, userId]);

							case 2:
								return _context3.abrupt('return', _context3.sent);

							case 3:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function deleteByUserId(_x3) {
				return _ref3.apply(this, arguments);
			}

			return deleteByUserId;
		}()
	}]);
	return TagMap;
}(_index.MySQLModel);

exports.default = TagMap;