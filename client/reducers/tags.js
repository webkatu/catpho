const initialState = {
	tags: [],
};

export default (state = initialState, action) => {
	switch(action.type) {
		case 'FETCH_TAGS_SUCCESSFUL':
			return Object.assign({}, state, {
				tags: action.payload.tags,
			});
	}

	return state;
}