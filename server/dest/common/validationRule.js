'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	nameMaxLength: 32,
	ageMax: 38,
	ageMin: 0,
	tagMaxLength: 32,
	tagMaxCount: 3,
	descriptionMaxLength: 140,
	emailMaxLength: 255,
	emailPattern: /^(?!.*\s).+@.+/,
	userNameMinLength: 4,
	userNameMaxLength: 32,
	userNamePattern: /^[a-zA-Z0-9]+$/,
	nicknameMaxLength: 32,
	nicknamePattern: /^(?!.*\s).+$/,
	passwordMinLength: 8,
	passwordMaxLength: 64,
	passwordPattern: /^[a-zA-Z0-9!-/:-@¥[-`{-~]+$/,
	commentMaxLength: 1024,
	fileMaxSize: Math.pow(Math.pow(2, 10), 2) * 2, //20MB;
	fileMaxLength: 10,
	allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif']
};