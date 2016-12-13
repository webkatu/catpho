import config from '../config.js';

export const inputEmail = (value) => {
	return {
		type: 'INPUT_EMAIL@signUp',
		value,
	}
}

export const inputUserName = (value) => {
	return {
		type: 'INPUT_USER_NAME@signUp',
		value,
	}
}

export const inputPassword = (value) => {
	return {
		type: 'INPUT_PASSWORD@signUp',
		value,
	}
}

const requestSignUp = () => {
	return {
		type: 'REQUEST_SIGN_UP',
	}
}

const requestSignUpSuccess = (payload) => {
	return {
		type: 'REQUEST_SIGN_UP_SUCCESS',
		payload,
	}
}

const requestSignUpFailure = () => {
	return {
		type: 'REQUEST_SIGN_UP_FAILURE',
	}
}

const hideResultView = () => {
	return {
		type: 'HIDE_RESULT_VIEW@signUp',
	}
}


let hideResultViewTimerId = null;
export const submit = (form) => {
	const formData = new FormData(form);
	return async (dispatch) => {
		dispatch(requestSignUp());
		try {
			const response = await fetch(config.apiServer + location.pathname, {
				method: 'post',
				body: formData,
			});
			if(! response.ok) throw new Error(response.status);
			const json = await response.json();
			if(! json.success) throw json.error;

			dispatch(requestSignUpSuccess(json.payload));
		}catch(e) {
			console.log(e);
			dispatch(requestSignUpFailure());
		}

		clearTimeout(hideResultViewTimerId);
		hideResultViewTimerId = setTimeout(() => {
			dispatch(hideResultView());
		}, 5000)
	}
}

export const resetForm = () => {
	return {
		type: 'RESET_FORM@signUp',
	}
}