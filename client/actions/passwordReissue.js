import config from '../config.js';

const _requestPasswordReissue = () => {
	return {
		type: 'REQUEST_PASSWORD_REISSUE',
	};
}

const requestPasswordReissueSuccessful = () => {
	return {
		type: 'REQUEST_PASSWORD_REISSUE_SUCCESSFUL',
	};
}

const requestPasswordReissueFailed = () => {
	return {
		type: 'REQUEST_PASSWORD_REISSUE_FAILED',
	};
}

export const requestPasswordReissue = () => {
	return async (dispatch) => {
		dispatch(_requestPasswordReissue());
		try {
			const params = new URLSearchParams(location.search);
			const response = await fetch(`${config.apiServer}/users/${params.get('userName')}`, {
				method: 'PATCH',
				mode: 'cors',
				headers: {
					...config.defaultHeaders,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					passwordReissueToken: params.get('token'),
				}),
			});
			if(! response.ok) throw new Error(response.status);

			dispatch(requestPasswordReissueSuccessful());
		}catch(e) {
			console.log(e);
			dispatch(requestPasswordReissueFailed());
		}
	}
}