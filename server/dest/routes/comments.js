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

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

var _jwtManager = require('../common/jwtManager.js');

var _jwtManager2 = _interopRequireDefault(_jwtManager);

var _validator = require('../common/validator.js');

var _validator2 = _interopRequireDefault(_validator);

var _Contents = require('../models/Contents.js');

var _Contents2 = _interopRequireDefault(_Contents);

var _Comments = require('../models/Comments.js');

var _Comments2 = _interopRequireDefault(_Comments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router({ mergeParams: true });

router.get('/', function () {
	var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res) {
		var results;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return new _Comments2.default().selectComments(req.params.contentId);

					case 3:
						results = _context.sent;


						res.json({
							payload: {
								comments: results
							}
						});
						_context.next = 11;
						break;

					case 7:
						_context.prev = 7;
						_context.t0 = _context['catch'](0);

						console.log(_context.t0);
						return _context.abrupt('return', res.sendStatus(500));

					case 11:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 7]]);
	}));

	return function (_x, _x2) {
		return _ref.apply(this, arguments);
	};
}());

var upload = (0, _multer2.default)().none();
router.post('/', upload, function () {
	var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res) {
		var decoded, result, comments, _ref3, _ref4, OkPacket, results;

		return _regenerator2.default.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.prev = 0;

						if (_validator2.default.validateComment(req.body.comment)) {
							_context2.next = 3;
							break;
						}

						throw new Error();

					case 3:
						_context2.next = 5;
						return _jwtManager2.default.verifyUserAuthToken(req.body.userToken);

					case 5:
						decoded = _context2.sent;
						_context2.next = 8;
						return new _Contents2.default().selectOnce('*', 'id = ?', [req.params.contentId]);

					case 8:
						result = _context2.sent;

						if (!(result === null)) {
							_context2.next = 11;
							break;
						}

						throw new Error();

					case 11:
						_context2.next = 16;
						break;

					case 13:
						_context2.prev = 13;
						_context2.t0 = _context2['catch'](0);
						return _context2.abrupt('return', res.sendStatus(400));

					case 16:
						_context2.prev = 16;
						comments = new _Comments2.default();
						_context2.next = 20;
						return comments.insert({
							contentId: req.params.contentId,
							userId: decoded.userId,
							comment: req.body.comment,
							created: new Date()
						});

					case 20:
						_ref3 = _context2.sent;
						_ref4 = (0, _slicedToArray3.default)(_ref3, 1);
						OkPacket = _ref4[0];
						_context2.next = 25;
						return comments.selectComments(req.params.contentId);

					case 25:
						results = _context2.sent;


						res.json({
							payload: {
								comments: results,
								commentId: OkPacket.insertId
							}
						});
						_context2.next = 33;
						break;

					case 29:
						_context2.prev = 29;
						_context2.t1 = _context2['catch'](16);

						console.log(_context2.t1);
						return _context2.abrupt('return', res.sendStatus(500));

					case 33:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined, [[0, 13], [16, 29]]);
	}));

	return function (_x3, _x4) {
		return _ref2.apply(this, arguments);
	};
}());

exports.default = router;