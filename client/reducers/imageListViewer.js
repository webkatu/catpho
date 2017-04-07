const initialState = {
	shouldAutoReload: true,
	hasNextPage: false,
	shouldDisplayTagsView: false,
	isFetchingTags: false,
};

const imageListViewer = (state = initialState, action) => {
	switch(action.type) {
		case 'FETCH_CONTENTS_SUCCESSFUL':
			return Object.assign({}, state, {
				hasNextPage: action.payload.currentPage < action.payload.maxPage,
			});

		case 'TOGGLE_AUTO_RELOAD':
			return Object.assign({}, state, {
				shouldAutoReload: action.payload.shouldAutoReload,
			});

		case 'TOGGLE_TAGS_VIEW':
			return Object.assign({}, state, {
				shouldDisplayTagsView: ! state.shouldDisplayTagsView,
			});

		case 'FETCH_TAGS':
			return Object.assign({}, state, {
				isFetchingTags: true,
			});

		case 'FETCH_TAGS_SUCCESSFUL':
			return Object.assign({}, state, {
				isFetchingTags: false,
			});

		case 'FETCH_TAGS_FAILED':
			return Object.assign({}, state, {
				isFetchingTags: false,
			});
	}

	return state;
}

export default imageListViewer;