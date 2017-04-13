import validator from '../common/validator.js';

const initialState = {
	email: '',
	emailMaxLength: validator.rule.emailMaxLength,
	validEmail: false,
	shouldResetForm: false,
	isRequesting: false,
	isAlreadyRequesting: false,
	possibleSubmit() {
		return this.validEmail
			&& ! this.isRequesting
			&& ! this.isAlreadyRequesting;
	},
};

export default (state = initialState, action) => {
	switch(action.type) {
		case 'INPUT_EMAIL@passwordReissueRequest': {
			const email = action.payload.email;
			return Object.assign({}, state, {
				email,
				validEmail: validator.validateEmail(email),
			});
		}

		case 'REQUEST_PASSWORD_REISSUE_REQUEST':
			return Object.assign({}, state, {
				isRequesting: true,
			});

		case 'REQUEST_PASSWORD_REISSUE_REQUEST_SUCCESSFUL':
			return Object.assign({}, state, {
				isRequesting: false,
				shouldResetForm: true,
				isAlreadyRequesting: true,	
			});

		case 'REQUEST_PASSWORD_REISSUE_REQUEST_FAILED':
			return Object.assign({}, state, {
				isRequesting: false,
			});

		case 'RESET_FORM@passwordReissueRequest':
			return Object.assign({}, state, {
				shouldResetForm: false,
			});
	}
	return state;
}