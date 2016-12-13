import validationRule from './validationRule.js';

export default class Validator {
	constructor() {
		this.rule = validationRule;
	}

	validateEmail(value = null) {
		if(value === null) return false;
		if(value.length > this.rule.emailMaxLength) return false;
		if(! this.rule.emailPattern.test(value)) return false;
		return true;
	}

	validateUserName(value = null) {
		if(value === null) return false;
		if(value.length < this.rule.userNameMinLength) return false;
		if(value.length > this.rule.userNameMaxLength) return false;
		if(! this.rule.userNamePattern.test(value)) return false;
		return true;
	}

	validateEmailOrUserName(value = null) {
		if(value === null) return false;
		return this.validateEmail(value) || this.validateUserName(value);
	}

	validatePassword(value = null) {
		if(value === null) return false;
		if(value.length < this.rule.passwordMinLength) return false;
		if(value.length > this.rule.passwordMaxLength) return false;
		if(! this.rule.passwordPattern.test(value)) return false;
		return true;
	}
}