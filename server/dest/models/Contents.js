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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Contents = function (_MySQLModel) {
	(0, _inherits3.default)(Contents, _MySQLModel);

	function Contents() {
		(0, _classCallCheck3.default)(this, Contents);
		return (0, _possibleConstructorReturn3.default)(this, (Contents.__proto__ || (0, _getPrototypeOf2.default)(Contents)).apply(this, arguments));
	}

	(0, _createClass3.default)(Contents, [{
		key: 'createTable',
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
				var sql;
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								sql = 'create table ' + this.tableName + ' (\n\t\t\tid int not null auto_increment primary key,\n\t\t\tuserId int not null,\n\t\t\tfilename varchar(255),\n\t\t\tmimetype varchar(255),\n\t\t\tname varchar(255),\n\t\t\tsex enum(\'none\', \'male\', \'female\'),\n\t\t\tage int,\n\t\t\tdescription varchar(255),\n\t\t\tcreated datetime,\n\t\t\tmodified timestamp\n\t\t);';
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
		key: 'saveContents',
		value: function () {
			var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(files, body) {
				var dataArray, _ref3, _ref4, OkPacket, insertId;

				return _regenerator2.default.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								dataArray = files.map(function (file) {
									return {
										userId: body.userId,
										filename: file.filename,
										mimetype: file.mimetype,
										name: body.name,
										sex: body.sex,
										age: body.age,
										description: body.description,
										created: new Date()
									};
								});
								_context2.next = 3;
								return this.insertMultiple(dataArray);

							case 3:
								_ref3 = _context2.sent;
								_ref4 = (0, _slicedToArray3.default)(_ref3, 1);
								OkPacket = _ref4[0];
								insertId = OkPacket.insertId;
								return _context2.abrupt('return', Array(OkPacket.affectedRows).fill(0).map(function () {
									return insertId++;
								}));

							case 8:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function saveContents(_x, _x2) {
				return _ref2.apply(this, arguments);
			}

			return saveContents;
		}()
	}, {
		key: 'selectContent',
		value: function () {
			var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(id) {
				var sql;
				return _regenerator2.default.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								sql = '(select * from ' + this.tableName + ' where id = ?)\n\t\t\tunion all\n\t\t\t(select * from ' + this.tableName + ' where id < ? order by id desc limit 1)\n\t\t\tunion all\n\t\t\t(select * from ' + this.tableName + ' where id > ? order by id asc limit 1);';
								_context3.next = 3;
								return this.query(sql, [id, id, id]);

							case 3:
								return _context3.abrupt('return', _context3.sent);

							case 4:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function selectContent(_x3) {
				return _ref5.apply(this, arguments);
			}

			return selectContent;
		}()
	}]);
	return Contents;
}(_index.MySQLModel);

exports.default = Contents;