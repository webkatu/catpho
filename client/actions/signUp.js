import config from '../config.js';

export const inputEmail = (value) => {
	return {
		type: 'INPUT_EMAIL@signUp',
		payload: {
			email: value,
		},
	};
}

export const inputUserName = (value) => {
	return {
		type: 'INPUT_USER_NAME@signUp',
		payload: {
			userName: value,
		},
	};
}

export const inputPassword = (value) => {
	return {
		type: 'INPUT_PASSWORD@signUp',
		payload: {
			password: value,
		},
	};
}

const requestSignUp = () => {
	return {
		type: 'REQUEST_SIGN_UP',
	};
}

const requestSignUpSuccess = (payload) => {
	return {
		type: 'REQUEST_SIGN_UP_SUCCESS',
		payload,
	};
}

const requestSignUpFailed = () => {
	return {
		type: 'REQUEST_SIGN_UP_FAILED',
	};
}

export const signUp = (form) => {
	return async (dispatch) => {
		const formData = new FormData(form);
		dispatch(requestSignUp());
		try {
			const response = await fetch(config.apiServer + 'users', {
				method: 'POST',
				mode: 'cors',
				headers: { ...config.defaultHeaders },
				body: formData,
			});
			if(! response.ok) throw new Error(response.status);

			const json = await response.json();
			dispatch(requestSignUpSuccess(json.payload));
		}catch(e) {
			console.log(e);
			dispatch(requestSignUpFailure());
		}
	};
}

export const resetForm = () => {
	return {
		type: 'RESET_FORM@signUp',
	}
}