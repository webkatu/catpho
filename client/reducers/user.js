const initialState = {
	id: 0,
	userName: '',
	email: '',
	nickname: '',
	avatar: '',
	hasBeenActivated: false,
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
				hasBeenActivated: Boolean(action.payload.activation)
			});

		case 'DELETE_USER_SUCCESS':
		case 'SIGN_OUT':
			return { ...initialState };

		case 'PATCH_REGISTRATION_INFORMATION_SUCCESS':
			return Object.assign({}, state, action.payload);
	}

	return state;
}