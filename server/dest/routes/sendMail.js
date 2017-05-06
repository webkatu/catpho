'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _jwtManager = require('../common/jwtManager.js');

var _jwtManager2 = _interopRequireDefault(_jwtManager);

var _validator = require('../common/validator.js');

var _validator2 = _interopRequireDefault(_validator);

var _mailer = require('../common/mailer.js');

var _mailer2 = _interopRequireDefault(_mailer);

var _Users = require('../models/Users.js');

var _Users2 = _interopRequireDefault(_Users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var upload = (0, _multer2.default)().none();

router.post('/', upload, function () {
	var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						if (req.xhr) {
							_context.next = 2;
							break;
						}

						return _context.abrupt('return', res.sendStatus(403));

					case 2:
						next();

					case 3:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function (_x, _x2, _x3) {
		return _ref.apply(this, arguments);
	};
}(), function () {
	var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
		var decoded;
		return _regenerator2.default.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						if (!(req.query.at !== 'register')) {
							_context2.next = 2;
							break;
						}

						return _context2.abrupt('return', next());

					case 2:
						_context2.prev = 2;
						_context2.next = 5;
						return _jwtManager2.default.verifyActivationToken(req.body.activationToken);

					case 5:
						decoded = _context2.sent;

						if (!(decoded.email !== req.body.to)) {
							_context2.next = 8;
							break;
						}

						throw new Error();

					case 8:
						_context2.next = 14;
						break;

					case 10:
						_context2.prev = 10;
						_context2.t0 = _context2['catch'](2);

						console.log(_context2.t0);
						return _context2.abrupt('return', res.sendStatus(400));

					case 14:
						_mailer2.default.sendRegisterMail({
							to: req.body.to,
							userName: decoded.userName,
							activationToken: req.body.activationToken
						}).catch(function (err) {
							console.log(err);
						});

						return _context2.abrupt('return', res.sendStatus(204));

					case 16:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined, [[2, 10]]);
	}));

	return function (_x4, _x5, _x6) {
		return _ref2.apply(this, arguments);
	};
}(), function () {
	var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
		var decoded, activationToken;
		return _regenerator2.default.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						if (!(req.query.at !== 'activation')) {
							_context3.next = 2;
							break;
						}

						return _context3.abrupt('return', next());

					case 2:
						if (_validator2.default.validateEmail(req.body.to)) {
							_context3.next = 4;
							break;
						}

						return _context3.abrupt('return', res.sendStatus(400));

					case 4:
						_context3.prev = 4;
						_context3.next = 7;
						return _jwtManager2.default.verifyUserAuthToken(req.body.userToken);

					case 7:
						decoded = _context3.sent;
						_context3.next = 14;
						break;

					case 10:
						_context3.prev = 10;
						_context3.t0 = _context3['catch'](4);

						console.log(_context3.t0);
						return _context3.abrupt('return', res.sendStatus(400));

					case 14:
						_context3.prev = 14;
						_context3.next = 17;
						return _jwtManager2.default.createActivationToken({
							userId: decoded.userId,
							userName: decoded.userName
						});

					case 17:
						activationToken = _context3.sent;
						_context3.next = 20;
						return _mailer2.default.sendActivationMail({
							to: req.body.to,
							userName: decoded.userName,
							activationToken: activationToken
						});

					case 20:
						_context3.next = 26;
						break;

					case 22:
						_context3.prev = 22;
						_context3.t1 = _context3['catch'](14);

						console.log(_context3.t1);
						return _context3.abrupt('return', res.sendStatus(500));

					case 26:
						return _context3.abrupt('return', res.sendStatus(204));

					case 27:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, undefined, [[4, 10], [14, 22]]);
	}));

	return function (_x7, _x8, _x9) {
		return _ref3.apply(this, arguments);
	};
}(), function () {
	var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, next) {
		var result, passwordReissueToken;
		return _regenerator2.default.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						if (!(req.query.at !== 'passwordReissueRequest')) {
							_context4.next = 2;
							break;
						}

						return _context4.abrupt('return', next());

					case 2:
						if (_validator2.default.validateEmail(req.body.email)) {
							_context4.next = 4;
							break;
						}

						return _context4.abrupt('return', res.sendStatus(400));

					case 4:
						_context4.prev = 4;
						_context4.next = 7;
						return new _Users2.default().selectOnce(['userName'], 'email = ?', [req.body.email]);

					case 7:
						result = _context4.sent;

						if (!(result === null)) {
							_context4.next = 10;
							break;
						}

						return _context4.abrupt('return', res.sendStatus(400));

					case 10:
						_context4.next = 12;
						return _jwtManager2.default.createPasswordReissueToken({
							email: req.body.email
						});

					case 12:
						passwordReissueToken = _context4.sent;


						_mailer2.default.sendPasswordReissueRequestMail({
							to: req.body.email,
							userName: result.userName,
							passwordReissueToken: passwordReissueToken
						}).catch(function (err) {
							console.log(err);
						});

						return _context4.abrupt('return', res.sendStatus(204));

					case 17:
						_context4.prev = 17;
						_context4.t0 = _context4['catch'](4);

						console.log(_context4.t0);
						return _context4.abrupt('return', res.sendStatus(500));

					case 21:
					case 'end':
						return _context4.stop();
				}
			}
		}, _callee4, undefined, [[4, 17]]);
	}));

	return function (_x10, _x11, _x12) {
		return _ref4.apply(this, arguments);
	};
}(), function () {
	var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(req, res) {
		return _regenerator2.default.wrap(function _callee5$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						res.sendStatus(404);

					case 1:
					case 'end':
						return _context5.stop();
				}
			}
		}, _callee5, undefined);
	}));

	return function (_x13, _x14) {
		return _ref5.apply(this, arguments);
	};
}());

exports.default = router;