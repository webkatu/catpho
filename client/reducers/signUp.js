import validator from '../common/validator.js';

const initialState = {
	email: '',
	userName: '',
	password: '',
	emailMaxLength: validator.rule.emailMaxLength,
	userNameMaxLength: validator.rule.userNameMaxLength,
	validEmail: false,
	validUserName: false,
	validPassword: false,
	isRequesting: false,
	shouldResetForm: false,

	possibleSubmit() {
		return (
			this.validEmail
			&& this.validUserName
			&& this.validPassword
			&& ! this.isRequesting
		);
	},
}

export default (state = initialState, action) => {
	switch(action.type) {
		case 'INPUT_EMAIL@signUp':
			return Object.assign({}, state, {
				email: action.payload.email,
				validEmail: validator.validateEmail(action.payload.email),
			});

		case 'INPUT_USER_NAME@signUp':
			return Object.assign({}, state, {
				userName: action.payload.userName,
				validUserName: validator.validateUserName(action.payload.userName),
			});

		case 'INPUT_PASSWORD@signUp':
			return Object.assign({}, state, {
				password: action.payload.password,
				validPassword: validator.validatePassword(action.payload.password),
			});

		case 'REQUEST_SIGN_UP':
			return Object.assign({}, state, {
				isRequesting: true,
			});

		case 'REQUEST_SIGN_UP_SUCCESSFUL':
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