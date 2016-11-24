export const addFiles = (fileList) => {
	const files = [];
	const selectedImages = [];
	Array.from(fileList).forEach((file, i) => {
		files.push(file);
		selectedImages.push(window.URL.createObjectURL(file));
	});

	return {
		type: 'ADD_FILES',
		files,
		selectedImages,
	}
}

export const deleteSelectedImage = (index) => {
	return {
		type: 'DELETE_SELECTED_IMAGE',
		index,
	}
}

export const inputName = (value) => {
	return {
		type: 'INPUT_NAME',
		value: value.trim(),
	}
};

export const inputAge = (value) => {
	return {
		type: 'INPUT_AGE',
		value: Number(value.trim()),
	}
};

export const inputTag = (_value) => {
	const value = _value.trim();
	const tags = value.split(/[\s ]+/);
	return {
		type: 'INPUT_TAG',
		value,
		tags,
	}
};

export const inputTweet = (value) => {
	return {
		type: 'INPUT_TWEET',
		value: value.trim(),
	}
};

const uploadFile = () => {
	return {
		type: 'UPLOAD_FILE',
	}
};

const uploadFileSuccess = () => {
	return {
		type: 'UPLOAD_FILE_SUCCESS',
	};
};

const uploadFileFailure = () => {
	return {
		type: 'UPLOAD_FILE_FAILURE',
	};
};

export const submit = (path, files, form) => {
	const formData = new FormData(form);
	files.forEach((file) => {
		formData.append('files', file);
	});

	return async (dispatch) => {
		dispatch(uploadFile());

		try {
			var response = await fetch(path, {
				method: 'post',
				body: formData,
			});
			if(! response.ok) throw new TypeError();
		}catch(e) {
			return dispatch(uploadFileFailure());
		}

		const json = await response.json();
		console.log(json);
		dispatch(uploadFileSuccess());
	}
}

export const hideResultView = () => {
	return {
		type: 'HIDE_RESULT_VIEW',
	};
}