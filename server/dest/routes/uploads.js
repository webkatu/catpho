'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/*', function (req, res, next) {
	var filePath = _config2.default.uploadsDir + '/' + req.params[0];
	var r = _fs2.default.createReadStream(filePath);

	r.on('error', function () {
		res.sendStatus(404);
	});

	r.pipe(res);
});

exports.default = router;