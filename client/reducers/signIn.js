import validator from '../common/validator.js';

const initialState = {
	emailOrUserName: '',
	password: '',
	emailOrUserNameMaxLength: validator.rule.emailMaxLength,
	validationEmailOrUserName: false,
	validationPassword: false,
	isRequesting: false,
	shouldResetForm: false,
	shouldDisplayPasswordReissueForm: false,

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

		case 'REQUEST_SIGN_IN_SUCCESSFUL':
			return Object.assign({}, initialState, {
				isRequesting: false,
				shouldResetForm: true,
			});

		case 'REQUEST_SIGN_IN_FAILED':
			return Object.assign({}, state, {
				isRequesting: false,
			});

		case 'RESET_FORM@signIn':
			return Object.assign({}, state, {
				shouldResetForm: false,
			});

		case 'TOGGLE_PASSWORD_REISSUE_FORM':
			return Object.assign({}, state, {
				shouldDisplayPasswordReissueForm: ! state.shouldDisplayPasswordReissueForm,
			});

		case 'REQUEST_PASSWORD_REISSUE':
			return Object.assign({}, state, {
				shouldDisplayPasswordReissueForm: false,
			});
	}

	return state;
}