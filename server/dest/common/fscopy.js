'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (src, dest) {
	return new _promise2.default(function (res, rej) {
		var r = _fs2.default.createReadStream(src);
		r.on('error', function (err) {
			rej(err);
		});

		var w = _fs2.default.createWriteStream(dest);
		w.on('error', function (err) {
			rej(err);
		});
		w.on('close', function () {
			res();
		});

		r.pipe(w);
	});
};