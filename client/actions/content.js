import config from '../config.js';

const _fetchContent = () => {
	return {
		type: 'FETCH_CONTENT',
	};
}

const fetchContentSuccess = (payload) => {
	return {
		type: 'FETCH_CONTENT_SUCCESS',
		payload,
	};
}

const fetchContentFailed = (error) => {
	return {
		type: 'FETCH_CONTENT_FAILED',
		payload: error,
	};
}

let fetchContentId = 0;
export const fetchContent = (contentId) => {
	return async (dispatch) => {
		dispatch(_fetchContent());

		const fetchId = ++fetchContentId;
		try {
			const response = await fetch(`${config.apiServer}/contents/${contentId}?userToken=${localStorage.getItem('userToken')}`, {
				method: 'get',
				headers: {
					...config.defaultHeaders,
				},
			});
			//fetch割り込み時は何もしない
			if(fetchId !== fetchContentId) return;
			if(! response.ok) throw new Error(response.status);
			const json = await response.json();
			if(! json.success) throw json.error;
			dispatch(fetchContentSuccess(json.payload));
		}catch(e) {
			console.log(e);
			dispatch(fetchContentFailed(e));
		}
	}
}