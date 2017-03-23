import config from '../config.js';

const _requestActivatioin = () => {
	return {
		type: 'REQUEST_ACTIVATION',
	};
}

const requestActivationSuccess = () => {
	return {
		type: 'REQUEST_ACTIVATION_SUCCESS',
	};
}

const requestActivationFailed = () => {
	return {
		type: 'REQUEST_ACTIVATION_FAILED',
	};
}

export const requestActivatioin = () => {
	return async (dispatch) => {
		dispatch(_requestActivatioin());

		try {
			const response = await fetch(path, {
				method: 'POST',
				mode: 'cors',
				headers: {
					...config.defaultHeaders,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userToken: localStorage.getItem('userToken'),
				}),
			});

			if(! response.ok) throw new Error(response.status);
			dispatch(requestActivationSuccess());
		}catch(e) {
			dispatch(requestActivationFailed());
		}
	}
}

export const closeDialog = () => {
	return {
		type: 'CLOSE_DIALOG@registrationInformation',
	};
}

export const startEdit = (user) => {
	return {
		type: 'START_EDIT',
		payload: user,
	};
}

export const inputAvatar = (file) => {
	return {
		type: 'INPUY_AVATAR@registrationInformation',
		payload: { file },
	};
}

export const inputNickname = (value) => {
	return {
		type: 'INPUT_NICKNAME@registrationInformation',
		payload: { nickname: value },
	};
}

export const inputEmail = (value) => {
	return {
		type: 'INPUT_EMAIL@registrationInformation',
		payload: { email: value },
	};
}

export const inputCurrentPassword = (value) => {
	return {
		type: 'INPUT_CURRENT_PASSWORD@registrationInformation',
		payload: { currentPassword: value },
	};
}

export const inputPassword = (value) => {
	return {
		type: 'INPUT_PASSWORD@registrationInformation',
		payload: { password: value },
	};
}

export const inputRePassword = (value) => {
	return {
		type: 'INPUT_RE_PASSWORD@registrationInformation',
		payload: { rePassword: value },
	};
}

const _patchRegistrationInformation = () => {
	return {
		type: 'PATCH_REGISTRATION_INFORMATION',
	};
}

const patchRegistrationInformationSuccess = (payload) => {
	return {
		type: 'PATCH_REGISTRATION_INFORMATION_SUCCESS',
		payload,
	};
}

const patchRegistrationInformationFailed = () => {
	return {
		type: 'PATCH_REGISTRATION_INFORMATION_FAILED',
	};
}

export const patchRegistrationInformation = (form, userName) => {
	return async (dispatch) => {
		dispatch(_patchRegistrationInformation());

		const formData = new FormData(form);
		formData.append('userToken', localStorage.getItem('userToken'));
		try {
			const response = await fetch(config.apiServer + '/users/' + userName, {
				method: 'PATCH',
				mode: 'cors',
				headers: {
					...config.defaultHeaders,
				},
				body: formData,
			});
			if(! response.ok) throw new Error(response.status);
			const json = await response.json();
			if(! json.success) throw new Error(json.error);

			dispatch(patchRegistrationInformationSuccess(json.payload));
		}catch(e) {
			dispatch(patchRegistrationInformationFailed());
		}
	}
}