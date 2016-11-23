const initialState = {
	files: [],
	selectedImages: [],
	maxTagCount: 3,
	tweetMaxLength: 140,
	overFileSize: false,
	overNameCount: false,
	overAgeCount: false,
	overTagCount: false,
	overTweetCount: false,
	isSelectedFile() {
		return Boolean(this.files.length);
	},
	possibleSubmit() {
		return ! (this.overFileSize
			|| this.overNameCount
			|| this.overAgeCount
			|| this.overTagCount
			|| this.overTweetCount
			|| ! this.isSelectedFile());
	},
	actionURI: location.origin + '/upload/',
	isSubmitting: false,
	shouldViewResult: false,
	isSuccess: null,
}

const fileUpload = (state = initialState, action) => {
	switch(action.type) {
		case 'ADD_FILES':
			return Object.assign({}, state, {
				files: [...state.files, ...action.files],
				selectedImages: [...state.selectedImages, ...action.selectedImages],
			});

		case 'DELETE_SELECTED_IMAGE':
			const newState = Object.assign({}, state);
			newState.files.splice(action.index, 1);
			const removed = newState.selectedImages.splice(action.index, 1);
			window.URL.revokeObjectURL(removed);
			return newState;

		case 'INPUT_NAME':
			return Object.assign({}, state, {
				overNameCount: action.value.length > action.maxLength,
			});

		case 'INPUT_AGE':
			return Object.assign({}, state, {
				overAgeCount: (Number.isNaN(action.value)
					|| action.max < action.value
					|| action.min > action.value)
			});

		case 'INPUT_TAG':
			return Object.assign({}, state, {
				overTagCount: (action.value.length > action.maxLength
					|| action.tags.length > action.maxTagCount),
			});

		case 'INPUT_TWEET':
			return Object.assign({}, state, {
				overTweetCount: action.value.length > action.maxLength,
			});

		case 'UPLOAD_FILE':
			return Object.assign({}, state, {
				isSubmitting: true,
			});

		case 'UPLOAD_FILE_SUCCESS':
			return Object.assign({}, state, {
				isSubmitting: false,
				shouldViewResult: true,
				isSuccess: true,
			});

		case 'UPLOAD_FILE_FAILURE':
			return Object.assign({}, state, {
				isSubmitting: false,
				shouldViewResult: true,
				isSuccess: false,
			});

		case 'HIDE_RESULT_VIEW':
			return Object.assign({}, state, {
				shouldViewResult: false,
			});
	}
	return state;
}

export default fileUpload;