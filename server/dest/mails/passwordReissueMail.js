"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	render: function render(params) {
		return "\n<p>" + params.userName + "\u69D8</p>\n\n<p>\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u518D\u767A\u884C\u3057\u307E\u3057\u305F\u3002</p>\n<p>\u30D1\u30B9\u30EF\u30FC\u30C9: " + params.password + "</p>\n<p>\u30ED\u30B0\u30A4\u30F3\u5F8C\u3001\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u5909\u66F4\u3059\u308B\u3088\u3046\u304A\u3059\u3059\u3081\u3057\u307E\u3059\u3002</p>\n\n<p>catpho: <a href=\"" + params.appServer + "\">" + params.appServer + "</a></p>\n\t\t";
	}
};