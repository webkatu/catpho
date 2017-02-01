const initialState = {
	shouldDisplayViewer: false,
}

export default (state = initialState, action) => {
	switch(action.type) {
		case 'OPEN_VIEWER':
			return Object.assign({}, state, {
				shouldDisplayViewer: true,
			});

		case 'CLOSE_VIEWER':
			return Object.assign({}, state, {
				shouldDisplayViewer: false,
			});

		case 'DELETE_CONTENT_SUCCESS':
			return Object.assign({}, state, {
				shouldDisplayViewer: false,
			});
	}
	return state;
}

