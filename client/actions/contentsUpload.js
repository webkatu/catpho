import config from '../config.js';

export const addFiles = (fileList) => {
	return {
		type: 'ADD_FILES@contentsUpload',
		payload: { fileList }
	}
}

export const deleteFile = (index) => {
	return {
		type: 'DELETE_FILE@contentsUpload',
		payload: { index },
	}
}

export const inputName = (value) => {
	return {
		type: 'INPUT_NAME@contentsUpload',
		payload: { name: value },
	}
};

export const inputAge = (value) => {
	return {
		type: 'INPUT_AGE@contentsUpload',
		payload: { age: value },
	}
};

export const inputTag = (value) => {
	return {
		type: 'INPUT_TAG@contentsUpload',
		payload: { tag: value },
	}
};

export const inputDescription = (value) => {
	return {
		type: 'INPUT_DESCRIPTION@contentsUpload',
		payload: { description: value },
	}
};

const _postContents = () => {
	return {
		type: 'POST_CONTENTS',
	}
};

const postContentsSuccess = () => {
	return {
		type: 'POST_CONTENTS_SUCCESS',
	};
};

const postContentsFailed = () => {
	return {
		type: 'POST_CONTENTS_FAILED',
	};
};

export const postContents = (form, files) => {
	const formData = new FormData(form);
	files.forEach((file) => {
		formData.append('files', file);
	});
	formData.append('userToken', localStorage.getItem('userToken'));

	return async (dispatch) => {
		dispatch(_postContents());

		try {
			const response = await fetch(config.apiServer + '/contents', {
				method: 'POST',
				mode: 'cors',
				body: formData,
			});
			if(! response.ok) throw new TypeError();
			dispatch(postContentsSuccess());
			form.reset();
			return;
		}catch(e) {
			return dispatch(postContentsFailed());
		}

	}
}