import config from '../config.js';

export const mount = () => {
	return {
		type: 'MOUNT@registrationInformation',
	};
}

const _requestActivation = () => {
	return {
		type: 'REQUEST_ACTIVATION',
	};
}

const requestActivationSuccessful = () => {
	return {
		type: 'REQUEST_ACTIVATION_SUCCESSFUL',
	};
}

const requestActivationFailed = () => {
	return {
		type: 'REQUEST_ACTIVATION_FAILED',
	};
}

export const requestActivation = (email) => {
	return async (dispatch) => {
		dispatch(_requestActivation());

		try {
			const response = await fetch('/sendmail/?at=activation' , {
				method: 'POST',
				mode: 'cors',
				headers: {
					...config.defaultHeaders,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userToken: localStorage.getItem('userToken'),
					to: email,
				}),
			});

			if(! response.ok) throw new Error(response.status);
			dispatch(requestActivationSuccessful());
		}catch(e) {
			dispatch(requestActivationFailed());
		}
	}
}

export const closeActivationDialog = () => {
	return {
		type: 'CLOSE_ACTIVATION_DIALOG',
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
		type: 'INPUT_AVATAR@registrationInformation',
		payload: { file },
	};
}

export const toggleRestoringAvatar = () => {
	return {
		type: 'TOGGLE_RESTORING_AVATAR',
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

const patchRegistrationInformationSuccessful = (payload) => {
	return {
		type: 'PATCH_REGISTRATION_INFORMATION_SUCCESSFUL',
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
			const response = await fetch(`${config.apiServer}/users/${userName}`, {
				method: 'PATCH',
				mode: 'cors',
				headers: {
					...config.defaultHeaders,
				},
				body: formData,
			});
			if(! response.ok) throw new Error(response.status);

			const json = await response.json();
			dispatch(patchRegistrationInformationSuccessful(json.payload));
		}catch(e) {
			console.log(e);
			dispatch(patchRegistrationInformationFailed());
		}
	}
}

export const openWithdrawalDialog = () => {
	return {
		type: 'OPEN_WITHDRAWAL_DIALOG',
	};
}

export const cancelWithdrawal = () => {
	return {
		type: 'CANCEL_WITHDRAWAL',
	};
}

export const confirmWithdrawal = () => {
	return {
		type: 'CONFIRM_WITHDRAWAL',
	};
}

const _deleteUser = () => {
	return {
		type: 'DELETE_USER',
	};
}

const deleteUserSuccessful = () => {
	return {
		type: 'DELETE_USER_SUCCESSFUL',
	};
}

const deleteUserFailed = () => {
	return {
		type: 'DELETE_USER_FAILED',
	};
}

export const deleteUser = (userName) => {
	return async (dispatch) => {
		dispatch(_deleteUser());

		try {
			const response = await fetch(`${config.apiServer}/users/${userName}?userToken=${localStorage.getItem('userToken')}`, {
				method: 'DELETE',
				mode: 'cors',
				headers: { ...config.defaultHeaders },

			});
			if(! response.ok) throw new Error(response.status);

			dispatch(deleteUserSuccessful());
		}catch(e) {
			console.log(e);
			dispatch(deleteUserFailed());
		}
	};
}

export const moveToHome = () => {
	return {
		type: 'MOVE_TO_HOME@registrationInformation',
	};
}