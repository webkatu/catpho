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

}