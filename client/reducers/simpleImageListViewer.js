const initialState = {
	contents: [],
	pagerInfo: {
		interval: 5,
		total: 10,
		max: 0,
		start: 0,
		current: 0,
	},
	lists: [],
	isFetching: false,
	shouldFetchContents: false,
	isDisplayContentViewer: false,
	basePathOfFetch: '/contents',
};

export default (state = initialState, action) => {
	switch(action.type) {
		case 'FETCH_CONTENTS':
			return Object.assign({}, state, {
				isFetching: true,
				shouldFetchContents: false,
			});

		case 'FETCH_CONTENTS_SUCCESS':
			return Object.assign({}, state, {
				contents: [...state.contents, ...action.payload.contents],
				pagerInfo: {
					...state.pagerInfo,
					max: action.payload.maxPage,
					current: action.payload.currentPage,
				},
				lists: [...state.lists, action.payload.contents],
				isFetching: false,
			});

		case 'FETCH_CONTENTS_FAILED':
			return Object.assign({}, state, {
				isFetching: false,
			});

		case 'DELETE_CONTENT_SUCCESS':
			//contentsとlistsから該当コンテンツを削除;
			const deletedContents = [];
			const contents = [...state.contents];
			for(let i = 0; i < contents.length; i++) {
				const content = contents[i];
				if(content.id !== action.payload.contentId) continue;
				deletedContents.push(content);
				contents.splice(i, 1);
				i--;
			}

			const lists = [...state.lists];
			lists.forEach((list) => {
				for(let i = 0; i < deletedContents.length; i++) {
					const deletedContent = deletedContents[i];
					const index = list.contents.indexOf(deletedContent);
					if(index === -1) continue;
					list.contents.splice(index, 1);
					deletedContents.splice(i, 1);
					i--;
				}
			});

			return Object.assign({}, state, {
				contents,
				lists,
				isDisplayingViewer: false,
			});

		case 'MOUNT@simpleImageListViewer':
			return Object.assign({}, initialState, {
				pagerInfo: {
					...initialState.pagerInfo,
					start: action.payload.startPage,
				},
				shouldFetchContents: true,
				basePathOfFetch: action.payload.basePathOfFetch,
			});

		case 'OPEN_VIEWER':
			return Object.assign({}, state, {
				isDisplayingViewer: true,
			});

		case 'CLOSE_VIEWER':
			return Object.assign({}, state, {
				isDisplayingViewer: false,
			});
	}
	return state;
}