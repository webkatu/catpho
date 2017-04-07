import config from '../config.js';

const _fetchUser = () => {
	return {
		type: 'FETCH_USER',
	};
}

const fetchUserSuccessful = (payload) => {
	return {
		type: 'FETCH_USER_SUCCESSFUL',
		payload,
	};
}

const fetchUserFailed = (error) => {
	return {
		type: 'FETCH_USER_FAILED',
		payload: { error },
	};
}

export const fetchUser = (userName) => {
	return async (dispatch) => {
		dispatch(_fetchUser());
		try {
			const response = await fetch(`${config.apiServer}/users/${userName}`, {
				method: 'GET',
				mode: 'cors',
				headers: { ...config.defaultHeaders },
			});
			if(! response.ok) throw new Error(response.status);

			const json = await response.json();
			dispatch(fetchUserSuccessful(json.payload));
		}catch(e) {
			console.log(e);
			dispatch(fetchUserFailed(e));
		}
	}
}

export const unmount = () => {
	return {
		type: 'UNMOUNT@user',
	};
}