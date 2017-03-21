const initialState = {
	isSignedIn: false,
}

export default (state = initialState, action) => {
	switch(action.type) {
		case 'REQUEST_SIGN_UP_SUCCESS': 
		case 'REQUEST_SIGN_IN_SUCCESS':
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