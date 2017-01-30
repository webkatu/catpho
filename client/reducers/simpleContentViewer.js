const initialState = {
	contentIds: [],
	selectedIndex: 0,
	previousId: 0,
	nextId: 0,
}

export default (state = initialState, action) => {
	switch(action.type) {
		case 'OPEN_VIEWER':
			return Object.assign({}, state, {
				contentIds: action.payload.contentIds,
				selectedIndex: action.payload.selectedIndex,
				previousId: action.payload.contentIds[action.payload.selectedIndex - 1] || 0,
				nextId: action.payload.contentIds[action.payload.selectedIndex + 1] || 0,
			});

		case 'CLOSE_VIEWER':
			return Object.assign({}, initialState);

		case 'GO_PREVIOUS@simpleContentViewer':
			return Object.assign({}, state, {
				selectedIndex: state.selectedIndex - 1,
				previousId: state.contentIds[state.selectedIndex - 2] || 0,
				nextId: state.contentIds[state.selectedIndex] || 0,
			});

		case 'GO_NEXT@simpleContentViewer':
			return Object.assign({}, state, {
				selectedIndex: state.selectedIndex + 1,
				previousId: state.contentIds[state.selectedIndex] || 0,
				nextId: state.contentIds[state.selectedIndex + 2] || 0,
			});
	}
	return state;
}