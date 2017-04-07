import config from '../config.js';

export const toggleAutoReload = (checked) => {
	return {
		type: 'TOGGLE_AUTO_RELOAD',
		payload: {
			shouldAutoReload: checked,
		},
	};
}

export const toggleTagsView = () => {
	return {
		type: 'TOGGLE_TAGS_VIEW',
	};
}

const _fetchTags = () => {
	return {
		type: 'FETCH_TAGS',
	};
}

const fetchTagsSuccessful = (payload) => {
	return {
		type: 'FETCH_TAGS_SUCCESSFUL',
		payload,
	};
}

const fetchTagsFailed = () => {
	return {
		type: 'FETCH_TAGS_FAILED',
	};
}

export const fetchTags = () => {
	return async (dispatch) => {
		dispatch(_fetchTags());

		try {
			const response = await fetch(config.apiServer + '/tags', {
				method: 'GET',
				mode: 'cors',
				headers: { ...config.defaultHeaders },
			});
			if(! response.ok) throw new Error(response.status);

			const json = await response.json();
			dispatch(fetchTagsSuccessful(json.payload));

		}catch(e) {
			console.log(e);
			dispatch(fetchTagsFailed());
		}

	}
}