const initialState = {
	shouldFetchContent: false,
	prevId: 0,
	nextId: 0,
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

		case 'FETCH_CONTENT_SUCCESSFUL':
			return Object.assign({}, state, {
				prevId: action.payload.prevId,
				nextId: action.payload.nextId,
			});
	}
	return state;
}
