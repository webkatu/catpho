'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Tags = require('../models/Tags.js');

var _Tags2 = _interopRequireDefault(_Tags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function () {
	var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
		var _ref2, _ref3, results;

		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.prev = 0;
						_context.next = 3;
						return new _Tags2.default().getAll();

					case 3:
						_ref2 = _context.sent;
						_ref3 = (0, _slicedToArray3.default)(_ref2, 1);
						results = _ref3[0];
						return _context.abrupt('return', res.json({
							payload: { tags: results }
						}));

					case 9:
						_context.prev = 9;
						_context.t0 = _context['catch'](0);

						console.log(_context.t0);
						return _context.abrupt('return', res.sendStatus(500));

					case 13:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[0, 9]]);
	}));

	return function (_x, _x2, _x3) {
		return _ref.apply(this, arguments);
	};
}());

exports.default = router;