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

export const inputName = (value, maxLength) => {
	return {
		type: 'INPUT_NAME',
		value: value.trim(),
		maxLength: Number(maxLength),
	}
};

export const inputAge = (value, max, min) => {
	return {
		type: 'INPUT_AGE',
		value: Number(value.trim()),
		max: Number(max),
		min: Number(min),
	}
};

export const inputTag = (_value, maxLength, maxTagCount) => {
	const value = _value.trim();
	const tags = value.split(/[\s ]+/);
	return {
		type: 'INPUT_TAG',
		value,
		tags,
		maxLength: Number(maxLength),
		maxTagCount,
	}
};

export const inputTweet = (value, maxLength) => {
	return {
		type: 'INPUT_TWEET',
		value: value.trim(),
		maxLength: Number(maxLength),
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

const uploadFileFailure = () => {};

export const submit = (path, files, form) => {
	const formData = new FormData(form);
	files.forEach((file) => {
		formData.append('files', file);
	});

	return async (dispatch) => {
		dispatch(uploadFile());

		const response = await fetch(path, {
			method: 'post',
			body: formData,
		});
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