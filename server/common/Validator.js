import validationRule from './validationRule.js';
import typeOf from './typeOf.js';

export default class Validator {
	constructor() {
		this.rule = validationRule;
	}

	validateEmail(value) {
		const { emailMaxLength, emailPattern } = this.constructor.rule;

		if(typeOf(value) !== 'string') return false;
		if(value.length > emailMaxLength) return false;
		if(! emailPattern.test(value)) return false;
		return true;
	}

	validateUserName(value) {
		const { userNameMinLength, userNameMaxLength, userNamePattern } = this.constructor.rule;

		if(typeOf(value) !== 'string') return false;
		if(value.length < userNameMinLength) return false;
		if(value.length > userNameMaxLength) return false;
		if(! userNamePattern.test(value)) return false;
		return true;
	}

	validateEmailOrUserName(value) {
		if(typeOf(value) !== 'string') return false;
		return this.validateEmail(value) || this.validateUserName(value);
	}

	validatePassword(value) {
		const { passwordMinLength, passwordMaxLength, passwordPattern } = this.constructor.rule;

		if(typeOf(value) !== 'string') return false;
		if(value.length < passwordMinLength) return false;
		if(value.length > passwordMaxLength) return false;
		if(! passwordPattern.test(value)) return false;
		return true;
	}

	validateNickname(value) {
		const { nicknameMaxLength } = this.constructor.rule;

		if(typeOf(value) !== 'string') return false;
		if(value === '') return false;
		if(value.length > nicknameMaxLength) return false;
		return true;
	}

	validateImageFile(file) {
		const { allowedImageTypes } = this.constructor.rule;

		if(typeOf(file) !== 'object') return false;
		return allowedImageTypes.includes(file.mimetype);
	}

	validateContentBody(body) {
		if(typeOf(body) !== 'object') return false;
		const { name, age, tags, description } = body;
		const { nameMaxLength, ageMin, ageMax, tagMaxCount, tagMaxLength, descriptionMaxLength } = this.constructor.rule;
		
		if(name === undefined || age === undefined || tags === undefined || description === undefined) return false;

		if(name.length > nameMaxLength) return false;
		if(age < ageMin || age > ageMax) return false;
		if(tags.length > tagMaxCount) return false;
		if(! tags.every(tag => tag.length <= tagMaxLength)) return false;
		if(description.length > descriptionMaxLength) return false;

		return true;
	}

	validateComment(value = null) {
		const { commentMaxLength } = this.constructor.rule;

		if(typeof value !== 'string') return false;
		if(value.trim() === '') return false;
		if(value.length > this.rule.commentMaxLength) return false;
		return true;
	}

	static rule = validationRule;
}