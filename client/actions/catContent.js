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

const addFavoriteSuccessful = () => {
	return {
		type: 'ADD_FAVORITE_SUCCESSFUL',
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
				method: 'POST',
				mode: 'cors',
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
			dispatch(addFavoriteSuccessful());
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

const removeFavoriteSuccessful = () => {
	return {
		type: 'REMOVE_FAVORITE_SUCCESSFUL',
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
				method: 'DELETE',
				mode: 'cors',
				headers: {
					...config.defaultHeaders,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userToken: localStorage.getItem('userToken'),
				}),
			});
			if(! response.ok) throw new Error(response.status);
			dispatch(removeFavoriteSuccessful());
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

const deleteContentSuccessful = (contentId) => {
	return {
		type: 'DELETE_CONTENT_SUCCESSFUL',
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
				method: 'DELETE',
				mode: 'cors',
				headers: {
					...config.defaultHeaders,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userToken: localStorage.getItem('userToken'),
				}),
			});
			if(! response.ok) throw new Error(response.status);
			dispatch(deleteContentSuccessful(contentId));
		}catch(e) {
			console.log(e);
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

const fetchCommentsSuccessful = (payload) => {
	return {
		type: 'FETCH_COMMENTS_SUCCESSFUL',
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
				method: 'GET',
				mode: 'cors',
				headers: {
					...config.defaultHeaders,
				},
			});
			if(! response.ok) throw new Error(response.status);
			const json = await response.json();
			dispatch(fetchCommentsSuccessful(json.payload));
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

const postCommentSuccessful = (payload) => {
	return {
		type: 'POST_COMMENT_SUCCESSFUL',
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
			const response = await fetch(`${config.apiServer}/contents/${contentId}/comments`, {
				method: 'POST',
				mode: 'cors',
				headers: {
					...config.defaultHeaders,
				},
				body: formData,
			});
			if(! response.ok) throw new Error(response.status);
			const json = await response.json();
			dispatch(postCommentSuccessful(json.payload));
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

const deleteCommentSuccessful = (payload) => {
	console.log(payload)
	return {
		type: 'DELETE_COMMENT_SUCCESSFUL',
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
			const response = await fetch(`${config.apiServer}/contents/${contentId}/comments/${commentId}`, {
				method: 'DELETE',
				mode: 'cors',
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
			dispatch(deleteCommentSuccessful(json.payload));
		}catch(e) {
			dispatch(deleteCommentFailed(e));
		}
	}
}