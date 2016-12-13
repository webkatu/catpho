const initialState = {
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
				isSignInRequesting: false,
			});

		case 'REQUEST_SIGN_IN_FAILURE':
			return Object.assign({}, state, {
				isSignInRequesting: false,
			});
	}

	return state;
}