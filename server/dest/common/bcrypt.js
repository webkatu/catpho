'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	createHash: function createHash(data) {
		var _this = this;

		return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.next = 2;
							return _this.hash(data, _config2.default.bcrypt.salt);

						case 2:
							return _context.abrupt('return', _context.sent);

						case 3:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, _this);
		}))();
	},
	hash: function hash(data, salt) {
		var _this2 = this;

		return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
			return _regenerator2.default.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_context2.next = 2;
							return new _promise2.default(function (res, rej) {
								_bcrypt2.default.hash(data, salt, function (err, encrypted) {
									if (err) return rej(err);
									res(encrypted);
								});
							});

						case 2:
							return _context2.abrupt('return', _context2.sent);

						case 3:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, _this2);
		}))();
	},
	compare: function compare(data, encrypted) {
		var _this3 = this;

		return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
			return _regenerator2.default.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							_context3.next = 2;
							return new _promise2.default(function (res, rej) {
								_bcrypt2.default.compare(data, encrypted, function (err, same) {
									if (err) return rej(err);
									res(same);
								});
							});

						case 2:
							return _context3.abrupt('return', _context3.sent);

						case 3:
						case 'end':
							return _context3.stop();
					}
				}
			}, _callee3, _this3);
		}))();
	}
};