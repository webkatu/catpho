const initialState = {
	shouldAutoLoad: true,
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

		case 'TOGGLE_AUTO_LOAD':
			return Object.assign({}, state, {
				shouldAutoLoad: ! state.shouldAutoLoad,
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