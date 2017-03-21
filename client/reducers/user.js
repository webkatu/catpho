const initialState = {
	id: 0,
	userName: '',
	email: '',
	nickname: '',
	avatar: '',
};

export default (state = initialState, action) => {
	switch(action.type) {
		case 'REQUEST_SIGN_UP_SUCCESS': 
		case 'REQUEST_SIGN_IN_SUCCESS':
			return Object.assign({}, state, {
				id: action.payload.id,
				userName: action.payload.userName,
				email: action.payload.email,
				nickname: action.payload.nickname,
				avatar: action.payload.avatar,
			});

		case 'SIGN_OUT':
			return { ...initialState };

		case 'PATCH_REGISTRATION_INFORMATION_SUCCESS':
			return Object.assign({}, state, action.payload);
	}

	return state;
}