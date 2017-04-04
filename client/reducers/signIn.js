import validator from '../common/validator.js';

const initialState = {
	emailOrUserName: '',
	password: '',
	emailOrUserNameMaxLength: validator.rule.emailMaxLength,
	validationEmailOrUserName: false,
	validationPassword: false,
	isRequesting: false,
	shouldResetForm: false,
	shouldViewResult: false,

	possibleSubmit() {
		return (
			this.validationEmailOrUserName
			&& this.validationPassword
			&& ! this.isRequesting
		);
	},
}

export default (state = initialState, action) => {
	switch(action.type) {
		case 'INPUT_EMAIL_OR_USER_NAME@signIn': {
			const emailOrUserName = action.payload.emailOrUserName;
			return Object.assign({}, state, {
				emailOrUserName,
				validationEmailOrUserName: validator.validateEmail(emailOrUserName) || validator.validateUserName(emailOrUserName),
			});
		}

		case 'INPUT_PASSWORD@signIn':
			return Object.assign({}, state, {
				password: action.payload.password,
				validationPassword: validator.validatePassword(action.payload.password),
			});

		case 'REQUEST_SIGN_IN':
			return Object.assign({}, state, {
				isRequesting: true,
			});

		case 'REQUEST_SIGN_IN_SUCCESS':
			return Object.assign({}, initialState, {
				isRequesting: false,
				shouldResetForm: true,
				shouldViewResult: true,
			});

		case 'REQUEST_SIGN_IN_FAILURE':
			return Object.assign({}, state, {
				isRequesting: false,
				shouldViewResult: true,
			});

		case 'RESET_FORM@signIn':
			return Object.assign({}, state, {
				shouldResetForm: false,
			});

		case 'HIDE_RESULT_VIEW@signIn': 
			return Object.assign({}, state, {
				shouldViewResult: false,
			});
	}

	return state;
}