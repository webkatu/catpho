'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _isNan = require('babel-runtime/core-js/number/is-nan');

var _isNan2 = _interopRequireDefault(_isNan);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jwtManager = require('../common/jwtManager.js');

var _jwtManager2 = _interopRequireDefault(_jwtManager);

var _Comments = require('../models/Comments.js');

var _Comments2 = _interopRequireDefault(_Comments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router({ mergeParams: true });

router.delete('/', function () {
	var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res) {
		var decoded, comments, _ref2, _ref3, OkPacket, results;

		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;

						if (!(0, _isNan2.default)(req.params.contentId)) {
							_context.next = 3;
							break;
						}

						throw new Error();

					case 3:
						if (!(0, _isNan2.default)(req.params.commentId)) {
							_context.next = 5;
							break;
						}

						throw new Error();

					case 5:
						_context.next = 7;
						return _jwtManager2.default.verifyUserAuthToken(req.body.userToken);

					case 7:
						decoded = _context.sent;
						_context.next = 13;
						break;

					case 10:
						_context.prev = 10;
						_context.t0 = _context['catch'](0);
						return _context.abrupt('return', res.sendStatus(400));

					case 13:
						_context.prev = 13;
						comments = new _Comments2.default();
						_context.next = 17;
						return comments.delete('id = ? and contentId = ? and userId = ?', [req.params.commentId, req.params.contentId, decoded.userId]);

					case 17:
						_ref2 = _context.sent;
						_ref3 = (0, _slicedToArray3.default)(_ref2, 1);
						OkPacket = _ref3[0];

						if (!(OkPacket.affectedRows === 0)) {
							_context.next = 22;
							break;
						}

						return _context.abrupt('return', res.sendStatus(400));

					case 22:
						_context.next = 24;
						return comments.selectComments(req.params.contentId);

					case 24:
						results = _context.sent;


						res.json({
							payload: {
								comments: results
							}
						});
						_context.next = 32;
						break;

					case 28:
						_context.prev = 28;
						_context.t1 = _context['catch'](13);

						console.log(_context.t1);
						return _context.abrupt('return', res.sendStatus(500));

					case 32:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 10], [13, 28]]);
	}));

	return function (_x, _x2) {
		return _ref.apply(this, arguments);
	};
}());

exports.default = router;