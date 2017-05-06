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

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

var _bcrypt = require('../common/bcrypt.js');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _index = require('./index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Users = function (_MySQLModel) {
	(0, _inherits3.default)(Users, _MySQLModel);

	function Users() {
		(0, _classCallCheck3.default)(this, Users);
		return (0, _possibleConstructorReturn3.default)(this, (Users.__proto__ || (0, _getPrototypeOf2.default)(Users)).apply(this, arguments));
	}

	(0, _createClass3.default)(Users, [{
		key: 'createTable',
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
				var sql;
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								sql = 'create table ' + this.tableName + ' (\n\t\t\tid int not null auto_increment primary key,\n\t\t\temail varchar(255) not null unique,\n\t\t\tuserName varchar(255) not null unique,\n\t\t\tpassword varchar(255) not null,\n\t\t\tnickname varchar(255),\n\t\t\tavatar varchar(255),\n\t\t\tactivation tinyint(1),\n\t\t\tcreated datetime,\n\t\t\tmodified timestamp\n\t\t);';
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
		key: 'register',
		value: function () {
			var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(body) {
				var email, userName, password, data;
				return _regenerator2.default.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								email = body.email, userName = body.userName, password = body.password;
								_context2.t0 = email;
								_context2.t1 = userName;
								_context2.next = 5;
								return _bcrypt2.default.createHash(password);

							case 5:
								_context2.t2 = _context2.sent;
								_context2.t3 = userName;
								_context2.t4 = _config2.default.defaultAvatarFileName;
								_context2.t5 = new Date();
								data = {
									email: _context2.t0,
									userName: _context2.t1,
									password: _context2.t2,
									nickname: _context2.t3,
									avatar: _context2.t4,
									activation: 0,
									created: _context2.t5
								};
								_context2.next = 12;
								return this.insert(data);

							case 12:
								return _context2.abrupt('return', _context2.sent);

							case 13:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function register(_x) {
				return _ref2.apply(this, arguments);
			}

			return register;
		}()
	}, {
		key: 'authenticate',
		value: function () {
			var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(emailOrUserName, password) {
				var user, same;
				return _regenerator2.default.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								_context3.next = 2;
								return this.selectOnce(['id', 'email', 'userName', 'password', 'nickname', 'avatar', 'activation'], 'email = ? or userName = ?', [emailOrUserName, emailOrUserName]);

							case 2:
								user = _context3.sent;

								if (!(user === null)) {
									_context3.next = 5;
									break;
								}

								return _context3.abrupt('return', null);

							case 5:
								_context3.next = 7;
								return _bcrypt2.default.compare(password, user.password);

							case 7:
								same = _context3.sent;

								if (!(same === false)) {
									_context3.next = 10;
									break;
								}

								return _context3.abrupt('return', null);

							case 10:
								delete user.password;
								return _context3.abrupt('return', user);

							case 12:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function authenticate(_x2, _x3) {
				return _ref3.apply(this, arguments);
			}

			return authenticate;
		}()
	}, {
		key: 'activate',
		value: function () {
			var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(id) {
				return _regenerator2.default.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								_context4.next = 2;
								return this.update({ activation: 1 }, '?? = ?', { id: id });

							case 2:
								return _context4.abrupt('return', _context4.sent);

							case 3:
							case 'end':
								return _context4.stop();
						}
					}
				}, _callee4, this);
			}));

			function activate(_x4) {
				return _ref4.apply(this, arguments);
			}

			return activate;
		}()
	}, {
		key: 'reissuePassword',
		value: function () {
			var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(id) {
				var str, password, i;
				return _regenerator2.default.wrap(function _callee5$(_context5) {
					while (1) {
						switch (_context5.prev = _context5.next) {
							case 0:
								str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
								password = '';
								i = 0;

								while (i < 10) {
									password += str[Math.floor(str.length * Math.random())];
									i++;
								}

								_context5.t0 = this;
								_context5.next = 7;
								return _bcrypt2.default.createHash(password);

							case 7:
								_context5.t1 = _context5.sent;
								_context5.t2 = {
									password: _context5.t1
								};
								_context5.t3 = { id: id };
								_context5.next = 12;
								return _context5.t0.update.call(_context5.t0, _context5.t2, '?? = ?', _context5.t3);

							case 12:
								return _context5.abrupt('return', password);

							case 13:
							case 'end':
								return _context5.stop();
						}
					}
				}, _callee5, this);
			}));

			function reissuePassword(_x5) {
				return _ref5.apply(this, arguments);
			}

			return reissuePassword;
		}()
	}]);
	return Users;
}(_index.MySQLModel);

exports.default = Users;