const initialState = {
	shouldAutoReload: true,
	hasNextPage: false,
};

const imageListViewer = (state = initialState, action) => {
	switch(action.type) {
		case 'FETCH_CONTENTS_SUCCESS':
			return Object.assign({}, state, {
				hasNextPage: action.payload.currentPage < action.payload.maxPage,
			});

		case 'TOGGLE_AUTO_RELOAD':
			return Object.assign({}, state, {
				shouldAutoReload: action.payload.shouldAutoReload,
			});
	}

	return state;
}

export default imageListViewer;