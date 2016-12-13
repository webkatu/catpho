const initialState = {
	emailOrUserNameMaxLength: 255,
	emailMaxLength: 255,
	emailPattern: /^.+@.+/,
	userNameMinLength: 4,
	userNameMaxLength: 32,
	userNamePattern: /^[a-zA-Z0-9]+$/,
	passwordMinLength: 8,
	passwordMaxLength: 64,
	passwordPattern: /^[a-zA-Z0-9!-/:-@¥[-`{-~]+$/,
	validationEmailOrUserName: false,
	validationPassword: false,
	isSubmitting: false,
	shouldResetForm: false,
	shouldViewResult: false,
	isSuccess: null,

	possibleSubmit() {
		return (
			this.validationEmailOrUserName
			&& this.validationPassword
			&& ! this.isSubmitting
		);
	},
}

export default (state = initialState, action) => {
	switch(action.type) {
		case 'INPUT_EMAIL_OR_USER_NAME@signIn':
			return Object.assign({}, state, {
				validationEmailOrUserName: validateEmailOrUserName(action.value),
			});

		case 'INPUT_PASSWORD@signIn':
			return Object.assign({}, state, {
				validationPassword: validatePassword(action.value),
			});

		case 'REQUEST_AUTHENTICATION':
			return Object.assign({}, state, {
				isSubmitting: true,
			});

		case 'REQUEST_AUTHENTICATION_SUCCESS':
			return Object.assign({}, initialState, {
				isSubmitting: false,
				shouldResetForm: true,
				shouldViewResult: true,
				isSuccess: true,
			});

		case 'REQUEST_AUTHENTICATION_FAILURE':
			return Object.assign({}, state, {
				isSubmitting: false,
				shouldViewResult: true,
				isSuccess: false,
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

function validateEmailOrUserName(value) {
	return validateEmail(value) || validateUserName(value);
}

function validateEmail(value) {
	const { emailMaxLength, emailPattern } = initialState;

	if(value.length > emailMaxLength) return false;
	if(! emailPattern.test(value)) return false;
	return true;
}

function validateUserName(value) {
	const { userNameMinLength, userNameMaxLength, userNamePattern } = initialState;

	if(value.length < userNameMinLength) return false;
	if(value.length > userNameMaxLength) return false;
	if(! userNamePattern.test(value)) return false;
	return true;
}

function validatePassword(value) {
	const { passwordMinLength, passwordMaxLength, passwordPattern } = initialState;

	if(value.length < passwordMinLength) return false;
	if(value.length > passwordMaxLength) return false;
	if(! passwordPattern.test(value)) return false;
	return true;
}