'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

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

var _Users = require('./Users.js');

var _Users2 = _interopRequireDefault(_Users);

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Comments = function (_MySQLModel) {
	(0, _inherits3.default)(Comments, _MySQLModel);

	function Comments() {
		(0, _classCallCheck3.default)(this, Comments);
		return (0, _possibleConstructorReturn3.default)(this, (Comments.__proto__ || (0, _getPrototypeOf2.default)(Comments)).apply(this, arguments));
	}

	(0, _createClass3.default)(Comments, [{
		key: 'createTable',
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
				var sql;
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								sql = 'create table ' + this.tableName + ' (\n\t\t\tid int not null auto_increment primary key,\n\t\t\tcontentId int not null,\n\t\t\tuserId int not null,\n\t\t\tcomment text,\n\t\t\tcreated datetime\n\t\t);';
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
		key: 'selectComments',
		value: function () {
			var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(contentId) {
				var sql, _ref3, _ref4, results;

				return _regenerator2.default.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								sql = 'select c.id, c.userId, c.comment, c.created, u.userName, u.nickname, u.avatar from ' + this.tableName + ' c join ' + new _Users2.default().tableName + ' u on c.userId = u.id where c.contentId = ?;';
								_context2.next = 3;
								return this.query(sql, [contentId]);

							case 3:
								_ref3 = _context2.sent;
								_ref4 = (0, _slicedToArray3.default)(_ref3, 1);
								results = _ref4[0];

								results.forEach(function (result) {
									result.avatar = _config2.default.avatarsUrl + '/' + result.avatar;
								});
								return _context2.abrupt('return', results);

							case 8:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function selectComments(_x) {
				return _ref2.apply(this, arguments);
			}

			return selectComments;
		}()
	}]);
	return Comments;
}(_index.MySQLModel);

exports.default = Comments;