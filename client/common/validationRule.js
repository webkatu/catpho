export default {
	postCommentTextMaxLength: 1024,
	emailMaxLength: 255,
	emailPattern: /^.+@.+/,
	userNameMinLength: 4,
	userNameMaxLength: 32,
	userNamePattern: /^[a-zA-Z0-9]+$/,
	nicknameMaxLength: 32,
	passwordMinLength: 8,
	passwordMaxLength: 64,
	passwordPattern: /^[a-zA-Z0-9!-/:-@¥[-`{-~]+$/,
	filesMaxLength: 10,
	fileMaxSize: (2 ** 10) ** 2 * 2, //20MB
	allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif'],
	nameMaxLength: 32,
	ageMax: 38,
	ageMin: 0,
	tagMaxLength: 64,
	tagMaxCount: 3,
	descriptionMaxLength: 140
}