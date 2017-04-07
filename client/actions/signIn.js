import config from '../config.js';
import formToSearchParams from '../common/formToSearchParams.js';

export const inputEmailOrUserName = (value) => {
	return {
		type: 'INPUT_EMAIL_OR_USER_NAME@signIn',
		payload: {
			emailOrUserName: value,
		},
	};
}

export const inputPassword = (value) => {
	return {
		type: 'INPUT_PASSWORD@signIn',
		payload: {
			password: value,
		},
	};
}

const requestSignIn = () => {
	return {
		type: 'REQUEST_SIGN_IN',
	};
}

const requestSignInSuccessful = (payload) => {
	return {
		type: 'REQUEST_SIGN_IN_SUCCESSFUL',
		payload,
	};
}

const requestSignInFailed = () => {
	return {
		type: 'REQUEST_SIGN_IN_FAILED',
	};
}

export const signIn = (form) => {
	return async (dispatch) => {
		let query = '';
		if(form) query = formToSearchParams(form).toString();
		else query = `userToken=${localStorage.getItem('userToken')}`;
		
		dispatch(requestSignIn());
		try {
			const response = await fetch(`${config.apiServer}/users?${query}`, {
				method: 'GET',
				mode: 'cors',
				headers: { ...config.defaultHeaders },
			});
			if(! response.ok) throw new Error(response.status);

			const json = await response.json();
			dispatch(requestSignInSuccessful(json.payload));
		}catch(e) {
			console.log(e);
			dispatch(requestSignInFailed());
		}
	};
}

export const resetForm = () => {
	return {
		type: 'RESET_FORM@signIn',
	};
}