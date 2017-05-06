'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	createUserAuthToken: function createUserAuthToken(payload) {
		return new _promise2.default(function (res, rej) {
			_jsonwebtoken2.default.sign((0, _extends3.default)({}, payload, {
				expiresIn: new Date().getTime() + _config2.default.userAuthJWT.expiresIn
			}), _config2.default.userAuthJWT.secretKey, {}, function (err, token) {
				if (err) return rej(err);
				res(token);
			});
		});
	},
	createActivationToken: function createActivationToken(payload) {
		return new _promise2.default(function (res, rej) {
			_jsonwebtoken2.default.sign(payload, _config2.default.activationJWT.secretKey, { expiresIn: _config2.default.activationJWT.expiresIn }, function (err, token) {
				if (err) return rej(err);
				res(token);
			});
		});
	},
	createPasswordReissueToken: function createPasswordReissueToken(payload) {
		return new _promise2.default(function (res, rej) {
			_jsonwebtoken2.default.sign(payload, _config2.default.passwordReissueJWT.secretKey, { expiresIn: _config2.default.passwordReissueJWT.expiresIn }, function (err, token) {
				if (err) return rej(err);
				res(token);
			});
		});
	},
	verifyUserAuthToken: function verifyUserAuthToken(token) {
		return new _promise2.default(function (res, rej) {
			_jsonwebtoken2.default.verify(token, _config2.default.userAuthJWT.secretKey, function (err, decoded) {
				if (err) return rej(err);
				res(decoded);
			});
		});
	},
	verifyActivationToken: function verifyActivationToken(token) {
		return new _promise2.default(function (res, rej) {
			_jsonwebtoken2.default.verify(token, _config2.default.activationJWT.secretKey, function (err, decoded) {
				if (err) return rej(err);
				res(decoded);
			});
		});
	},
	verifyPasswordReissueToken: function verifyPasswordReissueToken(token) {
		return new _promise2.default(function (res, rej) {
			_jsonwebtoken2.default.verify(token, _config2.default.passwordReissueJWT.secretKey, function (err, decoded) {
				if (err) return rej(err);
				res(decoded);
			});
		});
	}
};