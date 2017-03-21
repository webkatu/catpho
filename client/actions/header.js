import config from '../config.js';

export const toggleSignUpView = () => {
	return {
		type: 'TOGGLE_SIGN_UP_VIEW',
	};
}

export const toggleSignInView = () => {
	return {
		type: 'TOGGLE_SIGN_IN_VIEW',
	};
}

export const toggleContentsUploadView = () => {
	return {
		type: 'TOGGLE_CONTENTS_UPLOAD_VIEW',
	};
}
