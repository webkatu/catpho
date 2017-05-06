'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _validationRule = require('./validationRule.js');

var _validationRule2 = _interopRequireDefault(_validationRule);

var _typeOf = require('./typeOf.js');

var _typeOf2 = _interopRequireDefault(_typeOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	rule: _validationRule2.default,

	validateEmail: function validateEmail(value) {
		var _rule = this.rule,
		    emailMaxLength = _rule.emailMaxLength,
		    emailPattern = _rule.emailPattern;


		if ((0, _typeOf2.default)(value) !== 'string') return false;
		if (value.length > emailMaxLength) return false;
		if (!emailPattern.test(value)) return false;
		return true;
	},
	validateUserName: function validateUserName(value) {
		var _rule2 = this.rule,
		    userNameMinLength = _rule2.userNameMinLength,
		    userNameMaxLength = _rule2.userNameMaxLength,
		    userNamePattern = _rule2.userNamePattern;


		if ((0, _typeOf2.default)(value) !== 'string') return false;
		if (value.length < userNameMinLength) return false;
		if (value.length > userNameMaxLength) return false;
		if (!userNamePattern.test(value)) return false;
		return true;
	},
	validateEmailOrUserName: function validateEmailOrUserName(value) {
		if ((0, _typeOf2.default)(value) !== 'string') return false;
		return this.validateEmail(value) || this.validateUserName(value);
	},
	validatePassword: function validatePassword(value) {
		var _rule3 = this.rule,
		    passwordMinLength = _rule3.passwordMinLength,
		    passwordMaxLength = _rule3.passwordMaxLength,
		    passwordPattern = _rule3.passwordPattern;


		if ((0, _typeOf2.default)(value) !== 'string') return false;
		if (value.length < passwordMinLength) return false;
		if (value.length > passwordMaxLength) return false;
		if (!passwordPattern.test(value)) return false;
		return true;
	},
	validateNickname: function validateNickname(value) {
		var _rule4 = this.rule,
		    nicknameMaxLength = _rule4.nicknameMaxLength,
		    nicknamePattern = _rule4.nicknamePattern;


		if ((0, _typeOf2.default)(value) !== 'string') return false;
		if (value === '') return false;
		if (value.length > nicknameMaxLength) return false;
		if (!nicknamePattern.test(value)) return false;
		return true;
	},
	validateImageFile: function validateImageFile(file) {
		var allowedImageTypes = this.rule.allowedImageTypes;


		if ((0, _typeOf2.default)(file) !== 'object') return false;
		return allowedImageTypes.includes(file.mimetype);
	},
	validateContentBody: function validateContentBody(body) {
		if ((0, _typeOf2.default)(body) !== 'object') return false;
		var name = body.name,
		    age = body.age,
		    tags = body.tags,
		    description = body.description;
		var _rule5 = this.rule,
		    nameMaxLength = _rule5.nameMaxLength,
		    ageMin = _rule5.ageMin,
		    ageMax = _rule5.ageMax,
		    tagMaxCount = _rule5.tagMaxCount,
		    tagMaxLength = _rule5.tagMaxLength,
		    descriptionMaxLength = _rule5.descriptionMaxLength;


		if (name === undefined || age === undefined || tags === undefined || description === undefined) return false;

		if (name.length > nameMaxLength) return false;
		if (age < ageMin || age > ageMax) return false;
		if (tags.length > tagMaxCount) return false;
		if (!tags.every(function (tag) {
			return tag.length <= tagMaxLength;
		})) return false;
		if (description.length > descriptionMaxLength) return false;

		return true;
	},
	validateComment: function validateComment() {
		var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		var commentMaxLength = this.rule.commentMaxLength;


		if (typeof value !== 'string') return false;
		if (value.trim() === '') return false;
		if (value.length > this.rule.commentMaxLength) return false;
		return true;
	}
};