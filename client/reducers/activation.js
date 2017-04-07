const initialState = {
	shouldRequestActivation: false,
	isRequesting: false,
	didRequestSucceed: null,
}

export default (state = initialState, action) => {
	switch(action.type) {
		case 'REQUEST_SIGN_IN_SUCCESSFUL': 
			return Object.assign({}, state, {
				shouldRequestActivation: true,
			});

		case 'REQUEST_ACTIVATION':
			return Object.assign({}, state, {
				shouldRequestActivation: false,
				isRequesting: true,
			});

		case 'REQUEST_ACTIVATION_SUCCESSFUL':
			return Object.assign({}, state, {
				isRequesting: false,
				didRequestSucceed: true,
			});

		case 'REQUEST_ACTIVATION_FAILED':
			return Object.assign({}, state, {
				isRequesting: false,
				didRequestSucceed: false,
			});

	}
	return state;
}
