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
		case 'REQUEST_SIGN_UP_SUCCESSFUL': 
		case 'REQUEST_SIGN_IN_SUCCESSFUL':
			return Object.assign({}, state, {
				id: action.payload.id,
				userName: action.payload.userName,
				email: action.payload.email,
				nickname: action.payload.nickname,
				avatar: action.payload.avatar,
				hasBeenActivated: Boolean(action.payload.activation),
			});

		case 'DELETE_USER_SUCCESSFUL':
		case 'SIGN_OUT':
			return { ...initialState };

		case 'PATCH_REGISTRATION_INFORMATION_SUCCESSFUL':
			return Object.assign({}, state, {
				...action.payload,
				hasBeenActivated: Boolean(action.payload.activation),
			});

		case 'REQUEST_ACTIVATION_SUCCESSFUL':
			return Object.assign({}, state, {
				hasBeenActivated: true,
			});
	}

	return state;
}