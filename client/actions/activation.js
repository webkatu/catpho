import config from '../config.js';

const _requestActivation = () => {
	return {
		type: 'REQUEST_ACTIVATION',
	}
}

const requestActivationSuccess = () => {
	return {
		type: 'REQUEST_ACTIVATION_SUCCESS',
	}
}

const requestActivationFailure = () => {
	return {
		type: 'REQUEST_ACTIVATION_FAILURE',
	}
}

export const requestActivation = (userName) => {
	return async (dispatch) => {
		dispatch(_requestActivation());
		try {
			const response = await fetch(`${config.apiServer}/users/${userName}`, {
				method: 'PATCH',
				mode: 'cors',
				headers: {
					...config.defaultHeaders,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userToken: localStorage.getItem('userToken'),
					activationToken: new URLSearchParams(location.search.slice(1)).get('token'),
				}),
			});
			if(! response.ok) throw new Error(response.status);

			dispatch(requestActivationSuccess());
		}catch(e) {
			console.log(e);
			dispatch(requestActivationFailure());
		}
	}
}