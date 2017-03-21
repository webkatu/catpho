import qs from 'querystring';

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
	basePathOfFetch: '/contents',
	isFetching: false,
	shouldDisplayContentViewer: false,
	shouldClearContents: false,
	shouldFetchContents: false,
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

		case 'POST_CONTENTS_SUCCESS':
			return Object.assign({}, state, {
				shouldClearContents: true,
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
					const index = list.indexOf(deletedContent);
					if(index === -1) continue;
					list.splice(index, 1);
					deletedContents.splice(i, 1);
					i--;
				}
			});

			return Object.assign({}, state, {
				contents,
				lists,
				shouldDisplayContentViewer: false,
			});

		case 'CHANGE_LOCATION@simpleImageListViewer':
			return Object.assign({}, state, {
				shouldClearContents: true,
			});

		case 'CLEAR@simpleImageListViewer':
			const page = Number(qs.parse(location.search.slice(1)).page);

			return Object.assign({}, initialState, {
				pagerInfo: {
					...initialState.pagerInfo,
					start: (page > 0) ? page : 1,
				},
				basePathOfFetch: state.basePathOfFetch,
				shouldFetchContents: true,
			});

		case 'MOUNT@simpleImageListViewer':
			return Object.assign({}, state, {
				basePathOfFetch: action.payload.basePathOfFetch,
			});

		case 'OPEN_VIEWER':
			return Object.assign({}, state, {
				shouldDisplayContentViewer: true,
			});

		case 'CLOSE_VIEWER':
			return Object.assign({}, state, {
				shouldDisplayContentViewer: false,
			});
	}
	return state;
}