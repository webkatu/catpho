const initialState = {
	files: [],
	selectedImages: [],
	nameMaxLength: 32,
	ageMax: 38,
	ageMin: 0,
	tagMaxLength: 32,
	tagMaxCount: 3,
	descriptionMaxLength: 140,
	overFileSize: false,
	overNameCount: false,
	overAgeCount: false,
	overTagCount: false,
	overDescriptionCount: false,
	isSelectedFile() {
		return Boolean(this.files.length);
	},
	possibleSubmit() {
		return ! (this.overFileSize
			|| this.overNameCount
			|| this.overAgeCount
			|| this.overTagCount
			|| this.overDescriptionCount
			|| ! this.isSelectedFile());
	},
	actionURI: '/contents',
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
			const removed = newState.selectedImages.splice(action.index, 1)[0];
			window.URL.revokeObjectURL(removed);
			return newState;

		case 'INPUT_NAME':
			return Object.assign({}, state, {
				overNameCount: action.value.length > initialState.nameMaxLength,
			});

		case 'INPUT_AGE':
			return Object.assign({}, state, {
				overAgeCount: (Number.isNaN(action.value)
					|| initialState.ageMax < action.value
					|| initialState.ageMin > action.value)
			});

		case 'INPUT_TAG':
			const allPassed = action.tags.every((tag) => {
				return tag.length <= initialState.tagMaxLength;
			});

			return Object.assign({}, state, {
				overTagCount: (action.tags.length > initialState.tagMaxCount || allPassed === false),
			});

		case 'INPUT_DESCRIPTION':
			return Object.assign({}, state, {
				overDescriptionCount: action.value.length > initialState.descriptionMaxLength,
			});

		case 'UPLOAD_FILE':
			return Object.assign({}, state, {
				isSubmitting: true,
			});

		case 'UPLOAD_FILE_SUCCESS':
			return Object.assign({}, initialState, {
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