const initialState = {
	content: {
		id: '',
		imageURL: '',
		poster: {
			avatar: '',
			userName: '',
			nickname: '',
		},
		postedDate:'',
		favoritesCount: 0,
		tags: [],
		name: '',
		age: '',
		sex: '',
		description: '',
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

		case 'FETCH_CONTENT_SUCCESSFUL':
			const content = (
				(action.payload.content.id)
				? Object.assign({}, state.content, action.payload.content)
				: Object.assign({}, initialState.content, action.payload.content)
			);
			return Object.assign({}, state, {
				isFetchingContent: false,
				fetchingContentSuccess: true,
				content,
				isFavorite: action.payload.isFavorite,
				commentsCount: action.payload.commentsCount,
			});

		case 'FETCH_CONTENT_FAILED':
			return Object.assign({}, state, {
				content: Object.assign({}, initialState.content),
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

		case 'ADD_FAVORITE_SUCCESSFUL':
			return Object.assign({}, state, {
				isRequestingFavorite: false,
				isFavorite: true,
				content: {
					...state.content,
					favoritesCount: state.content.favoritesCount + 1,
				},
			});

		case 'ADD_FAVORITE_FAILED':
			return Object.assign({}, state, {
				isRequestingFavorite: false,
			});

		case 'REMOVE_FAVORITE':
			return Object.assign({}, state, {
				isRequestingFavorite: true,
			});

		case 'REMOVE_FAVORITE_SUCCESSFUL':
			return Object.assign({}, state, {
				isRequestingFavorite: false,
				isFavorite: false,
				content: {
					...state.content,
					favoritesCount: state.content.favoritesCount - 1,
					
				}
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

		case 'DELETE_CONTENT_SUCCESSFUL':
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

		case 'FETCH_COMMENTS_SUCCESSFUL':
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

		case 'POST_COMMENT_SUCCESSFUL':
			return Object.assign({}, state, {
				commentsCount: action.payload.comments.length,
			});

		case 'DELETE_COMMENT_SUCCESSFUL':
			return Object.assign({}, state, {
				commentsCount: action.payload.comments.length,
			});
	}
	return state;
}