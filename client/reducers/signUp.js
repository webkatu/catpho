import Validator from '../common/Validator.js';
const validator = new Validator();

const initialState = {
	email: '',
	userName: '',
	password: '',
	emailMaxLength: Validator.rule.emailMaxLength,
	userNameMaxLength: Validator.rule.userNameMaxLength,
	validationEmail: false,
	validationUserName: false,
	validationPassword: false,
	isRequesting: false,
	shouldResetForm: false,

	possibleSubmit() {
		return (
			this.validationEmail
			&& this.validationUserName
			&& this.validationPassword
			&& ! this.isRequesting
		);
	},
}

export default (state = initialState, action) => {
	switch(action.type) {
		case 'INPUT_EMAIL@signUp':
			return Object.assign({}, state, {
				email: action.payload.email,
				validationEmail: validarot.validateEmail(action.payload.email),
			});

		case 'INPUT_USER_NAME@signUp':
			return Object.assign({}, state, {
				userName: action.payload.userName,
				validationUserName: validator.validateUserName(action.payload.userName),
			});

		case 'INPUT_PASSWORD@signUp':
			return Object.assign({}, state, {
				password: action.payload.password,
				validationPassword: validator.validatePassword(action.payload.password),
			});

		case 'REQUEST_SIGN_UP':
			return Object.assign({}, state, {
				isRequesting: true,
			});

		case 'REQUEST_SIGN_UP_SUCCESS':
			return Object.assign({}, initialState, {
				isRequesting: false,
				shouldResetForm: true,
			});

		case 'REQUEST_SIGN_UP_FAILED':
			return Object.assign({}, state, {
				isRequesting: false,
			});

		case 'RESET_FORM@signUp':
			return Object.assign({}, state, {
				shouldResetForm: false,
			});
	}

	return state;
}