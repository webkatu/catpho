const initialState = {
	shouldFetchContent: false,
};

export default (state = initialState, action) => {
	switch(action.type) {
		case 'CHANGE_LOCATION@contentViewer':
			return Object.assign({}, state, {
				shouldFetchContent: true,
			});

		case 'FETCH_CONTENT':
			return Object.assign({}, state, {
				shouldFetchContent: false,
			});
	}
	return state;
}
