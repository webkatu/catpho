export const inputId = (value) => {
	return {
		type: 'INPUT_ID@signIn',
		value,
	}
}

export const inputPassword = (value) => {
	return {
		type: 'INPUT_PASSWORD@signIn',
		value,
	}
}

const requestSignIn = () => {
	return {
		type: 'REQUEST_SIGN_IN',
	}
}

const requestSignInSuccess = () => {
	return {
		type: 'REQUEST_SIGN_IN_SUCCESS',
	}
}

const requestSignInFailure = () => {
	return {
		type: 'REQUEST_SIGN_IN_FAILURE',
	}
}

export const submit = (path, form) => {
	const formData = new FormData(form);
	return async (dispatch) => {
		dispatch(requestSignIn());
		try {
			const response = await fetch(path, {
				method: 'post',
				body: formData,
			});
			if(! response.ok) throw new TypeError();
			const json = await response.json();
			if(! json.ok) throw new TypeError();

			dispatch(requestSignInSuccess());
		}catch(e) {
			dispatch(requestSignInFailure());
		}
	}
}