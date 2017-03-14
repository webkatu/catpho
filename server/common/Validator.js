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

	validateNickname(_value) {
		const value = _value.trim();
		
		if(value === '') return false;
		if(value.length > this.rule.nicknameMaxLength) return false;
		return true;
	}

	validateContentBody(body) {
		const { name, age, tags, description } = body;
		const { nameMaxLength, ageMin, ageMax, tagMaxCount, tagMaxLength, descriptionMaxLength } = this.rule;
		
		if(name.length > nameMaxLength) return false;
		if(age < ageMin || age > ageMax) return false;
		if(tags.length > tagMaxCount) return false;
		if(! tags.every(tag => tag.length <= tagMaxLength)) return false;
		if(description.length > descriptionMaxLength) return false;

		return true;
	}

	validateComment(value = null) {
		if(typeof value !== 'string') return false;
		if(value.trim() === '') return false;
		if(value.length > this.rule.commentMaxLength) return false;
		return true;
	}
}