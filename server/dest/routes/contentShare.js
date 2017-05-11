'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _isNan = require('babel-runtime/core-js/number/is-nan');

var _isNan2 = _interopRequireDefault(_isNan);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

var _Contents = require('../models/Contents.js');

var _Contents2 = _interopRequireDefault(_Contents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router({ mergeParams: true });

router.get('/', function () {
	var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
		var contentId, url, result, imageSrc, name, description;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						if (!(req.query.share !== 'true')) {
							_context.next = 2;
							break;
						}

						return _context.abrupt('return', next());

					case 2:
						contentId = Number(req.params.contentId);
						url = _config2.default.appServer + '/contents/' + contentId + '/';

						if (!(0, _isNan2.default)(contentId)) {
							_context.next = 6;
							break;
						}

						return _context.abrupt('return', res.redirect(_config2.default.appServer + '/contents/' + req.params.contentId + '/'));

					case 6:
						_context.next = 8;
						return new _Contents2.default().selectOnce(['filename', 'name', 'description'], '?? = ?', { id: contentId });

					case 8:
						result = _context.sent;

						if (!(result === null)) {
							_context.next = 11;
							break;
						}

						return _context.abrupt('return', res.redirect(url));

					case 11:
						imageSrc = _config2.default.contentsUrl + '/' + result.filename;
						name = result.name === '' ? 'none' : result.name;
						description = result.description === '' ? 'none' : result.description;


						res.send(html({
							name: name,
							url: url,
							imageSrc: imageSrc,
							description: description
						}));

					case 15:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function (_x, _x2, _x3) {
		return _ref.apply(this, arguments);
	};
}());

var html = function html(params) {
	return '\n<head>\n\t<meta property="og:title" content="' + params.name + '" />\n\t<meta property="og:type" content="website" />\n\t<meta property="og:url" content="' + params.url + '" />\n\t<meta property="og:image" content="' + params.imageSrc + '" />\n\t<meta property="og:site_name" content="catpho" />\n\t<meta property="og:description" content="' + params.description + '" />\n\t<meta property="twitter:card" content="photo" />\n\t<script>\n\t\tlocation.href = \'' + params.url + '\';\n\t</script>\n</head>\n';
};

exports.default = router;