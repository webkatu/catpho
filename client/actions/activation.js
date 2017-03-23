import config from '../config.js';

const requestActivation = () => {
	return {
		type: 'REQUEST_ACTIVATION',
	}
}

const requestActivationSuccess = () => {
	return {
		type: 'REQUEST_ACTIVATION_SUCCESS',
	}
}

const requestActivationFailure = (error) => {
	return {
		type: 'REQUEST_ACTIVATION_FAILURE',
		payload: error,
	}
}

export const request = () => {
	return async (dispatch) => {
		dispatch(requestActivation);
		try {
			const response = await fetch(config.apiServer + location.pathname, {
				method: 'POST',
				mode: 'cors',
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

			dispatch(requestActivationSuccess());
		}catch(e) {
			console.log(e);
			dispatch(requestActivationFailure(e));
		}
	}
}