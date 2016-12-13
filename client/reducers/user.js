const initialState = {
	isSignedIn: false,
	id: 0,
	userName: '',
	email: '',
	nickname: '',
}

export default (state = initialState, action) => {
	switch(action.type) {
		case 'REQUEST_SIGN_UP_SUCCESS': 
		case 'REQUEST_AUTHENTICATION_SUCCESS':
			localStorage.setItem('userToken', action.payload.token);
			return Object.assign({}, state, {
				isSignedIn: true,
				id: action.payload.id,
				userName: action.payload.userName,
				email: action.payload.email,
				nickname: action.payload.nickname,
			});

		case 'REQUEST_SIGN_IN_SUCCESS':
			return Object.assign({}, state, {
				isSignedIn: true,
				id: action.payload.id,
				userName: action.payload.userName,
				email: action.payload.email,
				nickname: action.payload.nickname,
			});
	}

	return state;
}