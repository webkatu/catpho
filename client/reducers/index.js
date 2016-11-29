import * as Redux from 'redux';
import * as ReactRouterRedux from 'react-router-redux';
import imageListViewer from './imageListViewer.js';
import fileUpload from './fileUpload.js';
import signUp from './signUp.js';


const catphoApp = Redux.combineReducers({
	imageListViewer,
	fileUpload,
	signUp,
	routing: ReactRouterRedux.routerReducer,
});

//const catphoApp = imageListViewer;
export default catphoApp;