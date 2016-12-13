import * as Redux from 'redux';
import * as ReactRouterRedux from 'react-router-redux';
import cookie from 'cookie';
import app from './app.js';
import user from './user.js';
import imageListViewer from './imageListViewer.js';
import fileUpload from './fileUpload.js';
import signUp from './signUp.js';
import signIn from './signIn.js';
import activation from './activation.js';

const catphoApp = Redux.combineReducers({
	app,
	user,
	imageListViewer,
	fileUpload,
	signUp,
	signIn,
	activation,
	routing: ReactRouterRedux.routerReducer,
});

//const catphoApp = imageListViewer;
export default catphoApp;	