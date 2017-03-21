const initialState = {
	shouldDisplaySignUp: false,
	shouldDisplaySignIn: false,
	shouldDisplayContentsUpload: false,
};

export default (state = initialState, action) => {
	switch(action.type) {
		case 'TOGGLE_SIGN_UP_VIEW':
			return Object.assign({}, state, {
				shouldDisplaySignUp: ! state.shouldDisplaySignUp,
			});

		case 'TOGGLE_SIGN_IN_VIEW':
			return Object.assign({}, state, {
				shouldDisplaySignIn: ! state.shouldDisplaySignIn,
			});

		case 'TOGGLE_CONTENTS_UPLOAD_VIEW':
			return Object.assign({}, state, {
				shouldDisplayContentsUpload: ! state.shouldDisplayContentsUpload,
			});

		case 'REQUEST_SIGN_UP_SUCCESS':
			return Object.assign({}, state, {
				shouldDisplaySignUp: false,
			});

		case 'REQUEST_SIGN_IN_SUCCESS':
			return Object.assign({}, state, {
				shouldDisplaySignIn: false,
			});

		case 'POST_CONTENTS_SUCCESS':
			return Object.assign({}, state, {
				shouldDisplayContentsUpload: false,
			});
	}
	return state;
}