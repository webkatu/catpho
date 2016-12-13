import config from '../config.js';

const requestSignInSuccess = (payload) => {
	return {
		type: 'REQUEST_SIGN_IN_SUCCESS',
		payload,
	}
}

const requestSignInFailure = (error) => {
	return {
		type: 'REQUEST_SIGN_IN_FAILURE',
		payload: error,
	}
}

export const requestSignIn = () => {
	return async (dispatch) => {
		dispatch(() => { return { type: 'REQUEST_SIGN_IN' } });
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