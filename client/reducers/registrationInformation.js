import config from '../config.js';
import validator from '../common/validator.js';

const initialState = {
	form: {
		currentAvatarImg: '',
		avatarImg: '',
		avatar: '',
		nickname: '',
		email: '',
		currentPassword: '',
		password: '',
		rePassword: '',
		avatarDisabled: false,
		restoringAvatarChecked: false,
		allowedImageTypes: validator.rule.allowedImageTypes,
	},
	isRequestingActivation: false,
	isAlreadyRequestingActivation: false,
	shouldDisplayActivationDialog: false,
	isEditMode: false,
	validAvatar: true,
	validNickname: true,
	validEmail: true,
	validCurrentPassword: true,
	validPassword: true,
	validRePassword: true,
	isPatching: false,
	possibleSubmit() {
		return (
			this.validAvatar &&
			this.validNickname &&
			this.validEmail &&
			this.validCurrentPassword &&
			this.validPassword &&
			this.validRePassword &&
			! this.isPatching
		);
	},
	shouldDisplayWithdrawalDialog: false,
	didConfirmToWithdraw: false,
	isDeletingUser: false,
}

export default (state = initialState, action) => {
	switch(action.type) {
		case 'MOUNT@registrationInformation':
			window.URL.revokeObjectURL(state.form.avatarImg);
			return Object.assign({}, initialState);

		case 'REQUEST_ACTIVATION_REQUEST':
			return Object.assign({}, state, {
				isRequestingActivation: true,
			});

		case 'REQUEST_ACTIVATION_REQUEST_SUCCESSFUL':
			return Object.assign({}, state, {
				isRequestingActivation: false,
				shouldDisplayActivationDialog: true,
				isAlreadyRequestingActivation: true,
			});

		case 'REQUEST_ACTIVATION_REQUEST_FAILED':
			return Object.assign({}, state, {
				isRequestingActivation: false,
			});

		case 'CLOSE_ACTIVATION_DIALOG':
			return Object.assign({}, state, {
				shouldDisplayActivationDialog: false,
			});

		case 'START_EDIT':
			return Object.assign({}, state, {
				isEditMode: true,
				form: {
					...state.form,
					currentAvatarImg: action.payload.avatar,
					avatarImg: action.payload.avatar,
					nickname: action.payload.nickname,
					email: action.payload.email,
				},
			});

		case 'INPUT_AVATAR@registrationInformation': {
			window.URL.revokeObjectURL(state.form.avatarImg);
			const file = action.payload.file;
			if(file instanceof File) {
				return Object.assign({}, state, {
					form: {
						...state.form,
						avatarImg: window.URL.createObjectURL(file),
						avatar: file,
					},
					validAvatar: validator.validateImageFile(file),
				});
			}else {
				return Object.assign({}, state, {
					form: {
						...state.form,
						avatarImg: state.form.currentAvatarImg,
						avatar: '',
					},
					validAvatar: true,
				});
			}
		}

		case 'TOGGLE_RESTORING_AVATAR': {
			if(state.form.restoringAvatarChecked) {
				return Object.assign({}, state, {
					form: {
						...state.form,
						avatarImg: state.form.currentAvatarImg,
						avatar: '',
						avatarDisabled: false,
						restoringAvatarChecked: false,
					},
					validAvatar: true,
				});
			}else {
				window.URL.revokeObjectURL(state.form.avatarImg);
				return Object.assign({}, state, {
					form: {
						...state.form,
						avatarImg: `${config.apiServer}/uploads/avatars/default.jpg`,
						avatar: '',
						avatarDisabled: true,
						restoringAvatarChecked: true,
					},
					validAvatar: true,
				})
			}
		}

		case 'INPUT_NICKNAME@registrationInformation':
			const nickname = action.payload.nickname;
			return Object.assign({}, state, {
				form: {
					...state.form,
					nickname,
				},
				validNickname: validator.validateNickname(nickname) || nickname.trim() === '',

			});

		case 'INPUT_EMAIL@registrationInformation':
			const email = action.payload.email;
			return Object.assign({}, state, {
				form: {
					...state.form,
					email,
				},
				validEmail: validator.validateEmail(email) || email.trim() === '',
			});

		case 'INPUT_CURRENT_PASSWORD@registrationInformation':
			const currentPassword = action.payload.currentPassword;
			return Object.assign({}, state, {
				form: {
					...state.form,
					currentPassword,
				},
				validCurrentPassword: validator.validatePassword(currentPassword) || (currentPassword === '' && state.form.password === ''),
			});

		case 'INPUT_PASSWORD@registrationInformation':
			const password = action.payload.password;
			return Object.assign({}, state, {
				form: {
					...state.form,
					password,
				},
				validCurrentPassword: (state.form.currentPassword === '' && password === '') ? true : (state.form.currentPassword === '' && password !== '') ? false : state.validCurrentPassword,
				validPassword: validator.validatePassword(password) || password === '',
				validRePassword: password === state.form.rePassword,
			});

		case 'INPUT_RE_PASSWORD@registrationInformation':
			const rePassword = action.payload.rePassword;
			return Object.assign({}, state, {
				form: {
					...state.form,
					rePassword,
				},
				validRePassword: state.form.password === rePassword,
			});

		case 'PATCH_REGISTRATION_INFORMATION':
			return Object.assign({}, state, {
				isPatching: true,
			});

		case 'PATCH_REGISTRATION_INFORMATION_SUCCESSFUL':
			window.URL.revokeObjectURL(state.form.avatarImg);
			return Object.assign({}, initialState);

		case 'PATCH_REGISTRATION_INFORMATION_FAILED':
			return Object.assign({}, state, {
				isPatching: false,
			});

		case 'OPEN_WITHDRAWAL_DIALOG':
			return Object.assign({}, state, {
				shouldDisplayWithdrawalDialog: true,
			});

		case 'CANCEL_WITHDRAWAL':
			return Object.assign({}, state, {
				shouldDisplayWithdrawalDialog: false,
				didConfirmToWithdraw: false,
			});

		case 'CONFIRM_WITHDRAWAL':
			return Object.assign({}, state, {
				didConfirmToWithdraw: true,
			});

		case 'DELETE_USER':
			return Object.assign({}, state, {
				isDeletingUser: true,
			});

		case 'DELETE_USER_SUCCESSFUL':
			return Object.assign({}, initialState);

		case 'DELETE_USER_FAILED':
			return Object.assign({}, state, {
				isDeletingUser: false,
			});
	}
	return state;
}
