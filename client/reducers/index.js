import * as Redux from 'redux';
import * as ReactRouterRedux from 'react-router-redux';
import cookie from 'cookie';
import app from './app.js';
import user from './user.js';
import contents from './contents.js';
import imageListViewer from './imageListViewer.js';
import simpleContentViewer from './simpleContentViewer.js';
import catContent from './catContent.js';
import comment from './comment.js';
import fileUpload from './fileUpload.js';
import signUp from './signUp.js';
import signIn from './signIn.js';
import activation from './activation.js';
import myPage from './myPage.js';
import registrationInformation from './registrationInformation.js';

const catphoApp = Redux.combineReducers({
	app,
	user,
	contents,
	imageListViewer,
	simpleContentViewer,
	catContent,
	comment,
	fileUpload,
	signUp,
	signIn,
	activation,
	myPage,
	registrationInformation,
	routing: ReactRouterRedux.routerReducer,
});

//const catphoApp = imageListViewer;
export default catphoApp;