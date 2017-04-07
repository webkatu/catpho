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

const fetchTagsSuccess = (payload) => {
	return {
		type: 'FETCH_TAGS_SUCCESS',
		payload,
	};
}

const fetchTagsFailure = () => {
	return {
		type: 'FETCH_TAGS_FAILURE',
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
			dispatch(fetchTagsSuccess(json.payload));

		}catch(e) {
			console.log(e);
			dispatch(fetchTagsFailure());
		}

	}
}