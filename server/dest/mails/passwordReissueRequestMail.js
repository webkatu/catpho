"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	render: function render(params) {
		return "\n<p>" + params.userName + "\u69D8</p>\n\n<p>\u30D1\u30B9\u30EF\u30FC\u30C9\u518D\u767A\u884C\u306E\u30EA\u30AF\u30A8\u30B9\u30C8\u3092\u53D7\u3051\u4ED8\u3051\u307E\u3057\u305F\u3002</p>\n<p>\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u518D\u767A\u884C\u3059\u308B\u306B\u306F10\u5206\u4EE5\u5185\u306B\u4E0B\u8A18\u306EURL\u3078\u30A2\u30AF\u30BB\u30B9\u3057\u3066\u304F\u3060\u3055\u3044\u3002</p>\n<p>\u30D1\u30B9\u30EF\u30FC\u30C9\u518D\u767A\u884C\u5F8C\u3001\u30D1\u30B9\u30EF\u30FC\u30C9\u304C\u66F8\u304B\u308C\u305F\u30E1\u30FC\u30EB\u304C\u9001\u4FE1\u3055\u308C\u307E\u3059\u3002</p>\n<p><a href=\"" + params.passwordReissueURL + "\">" + params.passwordReissueURL + "</a></p>\n\n<p>\u203B\u3053\u306E\u30E1\u30FC\u30EB\u306B\u898B\u899A\u3048\u304C\u306A\u3044\u5834\u5408\u306F\u7834\u68C4\u3057\u3066\u304F\u3060\u3055\u3044\u3002</p>\n\n<p>catpho: <a href=\"" + params.appServer + "\">" + params.appServer + "</a></p>\n\t\t";
	}
};