import config from '../config.js';

const requestSignIn = () => {
	return {
		type: 'REQUEST_SIGN_IN',
	};
}

const requestSignInSuccess = (payload) => {
	return {
		type: 'REQUEST_SIGN_IN_SUCCESS',
		payload,
	};
}

const requestSignInFailure = (error) => {
	return {
		type: 'REQUEST_SIGN_IN_FAILURE',
		payload: error,
	};
}

export const signIn = () => {
	return async (dispatch) => {
		dispatch(requestSignIn());
		try {
			const response = await fetch(config.apiServer + '/signin', {
				method: 'post',
				headers: {
					...config.defaultHeaders,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userToken: localStorage.getItem('userToken'),
				}),
			});

			if(! response.ok) throw new Error(response.status);

			const json = await response.json();
			if(! json.success) throw json.error;

			dispatch(requestSignInSuccess(json.payload));
		}catch(e) {
			dispatch(requestSignInFailure(e))
		}
	}
}
