'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _mysql2.default.createConnection({
	host: _config2.default.mysql.host,
	user: _config2.default.mysql.user,
	password: _config2.default.mysql.password,
	database: _config2.default.mysql.database,
	dateStrings: true
});