const initialState = {
	isSignedIn: false,
	isSignInRequesting: false,
}

export default (state = initialState, action) => {
	switch(action.type) {
		case 'REQUEST_SIGN_IN':
			return Object.assign({}, state, {
				isSignInRequesting: true,
			});

		case 'REQUEST_SIGN_IN_SUCCESS':
			return Object.assign({}, initialState, {
				isSignedIn: true,
				isSignInRequesting: false,
			});

		case 'REQUEST_SIGN_IN_FAILURE':
			return Object.assign({}, state, {
				isSignInRequesting: false,
			});
	
		case 'REQUEST_SIGN_UP_SUCCESS': 
		case 'REQUEST_AUTHENTICATION_SUCCESS':
			localStorage.setItem('userToken', action.payload.token);
			return Object.assign({}, state, {
				isSignedIn: true,
			});

		case 'SIGN_OUT':
			localStorage.removeItem('userToken');
			return Object.assign({}, state, {
				isSignedIn: false,
			});
	}

	return state;
}