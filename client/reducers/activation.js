const initialState = {
	shouldRequestActivation: false,
	isRequesting: false,
	isSuccess: null,
	errorMessage: '',
}

export default (state = initialState, action) => {
	switch(action.type) {
		case 'REQUEST_SIGN_IN_SUCCESS': 
			return Object.assign({}, state, {
				shouldRequestActivation: true,
			});

		case 'REQUEST_ACTIVATION':
			return Object.assign({}, state, {
				shouldRequestActivation: false,
				isRequesting: true,
			});

		case 'REQUEST_ACTIVATION_SUCCESS':
			return Object.assign({}, state, {
				isRequesting: false,
				isSuccess: true,
			});

		case 'REQUEST_ACTIVATION_FAILURE':
			return Object.assign({}, state, {
				isRequesting: false,
				isSuccess: false,
				errorMessage: action.payload.message,
			});

	}
	return state;
}
