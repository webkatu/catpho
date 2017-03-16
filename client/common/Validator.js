import validationRule from './validationRule.js';

export default class Validator {
	validateEmail(value) {
		const { emailMaxLength, emailPattern } = validationRule;

		if(value === '') return false;
		if(value.length > emailMaxLength) return false;
		if(! emailPattern.test(value)) return false;
		return true;
	}

	validateUserName(value) {
		const { userNameMinLength, userNameMaxLength, userNamePattern } = validationRule;

		if(value === '') return false;
		if(value.length < userNameMinLength) return false;
		if(value.length > userNameMaxLength) return false;
		if(! userNamePattern.test(value)) return false;
		return true;
	}

	validateNickname(value) {
		const { nicknameMaxLength } = validationRule;

		if(value === '') return false;
		if(value.length > nicknameMaxLength) return false;
		return true;
	}

	validatePassword(value) {
		const { passwordMinLength, passwordMaxLength, passwordPattern } = validationRule;

		if(value === '') return false;
		if(value.length < passwordMinLength) return false;
		if(value.length > passwordMaxLength) return false;
		if(! passwordPattern.test(value)) return false;
		return true;
	}

	validateImageFile(file) {
		const { fileMaxSize, allowedImageTypes } = validationRule;
		if(file.size > fileMaxSize) return false;
		if(! allowedImageTypes.includes(file.type)) return false;
		return true;
	}

	validateName(value) {
		const { nameMaxLength } = validationRule;
		value = value.trim();
		if(value.length > nameMaxLength) return false;
		return true;
	}

	validateAge(value) {
		const { ageMin, ageMax } = validationRule;
		value = Number(value);
		if(Number.isNaN(value)) return false;
		if(value < ageMin) return false;
		if(value > ageMax) return false;
		return true;
	}

	validateTag(value) {
		const { tagMaxLength, tagMaxCount } = validationRule;
		const tags = value.trim().split(' ');

		if(tags.length > tagMaxCount) return false;
		if(! tags.every(tag => tag.length <= tagMaxLength)) return false;
		return true;
	}

	validateDescription(value) {
		const { descriptionMaxLength } = validationRule;
		value = value.trim();
		if(value.length > descriptionMaxLength) return false;
		return true;
	}

}