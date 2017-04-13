import * as Redux from 'redux';
import * as ReactRouterRedux from 'react-router-redux';
import cookie from 'cookie';
import app from './app.js';
import myUser from './myUser.js';
import tags from './tags.js';
import notification from './notification.js';
import header from './header.js';
import user from './user.js';
import contents from './contents.js';
import imageListViewer from './imageListViewer.js';
import simpleImageListViewer from './simpleImageListViewer.js';
import simpleContentViewer from './simpleContentViewer.js';
import contentViewer from './contentViewer.js';
import catContent from './catContent.js';
import comment from './comment.js';
import contentsUpload from './contentsUpload.js';
import signUp from './signUp.js';
import signIn from './signIn.js';
import passwordReissueRequest from './passwordReissueRequest.js';
import passwordReissue from './passwordReissue.js';
import activation from './activation.js';
import myPage from './myPage.js';
import registrationInformation from './registrationInformation.js';

const catphoApp = Redux.combineReducers({
	app,
	myUser,
	tags,
	notification,
	header,
	user,
	contents,
	imageListViewer,
	simpleImageListViewer,
	simpleContentViewer,
	contentViewer,
	catContent,
	comment,
	contentsUpload,
	signUp,
	signIn,
	passwordReissueRequest,
	passwordReissue,
	activation,
	myPage,
	registrationInformation,
	routing: ReactRouterRedux.routerReducer,
});

//const catphoApp = imageListViewer;
export default catphoApp;