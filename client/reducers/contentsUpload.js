import validator from '../common/validator.js';

const initialState = {
	files: [],
	name: '',
	age: '',
	tag: '',
	description: '',
	allowedImageTypes: validator.rule.allowedImageTypes,
	ageMin: validator.rule.ageMin,
	ageMax: validator.rule.ageMax,
	descriptionMaxLength: validator.rule.descriptionMaxLength,
	validationFile: false,
	validationName: true,
	validationAge: true,
	validationTag: true,
	validationDescription: true,
	possibleSubmit() {
		return this.validationFile
			&& this.validationName
			&& this.validationAge
			&& this.validationTag
			&& this.validationDescription
			&& ! this.isPosting;
	},
	isPosting: false,
}

export default (state = initialState, action) => {
	switch(action.type) {
		case 'ADD_FILES@contentsUpload': {
			const files = [...state.files];

			Array.from(action.payload.fileList, (file) => {
				if(! validator.validateImageFile(file)) return;
				file.url = window.URL.createObjectURL(file);
				files.push(file);
			});
			if(files.length > validator.rule.filesMaxLength) {
				files.splice(validator.rule.filesMaxLength);
			}

			return Object.assign({}, state, {
				files,
				validationFile: Boolean(files.length),
			});
		}

		case 'DELETE_FILE@contentsUpload': {
			const files = [...state.files];
			const removed = files.splice(action.payload.index, 1);
			window.URL.revokeObjectURL(removed[0].url);

			return Object.assign({}, state, {
				files,
				validationFile: Boolean(files.length),
			});
		}

		case 'INPUT_NAME@contentsUpload':
			return Object.assign({}, state, {
				name: action.payload.name,
				validationName: validator.validateName(action.payload.name),
			});

		case 'INPUT_AGE@contentsUpload':
			return Object.assign({}, state, {
				age: action.payload.age,
				validationAge: validator.validateAge(action.payload.age),
			});

		case 'INPUT_TAG@contentsUpload':
			return Object.assign({}, state, {
				tag: action.payload.tag,
				validationTag: validator.validateTag(action.payload.tag),
			});

		case 'INPUT_DESCRIPTION@contentsUpload':
			return Object.assign({}, state, {
				description: action.payload.description,
				validationDescription: validator.validateDescription(action.payload.description),
			});

		case 'POST_CONTENTS':
			return Object.assign({}, state, {
				isPosting: true,
			});

		case 'POST_CONTENTS_SUCCESS':
			state.files.forEach((file) => {
				window.URL.revokeObjectURL(file.url);
			});
			return Object.assign({}, initialState, {
				isPosting: false,
			});

		case 'POST_CONTENTS_FAILED':
			return Object.assign({}, state, {
				isPosting: false,
			});

	}
	return state;
}
