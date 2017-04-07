const initialState = {
	userName: '',
	nickname: '',
	avatar: '',
	created: '',
	postCount: 0,
	isFetchingUser: false,
	didFailFetchingUser: false,
};

export default (state = initialState, action) => {
	switch(action.type) {
		case 'FETCH_USER':
			return Object.assign({}, state, {
				isFetchingUser: true,
			});

		case 'FETCH_USER_SUCCESSFUL':
			return Object.assign({}, state, {
				userName: action.payload.userName,
				nickname: action.payload.nickname,
				avatar: action.payload.avatar,
				created: action.payload.created,
				postCount: action.payload.postCount,
				isFetchingUser: false,
				didFailFetchingUser: false,
			});

		case 'FETCH_USER_FAILED':
			return Object.assign({}, state, {
				isFetchingUser: false,
				didFailFetchingUser: true,
			});

		case 'UNMOUNT@user':
			return Object.assign({}, initialState);
	}

	return state;
}