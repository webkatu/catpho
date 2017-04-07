const initialState = {
	isSignedIn: false,
}

export default (state = initialState, action) => {
	switch(action.type) {
		case 'REQUEST_SIGN_UP_SUCCESSFUL': 
		case 'REQUEST_SIGN_IN_SUCCESSFUL':
			localStorage.setItem('userToken', action.payload.userToken);
			return Object.assign({}, state, {
				isSignedIn: true,
			});

		case 'DELETE_USER_SUCCESSFUL':
		case 'SIGN_OUT':
			localStorage.removeItem('userToken');
			return Object.assign({}, state, {
				isSignedIn: false,
			});
	}

	return state;
}