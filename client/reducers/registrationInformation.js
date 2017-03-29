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
	validationAvatar: true,
	validationNickname: true,
	validationEmail: true,
	validationCurrentPassword: true,
	validationPassword: true,
	validationRePassword: true,
	isPatching: false,
	possibleSubmit() {
		return (
			this.validationAvatar &&
			this.validationNickname &&
			this.validationEmail &&
			this.validationCurrentPassword &&
			this.validationPassword &&
			this.validationRePassword &&
			! this.isPatching
		);
	},
	shouldDisplayWithdrawalDialog: false,
	didConfirmToWithdraw: false,
	isDeletingUser: false,
	didWithdraw: false,
}

export default (state = initialState, action) => {
	switch(action.type) {
		case 'MOUNT@registrationInformation':
			window.URL.revokeObjectURL(state.form.avatarImg);
			return Object.assign({}, initialState);

		case 'REQUEST_ACTIVATION':
			return Object.assign({}, state, {
				isRequestingActivation: true,
			});

		case 'REQUEST_ACTIVATION_SUCCESS':
			return Object.assign({}, state, {
				isRequestingActivation: false,
				shouldDisplayActivationDialog: true,
				isAlreadyRequestingActivation: true,
			});

		case 'REQUEST_ACTIVATION_FAILED':
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
			console.log(file);
			if(file instanceof File) {
				return Object.assign({}, state, {
					form: {
						...state.form,
						avatarImg: window.URL.createObjectURL(file),
						avatar: file,
					},
					validationAvatar: validator.validateImageFile(file),
				});
			}else {
				return Object.assign({}, state, {
					form: {
						...state.form,
						avatarImg: state.form.currentAvatarImg,
						avatar: '',
					},
					validationAvatar: true,
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
					validationAvatar: true,
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
					validationAvatar: true,
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
				validationNickname: validator.validateNickname(nickname) || nickname.trim() === '',

			});

		case 'INPUT_EMAIL@registrationInformation':
			const email = action.payload.email;
			return Object.assign({}, state, {
				form: {
					...state.form,
					email,
				},
				validationEmail: validator.validateEmail(email) || email.trim() === '',
			});

		case 'INPUT_CURRENT_PASSWORD@registrationInformation':
			const currentPassword = action.payload.currentPassword;
			return Object.assign({}, state, {
				form: {
					...state.form,
					currentPassword,
				},
				validationCurrentPassword: validator.validatePassword(currentPassword) || (currentPassword === '' && state.form.password === ''),
			});

		case 'INPUT_PASSWORD@registrationInformation':
			const password = action.payload.password;
			return Object.assign({}, state, {
				form: {
					...state.form,
					password,
				},
				validationCurrentPassword: (state.form.currentPassword === '' && password === '') ? true : (state.form.currentPassword === '' && password !== '') ? false : state.validationCurrentPassword,
				validationPassword: validator.validatePassword(password) || password === '',
				validationRePassword: password === state.form.rePassword,
			});

		case 'INPUT_RE_PASSWORD@registrationInformation':
			const rePassword = action.payload.rePassword;
			return Object.assign({}, state, {
				form: {
					...state.form,
					rePassword,
				},
				validationRePassword: state.form.password === rePassword,
			});

		case 'PATCH_REGISTRATION_INFORMATION':
			return Object.assign({}, state, {
				isPatching: true,
			});

		case 'PATCH_REGISTRATION_INFORMATION_SUCCESS':
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

		case 'DELETE_USER_SUCCESS':
			return Object.assign({}, state, {
				isDeletingUser: false,
				didWithdraw: true,
			});

		case 'DELETE_USER_FAILED':
			return Object.assign({}, state, {
				isDeletingUser: false,
			});

		case 'MOVE_TO_HOME@registrationInformation':
			return Object.assign({}, initialState);
	}
	return state;
}
