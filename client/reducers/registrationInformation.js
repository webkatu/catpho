import Validator from '../common/Validator.js';
const validator = new Validator();

const initialState = {
	form: {
		avatarImg: '',
		avatar: '',
		nickname: '',
		email: '',
		currentPassword: '',
		password: '',
		rePassword: '',
	},
	isRequestingActivation: false,
	isAlreadyRequestingActivation: false,
	shouldDisplayDialog: false,
	isEditMode: false,
	validationNickname: true,
	validationEmail: true,
	validationCurrentPassword: true,
	validationPassword: true,
	validationRePassword: true,
	isPatching: false,
	possibleSubmit() {
		return (
			this.validationNickname &&
			this.validationEmail &&
			this.validationCurrentPassword &&
			this.validationPassword &&
			this.validationRePassword &&
			! this.isPatching
		);
	},
}

export default (state = initialState, action) => {
	switch(action.type) {
		case 'REQUEST_ACTIVATION':
			return Object.assign({}, state, {
				isRequestingActivation: true,
			});

		case 'REQUEST_ACTIVATION_SUCCESS':
			return Object.assign({}, state, {
				isRequestingActivation: false,
				shouldDisplayDialog: true,
				isAlreadyRequestingActivation: true,
			});

		case 'REQUEST_ACTIVATION_FAILED':
			return Object.assign({}, state, {
				isRequestingActivation: false,
			});

		case 'CLOSE_DIALOG@registrationInformation':
			return Object.assign({}, state, {
				shouldDisplayDialog: false,
			});

		case 'START_EDIT':
			return Object.assign({}, state, {
				isEditMode: true,
				form: {
					...state.form,
					avatarImg: action.payload.avatar,
					nickname: action.payload.nickname,
					email: action.payload.email,
				}
			});

		case 'INPUT_AVATAR@registrationInformation':
			return Object.assign({}, state, {
				form: {
					...state.form,
					avatar: action.payload.file,
				},
			});

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
			return Object.assign({}, initialState);

		case 'PATCH_REGISTRATION_INFORMATION_FAILED':
			return Object.assign({}, state, {
				isPatching: false,
			});
	}
	return state;
}