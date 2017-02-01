import config from '../config.js';

export const goPreviousContent = () => {
	return {
		type: 'GO_PREVIOUS_CONTENT',
	};
}

export const goNextContent = () => {
	return {
		type: 'GO_MEXT_CONTENT',
	};
}

const _addFavorite = () => {
	return {
		type: 'ADD_FAVORITE',
	};
}

const addFavoriteSuccess = () => {
	return {
		type: 'ADD_FAVORITE_SUCCESS',
	};
}

const addFavoriteFailed = (error) => {
	return {
		type: 'ADD_FAVORITE_FAILED',
		payload: error,
	};
}

export const addFavorite = (userName, contentId) => {
	return async (dispatch) => {
		dispatch(_addFavorite());

		try {
			const response = await fetch(`${config.apiServer}/users/${userName}/favorites`, {
				method: 'post',
				headers: {
					...config.defaultHeaders,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userToken: localStorage.getItem('userToken'),
					contentId: contentId,
				}),
			});
			if(! response.ok) throw new Error(response.status);
			dispatch(addFavoriteSuccess());
		}catch(e) {
			dispatch(addFavoriteFailed(e));
		}
	}
}

const _removeFavorite = () => {
	return {
		type: 'REMOVE_FAVORITE',
	};
}

const removeFavoriteSuccess = () => {
	return {
		type: 'REMOVE_FAVORITE_SUCCESS',
	};
}

const removeFavoriteFailed = (error) => {
	return {
		type: 'REMOVE_FAVORITE_FAILED',
		payload: error,
	};
}

export const removeFavorite = (userName, contentId) => {
	return async (dispatch) => {
		dispatch(_removeFavorite());

		try {
			const response = await fetch(`${config.apiServer}/users/${userName}/favorites/${contentId}`, {
				method: 'delete',
				headers: {
					...config.defaultHeaders,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userToken: localStorage.getItem('userToken'),
				}),
			});
			if(! response.ok) throw new Error(response.status);
			dispatch(removeFavoriteSuccess());
		}catch(e) {
			dispatch(removeFavoriteFailed(e));
		}
	}
}

export const showDeletionConfirmation = () => {
	return {
		type: 'SHOW_DELETION_CONFIRMATION',
	};
}

export const hideDeletionConfirmation = () => {
	return {
		type: 'HIDE_DELETION_CONFIRMATION',
	}
}

const _deleteContent = () => {
	return {
		type: 'DELETE_CONTENT',
	};
}

const deleteContentSuccess = (contentId) => {
	return {
		type: 'DELETE_CONTENT_SUCCESS',
		payload: {
			contentId,
		}
	};
}

const deleteContentFailed = (error) => {
	return {
		type: 'DELETE_CONTENT_FAILED',
		payload: error,
	};
}

export const deleteContent = (contentId) => {
	return async (dispatch) => {
		dispatch(_deleteContent());

		try {
			const response = await fetch(`${config.apiServer}/contents/${contentId}`, {
				method: 'delete',
				headers: {
					...config.defaultHeaders,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userToken: localStorage.getItem('userToken'),
				}),
			});
			if(! response.ok) throw new Error(response.status);
			dispatch(deleteContentSuccess(contentId));
		}catch(e) {
			dispatch(deleteContentFailed(e));
		}
	}
}

export const toggleShareView = () => {
	return {
		type: 'TOGGLE_SHARE_VIEW',
	};
}

const _fetchComments = () => {
	return {
		type: 'FETCH_COMMENTS',
	};
}

const fetchCommentsSuccess = (payload) => {
	return {
		type: 'FETCH_COMMENTS_SUCCESS',
		payload,
	};
}

const fetchCommentsFailed = (error) => {
	return {
		type: 'FETCH_COMMENTS_FAILED',
		payload: error,
	};
}

export const fetchComments = (contentId) => {
	return async (dispatch) => {
		dispatch(_fetchComments());

		try {
			const response = await fetch(`${config.apiServer}/contents/${contentId}/comments`, {
				method: 'get',
				headers: {
					...config.defaultHeaders,
				},
			});
			if(! response.ok) throw new Error(response.status);
			const json = await response.json();
			if(! json.success) throw json.error;
			dispatch(fetchCommentsSuccess(json.payload));
		}catch(e) {
			dispatch(fetchCommentsFailed(e));
		}
	}
}

export const hideCommentBox = () => {
	return {
		type: 'HIDE_COMMENT_BOX',
	}
}

export const inputPostCommentText = (value) => {
	return {
		type: 'INPUT_POST_COMMENT_TEXT',
		payload: { value }
	};
}

const _postComment = () => {
	return {
		type: 'POST_COMMENT',
	};
}

const postCommentSuccess = (payload) => {
	return {
		type: 'POST_COMMENT_SUCCESS',
		payload,
	};
}

const postCommentFailed = (error) => {
	return {
		type: 'POST_COMMENT_FAILED',
		payload: error,
	};
}

export const postComment = (form, contentId) => {
	return async (dispatch) => {
		dispatch(_postComment());

		const formData = new FormData(form);
		formData.append('userToken', localStorage.getItem('userToken'));

		try {
			const response = await fetch(`${config.apiServer}/${contentId}/comments`, {
				method: 'post',
				headers: {
					...config.defaultHeaders,
				},
				body: formData,
			});
			if(! response.ok) throw new Error(response.status);
			const json = await response.json();
			if(! json.success) throw json.error;
			dispatch(postCommentSuccess(json.payload));
		}catch(e) {
			dispatch(postCommentFailed(e));
		}
	}
}

export const showCommentDeletionConfirmation = (selectedId) => {
	return {
		type: 'SHOW_COMMENT_DELETION_CONFIRMATION',
		payload: { selectedId }
	};
}

export const hideCommentDeletionConfirmation = () => {
	return {
		type: 'HIDE_COMMENT_DELETION_CONFIRMATION',
	}
}

const _deleteComment = () => {
	return {
		type: 'DELETE_COMMENT',
	};
}

const deleteCommentSuccess = (payload) => {
	console.log(payload)
	return {
		type: 'DELETE_COMMENT_SUCCESS',
		payload,
	};
}

const deleteCommentFailed = (error) => {
	return {
		type: 'DELETE_COMMENT_FAILED',
		payload: error,
	};
}

export const deleteComment = (contentId, commentId) => {
	return async (dispatch) => {
		dispatch(_deleteComment());

		try {
			const response = await fetch(`${config.apiServer}/${contentId}/comments/${commentId}`, {
				method: 'delete',
				headers: {
					...config.defaultHeaders,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userToken: localStorage.getItem('userToken'),
				}),
			});
			if(! response.ok) throw new Error(response.status);
			const json = await response.json();
			if(! json.success) throw json.error;
			dispatch(deleteCommentSuccess(json.payload));
		}catch(e) {
			dispatch(deleteCommentFailed(e));
		}
	}
}