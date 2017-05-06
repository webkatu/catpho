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

var Favorites = function (_MySQLModel) {
	(0, _inherits3.default)(Favorites, _MySQLModel);

	function Favorites() {
		(0, _classCallCheck3.default)(this, Favorites);
		return (0, _possibleConstructorReturn3.default)(this, (Favorites.__proto__ || (0, _getPrototypeOf2.default)(Favorites)).apply(this, arguments));
	}

	(0, _createClass3.default)(Favorites, [{
		key: 'createTable',
		value: function createTable() {
			var sql = 'create table ' + this.tableName + ' (\n\t\t\tid int not null auto_increment primary key,\n\t\t\tuserId int not null,\n\t\t\tcontentId int not null\n\t\t);';

			return this.query(sql);
		}
	}, {
		key: 'deleteByWithdrawal',
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(userId) {
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return this.delete('userId = ? or contentId in (select id from ?? where userId = ?)', [userId, new _Contents2.default().tableName, userId]);

							case 2:
								return _context.abrupt('return', _context.sent);

							case 3:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function deleteByWithdrawal(_x) {
				return _ref.apply(this, arguments);
			}

			return deleteByWithdrawal;
		}()
	}, {
		key: 'isFavorite',
		value: function () {
			var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(userId, contentId) {
				var result;
				return _regenerator2.default.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.next = 2;
								return this.selectOnce(['id'], 'userId = ? and contentId = ?', [userId, contentId]);

							case 2:
								result = _context2.sent;
								return _context2.abrupt('return', result !== null);

							case 4:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function isFavorite(_x2, _x3) {
				return _ref2.apply(this, arguments);
			}

			return isFavorite;
		}()
	}]);
	return Favorites;
}(_index.MySQLModel);

exports.default = Favorites;