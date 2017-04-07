import validator from '../common/validator.js';

const initialState = {
	comments: [],
	postCommentText: '',
	selectedId: 0,
	validationPostCommentText: false,
	shouldDisplayDeletionConfirmation: false,
	isPostingComment: false,
	isDeletingComment: false,
	possibleSubmit() {
		return (
			this.validationPostCommentText &&
			! this.isPostingComment
		);
	},
};

export default (state = initialState, action) => {
	switch(action.type) {
		case 'FETCH_COMMENTS_SUCCESSFUL':
			return Object.assign({}, state, {
				comments: action.payload.comments,
			});

		case 'INPUT_POST_COMMENT_TEXT':
			return Object.assign({}, state, {
				postCommentText: action.payload.value,
				validationPostCommentText: validator.validatePostCommentText(action.payload.value),
			});

		case 'POST_COMMENT':
			return Object.assign({}, state, {
				isPostingComment: true,
			});

		case 'POST_COMMENT_SUCCESSFUL':
			return Object.assign({}, state, {
				isPostingComment: false,
				comments: action.payload.comments,
				postCommentText: '',
			});

		case 'POST_COMMENT_FAILED':
			return Object.assign({}, state, {
				isPostingComment: false,
			});
		
		case 'SHOW_COMMENT_DELETION_CONFIRMATION':
			return Object.assign({}, state, {
				selectedId: action.payload.selectedId,
				shouldDisplayDeletionConfirmation: true,
			});

		case 'HIDE_COMMENT_DELETION_CONFIRMATION':
			return Object.assign({}, state, {
				selectedId: initialState.selectedId,
				shouldDisplayDeletionConfirmation: false,
			});

		case 'DELETE_COMMENT':
			return Object.assign({}, state, {
				isDeletingComment: true,
			});

		case 'DELETE_COMMENT_SUCCESSFUL':
			return Object.assign({}, state, {
				isDeletingComment: false,
				shouldDisplayDeletionConfirmation: false,
				comments: action.payload.comments,
			});

		case 'DELETE_COMMENT_FAILED':
			return Object.assign({}, state, {
				isDeletingComment: false,
				shouldDisplayDeletionConfirmation: false,
			});
	}
	return state;
}
