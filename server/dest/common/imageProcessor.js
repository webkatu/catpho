'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _easyimage = require('easyimage');

var _easyimage2 = _interopRequireDefault(_easyimage);

var _fscopy = require('./fscopy.js');

var _fscopy2 = _interopRequireDefault(_fscopy);

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	resize: function resize(size, src, dst) {
		var _this = this;

		return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
			var image, width, height;
			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.next = 2;
							return _easyimage2.default.info(src);

						case 2:
							image = _context.sent;

							if (!(image.width <= size && image.height <= size)) {
								_context.next = 7;
								break;
							}

							_context.next = 6;
							return (0, _fscopy2.default)(src, dst);

						case 6:
							return _context.abrupt('return', _context.sent);

						case 7:
							width = void 0, height = void 0;

							if (image.width > image.height) {
								width = size;
								height = image.height / (image.width / size);
							} else {
								height = size;
								width = image.width / (image.height / size);
							}

							_context.next = 11;
							return _easyimage2.default.resize({ src: src, dst: dst, width: width, height: height });

						case 11:
							return _context.abrupt('return', _context.sent);

						case 12:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, _this);
		}))();
	},
	createContent: function createContent(src, dst) {
		var _this2 = this;

		return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
			return _regenerator2.default.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_context2.next = 2;
							return _this2.resize(_config2.default.image.contentSize, src, dst);

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
	createThumbnail: function createThumbnail(src, dst) {
		var _this3 = this;

		return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
			return _regenerator2.default.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							_context3.next = 2;
							return _this3.resize(_config2.default.image.thumbnailSize, src, dst);

						case 2:
							return _context3.abrupt('return', _context3.sent);

						case 3:
						case 'end':
							return _context3.stop();
					}
				}
			}, _callee3, _this3);
		}))();
	},
	createAvatar: function createAvatar(src, dst) {
		var _this4 = this;

		return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
			return _regenerator2.default.wrap(function _callee4$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							_context4.next = 2;
							return _this4.resize(_config2.default.image.avatarSize, src, dst);

						case 2:
							return _context4.abrupt('return', _context4.sent);

						case 3:
						case 'end':
							return _context4.stop();
					}
				}
			}, _callee4, _this4);
		}))();
	}
};