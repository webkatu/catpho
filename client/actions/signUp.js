export const inputEmail = (value) => {
	return {
		type: 'INPUT_EMAIL@signUp',
		value,
	}
}

export const inputUserName = (value) => {
	return {
		type: 'INPUT_USER_NAME@signUp',
		value,
	}
}

export const inputPassword = (value) => {
	return {
		type: 'INPUT_PASSWORD@signUp',
		value,
	}
}

const requestSignUp = () => {
	return {
		type: 'REQUEST_SIGN_UP',
	}
}

const requestSignUpSuccess = () => {
	return {
		type: 'REQUEST_SIGN_UP_SUCCESS',
	}
}

const requestSignUpFailure = () => {
	return {
		type: 'REQUEST_SIGN_UP_FAILURE',
	}
}

const hideResultView = () => {
	return {
		type: 'HIDE_RESULT_VIEW@signUp',
	}
}


let hideResultViewTimerId = null;
export const submit = (path, form) => {
	const formData = new FormData(form);
	return async (dispatch) => {
		dispatch(requestSignUp());
		try {
			const response = await fetch(path, {
				method: 'post',
				body: formData,
			});
			if(! response.ok) throw new TypeError();
			const json = await response.json();
			if(! json.ok) throw new TypeError();

			dispatch(requestSignUpSuccess());
		}catch(e) {
			dispatch(requestSignUpFailure());
		}

		clearTimeout(hideResultViewTimerId);
		hideResultViewTimerId = setTimeout(() => {
			dispatch(hideResultView());
		}, 5000)
	}
}

export const resetForm = () => {
	return {
		type: 'RESET_FORM@signUp',
	}
}