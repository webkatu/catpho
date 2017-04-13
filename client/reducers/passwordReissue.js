const initialState = {
	shouldRequest: true,
	isRequesting: false,
	didRequestSucceed: null,
};

export default (state = initialState, action) => {
	switch(action.type) {
		case 'REQUEST_PASSWORD_REISSUE':
			return Object.assign({}, state, {
				shouldRequest: false,
				isRequesting: true,
			});

		case 'REQUEST_PASSWORD_REISSUE_SUCCESSFUL':
			return Object.assign({}, state, {
				isRequesting: false,
				didRequestSucceed: true,
			});

		case 'REQUEST_PASSWORD_REISSUE_FAILED':
			return Object.assign({}, state, {
				isRequesting: false,
				didRequestSucceed: false,
			});
	}
	return state;
}