'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

var _registerMail = require('../mails/registerMail.js');

var _registerMail2 = _interopRequireDefault(_registerMail);

var _activationMail = require('../mails/activationMail.js');

var _activationMail2 = _interopRequireDefault(_activationMail);

var _passwordReissueRequestMail = require('../mails/passwordReissueRequestMail.js');

var _passwordReissueRequestMail2 = _interopRequireDefault(_passwordReissueRequestMail);

var _passwordReissueMail = require('../mails/passwordReissueMail.js');

var _passwordReissueMail2 = _interopRequireDefault(_passwordReissueMail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	sendMail: function sendMail(mailOptions) {
		var _this = this;

		return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
			var transporter;
			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							transporter = _nodemailer2.default.createTransport(_config2.default.mail.smtpConfig);
							_context.next = 3;
							return new _promise2.default(function (res, rej) {
								transporter.sendMail(mailOptions, function (error, info) {
									if (error) return rej(error);
									res(info);
								});
							});

						case 3:
							return _context.abrupt('return', _context.sent);

						case 4:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, _this);
		}))();
	},
	sendRegisterMail: function sendRegisterMail(params) {
		var _this2 = this;

		return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
			var to, userName, activationToken, activationURL;
			return _regenerator2.default.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							to = params.to, userName = params.userName, activationToken = params.activationToken;
							activationURL = _config2.default.appServer + '/mypage/activation/?token=' + activationToken;
							_context2.next = 4;
							return _this2.sendMail({
								from: _config2.default.mail.from,
								to: to,
								subject: 'ユーザー登録されました',
								html: _registerMail2.default.render({
									userName: userName,
									activationURL: activationURL,
									appServer: _config2.default.appServer
								})
							});

						case 4:
							return _context2.abrupt('return', _context2.sent);

						case 5:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, _this2);
		}))();
	},
	sendActivationMail: function sendActivationMail(params) {
		var _this3 = this;

		return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
			var to, userName, activationToken, activationURL;
			return _regenerator2.default.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							to = params.to, userName = params.userName, activationToken = params.activationToken;
							activationURL = _config2.default.appServer + '/mypage/activation/?token=' + activationToken;
							_context3.next = 4;
							return _this3.sendMail({
								from: _config2.default.mail.from,
								to: to,
								subject: 'メールアドレスのアクチベーション',
								html: _activationMail2.default.render({
									userName: userName,
									activationURL: activationURL,
									appServer: _config2.default.appServer
								})
							});

						case 4:
							return _context3.abrupt('return', _context3.sent);

						case 5:
						case 'end':
							return _context3.stop();
					}
				}
			}, _callee3, _this3);
		}))();
	},
	sendPasswordReissueRequestMail: function sendPasswordReissueRequestMail(params) {
		var _this4 = this;

		return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
			var to, userName, passwordReissueToken, passwordReissueURL;
			return _regenerator2.default.wrap(function _callee4$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							to = params.to, userName = params.userName, passwordReissueToken = params.passwordReissueToken;
							passwordReissueURL = _config2.default.appServer + '/other/passwordreissue/?token=' + passwordReissueToken + '&userName=' + userName;
							_context4.next = 4;
							return _this4.sendMail({
								from: _config2.default.mail.from,
								to: to,
								subject: 'パスワード再発行リクエスト',
								html: _passwordReissueRequestMail2.default.render({
									userName: userName,
									passwordReissueURL: passwordReissueURL,
									appServer: _config2.default.appServer
								})
							});

						case 4:
							return _context4.abrupt('return', _context4.sent);

						case 5:
						case 'end':
							return _context4.stop();
					}
				}
			}, _callee4, _this4);
		}))();
	},
	sendPasswordReissueMail: function sendPasswordReissueMail(params) {
		var _this5 = this;

		return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
			var to, userName, password;
			return _regenerator2.default.wrap(function _callee5$(_context5) {
				while (1) {
					switch (_context5.prev = _context5.next) {
						case 0:
							to = params.to, userName = params.userName, password = params.password;
							_context5.next = 3;
							return _this5.sendMail({
								from: _config2.default.mail.from,
								to: to,
								subject: 'パスワード再発行',
								html: _passwordReissueMail2.default.render({
									userName: userName,
									password: password,
									appServer: _config2.default.appServer
								})
							});

						case 3:
							return _context5.abrupt('return', _context5.sent);

						case 4:
						case 'end':
							return _context5.stop();
					}
				}
			}, _callee5, _this5);
		}))();
	}
};