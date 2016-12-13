import config from '../config.js';

export const inputEmailOrUserName = (value) => {
	return {
		type: 'INPUT_EMAIL_OR_USER_NAME@signIn',
		value,
	}
}

export const inputPassword = (value) => {
	return {
		type: 'INPUT_PASSWORD@signIn',
		value,
	}
}

const requestAuthentication = () => {
	return {
		type: 'REQUEST_AUTHENTICATION',
	}
}

const requestAuthenticationInSuccess = (payload) => {
	return {
		type: 'REQUEST_AUTHENTICATION_SUCCESS',
		payload,
	}
}

const requestAuthenticationFailure = () => {
	return {
		type: 'REQUEST_AUTHENTICATION_FAILURE',
	}
}

const hideResultView = () => {
	return {
		type: 'HIDE_RESULT_VIEW@signIn',
	}
}


let hideResultViewTimerId = null;
export const submit = (form) => {
	const formData = new FormData(form);
	return async (dispatch) => {
		dispatch(requestAuthentication());
		try {
			const response = await fetch(config.apiServer + '/signin/authentication', {
				method: 'post',
				headers: {
					...config.defaultHeaders,
				},
				body: formData,
			});
			if(! response.ok) throw new Error();
			const json = await response.json();
			console.log(json);
			if(! json.success) throw json.error;

			dispatch(requestAuthenticationInSuccess(json.payload));
		}catch(e) {
			dispatch(requestAuthenticationFailure());
		}

		clearTimeout(hideResultViewTimerId);
		hideResultViewTimerId = setTimeout(() => {
			dispatch(hideResultView());
		}, 5000)
	}
}

export const resetForm = () => {
	return {
		type: 'RESET_FORM@signIn',
	}
}