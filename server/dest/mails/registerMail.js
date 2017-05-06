"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	render: function render(params) {
		return "\n<p>" + params.userName + "\u69D8</p>\n\n<p>catpho\u3078\u30E6\u30FC\u30B6\u30FC\u767B\u9332\u3055\u308C\u307E\u3057\u305F\u3002</p>\n<p>\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u306E\u672C\u4EBA\u78BA\u8A8D\u3092\u3059\u308B\u306B\u306F\u4E0B\u8A18\u306EURL\u3078\u30A2\u30AF\u30BB\u30B9\u3057\u3066\u304F\u3060\u3055\u3044\u3002</p>\n<p><a href=\"" + params.activationURL + "\">" + params.activationURL + "</a></p>\n\n<p>\u203B\u3053\u306E\u30E1\u30FC\u30EB\u306B\u898B\u899A\u3048\u304C\u306A\u3044\u5834\u5408\u306F\u7834\u68C4\u3057\u3066\u304F\u3060\u3055\u3044\u3002</p>\n\n<p>catpho: <a href=\"" + params.appServer + "\">" + params.appServer + "</a></p>\n\t\t";
	}
};