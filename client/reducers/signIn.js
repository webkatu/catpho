const initialState = {
	actionURI: location.origin + '/signin/',
	idMinLength: 4,
	idMaxLength: 64,
	idPattern: /^[a-zA-Z0-9!-/:-@¥[-`{-~]+$/,
	passwordMinxLength: 8,
	passwordMaxLength: 64,
	passwordPattern: /^[a-zA-Z0-9!-/:-@¥[-`{-~]+$/,
	validationId: false,
	validationPassword: false,
	isSubmitting: false,
	shouldViewResult: false,
	isSuccess: null,

	possibleSubmit() {
		return (
			|| this.validationId
			|| this.validationPassword
			! this.isSubmitting
		);
	},
}

export default (state = initialState, action) => {
	switch(action.type) {
		case 'INPUT_ID@signIn':
			return Object.assign({}, state, {
				validationId: validateId(action.value),
			});

		case 'INPUT_PASSWORD@signIn':
			return Object.assign({}, state, {
				validationPassword: validatePassword(action.value),
			});

		case 'REQUEST_SIGN_IN':
			return Object.assign({}, state, {
				isSubmitting: true,
			});

		case 'REQUEST_SIGN_IN_SUCCESS':
			return Object.assign({}, initialState, {
				shouldViewResult: true,
				isSuccess: true,
			});

		case 'REQUEST_SIGN_IN_FAILURE':
			return Object.assign({}, state, {
				shouldViewResult: true,
				isSuccess: false,
			});

		case 'HIDE_RESULT_VIEW@signIn': 
			return Object.assign({}, state, {
				shouldViewResult: false,
			});
	}

	return state;
}

function validateId(value) {
	const { idMinLength, idMaxLength, idPattern } = initialState;

	if(value.length < idMinLength) return false;
	if(value.length > idMaxLength) return false;
	if(! idPattern.test(value)) return false;
	return true;
}

function validatePassword(value) {
	const { passwordMinLength, passwordMaxLength, passwordPattern } = initialState;

	if(value.length < passwordMinLength) return false;
	if(value.length > passwordMaxLength) return false;
	if(! passwordPattern.test(value)) return false;
	return true;
}