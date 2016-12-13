const initialState = {
	emailMaxLength: 255,
	emailPattern: /^.+@.+/,
	userNameMinLength: 4,
	userNameMaxLength: 32,
	userNamePattern: /^[a-zA-Z0-9]+$/,
	passwordMinLength: 8,
	passwordMaxLength: 64,
	passwordPattern: /^[a-zA-Z0-9!-/:-@¥[-`{-~]+$/,
	validationEmail: false,
	validationUserName: false,
	validationPassword: false,
	isSubmitting: false,
	shouldResetForm: false,
	shouldViewResult: false,
	isSuccess: null,

	possibleSubmit() {
		return (
			this.validationEmail
			&& this.validationUserName
			&& this.validationPassword
			&& ! this.isSubmitting
		);
	},
}

export default (state = initialState, action) => {
	switch(action.type) {
		case 'INPUT_EMAIL@signUp':
			return Object.assign({}, state, {
				validationEmail: validateEmail(action.value),
			});

		case 'INPUT_USER_NAME@signUp':
			return Object.assign({}, state, {
				validationUserName: validateUserName(action.value),
			});

		case 'INPUT_PASSWORD@signUp':
			return Object.assign({}, state, {
				validationPassword: validatePassword(action.value),
			});

		case 'REQUEST_SIGN_UP':
			return Object.assign({}, state, {
				isSubmitting: true,
			});

		case 'REQUEST_SIGN_UP_SUCCESS':
			return Object.assign({}, initialState, {
				isSubmitting: false,
				shouldResetForm: true,
				shouldViewResult: true,
				isSuccess: true,
			});

		case 'REQUEST_SIGN_UP_FAILURE':
			return Object.assign({}, state, {
				isSubmitting: false,
				shouldViewResult: true,
				isSuccess: false,
			});

		case 'RESET_FORM@signUp':
			return Object.assign({}, state, {
				shouldResetForm: false,
			});

		case 'HIDE_RESULT_VIEW@signUp': 
			return Object.assign({}, state, {
				shouldViewResult: false,
			});
	}

	return state;
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