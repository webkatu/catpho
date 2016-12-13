const initialState = {
	id: 0,
	userName: '',
	email: '',
	nickname: '',
}

export default (state = initialState, action) => {
	switch(action.type) {
		case 'REQUEST_SIGN_UP_SUCCESS': 
		case 'REQUEST_AUTHENTICATION_SUCCESS':
		case 'REQUEST_SIGN_IN_SUCCESS':
			return Object.assign({}, state, {
				id: action.payload.id,
				userName: action.payload.userName,
				email: action.payload.email,
				nickname: action.payload.nickname,
			});

		case 'SIGN_OUT':
			return { ...initialState };

	}

	return state;
}