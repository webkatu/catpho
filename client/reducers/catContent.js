const initialState = {
	content: {
		id: '',
		imageURL: '',
		poster: {
			avatar: '',
			userName: '',
			nickname: '',
		},
		favoritesCount: 0,
		tags: [],
		name: '',
		age: '',
		sex: '',
		description: '',
		postedDate:'',
		prevId: 0,
		nextId: 0,
	},
	isFavorite: false,
	shouldDisplayDeletionConfirmation: false,
	shouldDisplayShareView: false,
	shouldDisplayCommentBox: false,
	commentsCount: 0,
	isFetchingContent: false,
	isDeletingContent: false,
	isRequestingFavorite: false,
	isFetchingComment: false,
	isPostingComment: false,
	fetchingContentSuccess: null,
	fetchingCommentSuccess: null,
}

export default (state = initialState, action) => {
	switch(action.type) {
		case 'FETCH_CONTENT':
			return Object.assign({}, state, {
				isFetchingContent: true,
				shouldDisplayDeletionConfirmation: false,
				shouldDisplayShareView: false,
				shouldDisplayCommentBox: false,
			});

		case 'FETCH_CONTENT_SUCCESS':
			return Object.assign({}, state, {
				isFetchingContent: false,
				fetchingContentSuccess: true,
				content: action.payload.content,
				isFavorite: action.payload.isFavorite,
				commentsCount: action.payload.commentsCount,
			});

		case 'FETCH_CONTENT_FAILED':
			return Object.assign({}, state, {
				isFetchingContent: false,
				fetchingContentSuccess: false,
			});

		case 'GO_PREVIOUS_CONTENT':
			return Object.assign({}, state, {
				selectedIndex: state.selectedIndex - 1,
			});

		case 'GO_NEXT_CONTENT':
			return Object.assign({}, state, {
				selectedIndex: state.selectedIndex + 1,
			});

		case 'ADD_FAVORITE':
			return Object.assign({}, state, {
				isRequestingFavorite: true,
			});

		case 'ADD_FAVORITE_SUCCESS':
			return Object.assign({}, state, {
				isRequestingFavorite: false,
				isFavorite: true,
				favoritesCount: state.favoritesCount + 1,
			});

		case 'ADD_FAVORITE_FAILED':
			return Object.assign({}, state, {
				isRequestingFavorite: false,
			});

		case 'REMOVE_FAVORITE':
			return Object.assign({}, state, {
				isRequestingFavorite: true,
			});

		case 'REMOVE_FAVORITE_SUCCESS':
			return Object.assign({}, state, {
				isRequestingFavorite: false,
				isFavorite: false,
				favoritesCount: state.favoritesCount - 1,
			});

		case 'REMOVE_FAVORITE_FAILED':
			return Object.assign({}, state, {
				isRequestingFavorite: false,
			});

		case 'SHOW_DELETION_CONFIRMATION':
			return Object.assign({}, state, {
				shouldDisplayDeletionConfirmation: true,
			});

		case 'HIDE_DELETION_CONFIRMATION':
			return Object.assign({}, state, {
				shouldDisplayDeletionConfirmation: false,
			});

		case 'DELETE_CONTENT':
			return Object.assign({}, state, {
				isDeletingContent: true,
			});

		case 'DELETE_CONTENT_SUCCESS':
			return Object.assign({}, state, {
				isDeletingContent: false,
				shouldDisplayDeletionConfirmation: false,
				content: initialState.content,
			});

		case 'DELETE_CONTENT_FAILED':
			return Object.assign({}, state, {
				isDeletingContent: false,
			});

		case 'TOGGLE_SHARE_VIEW':
			return Object.assign({}, state, {
				shouldDisplayShareView: ! state.shouldDisplayShareView,
			});

		case 'FETCH_COMMENTS':
			return Object.assign({}, state, {
				isFetchingComment: true,
			});

		case 'FETCH_COMMENTS_SUCCESS':
			return Object.assign({}, state, {
				isFetchingComment: false,
				fetchingCommentSuccess: true,
				shouldDisplayCommentBox: true,
				commentsCount: action.payload.comments.length,
			});

		case 'FETCH_COMMENTS_FAILED':
			return Object.assign({}, state, {
				isFetchingComment: false,
				fetchingCommentSuccess: false,
			});

		case 'HIDE_COMMENT_BOX':
			return Object.assign({}, state, {
				shouldDisplayCommentBox: false,
			});

		case 'POST_COMMENT_SUCCESS':
			return Object.assign({}, state, {
				commentsCount: action.payload.comments.length,
			});

		case 'DELETE_COMMENT_SUCCESS':
			return Object.assign({}, state, {
				commentsCount: action.payload.comments.length,
			});
	}
	return state;
}