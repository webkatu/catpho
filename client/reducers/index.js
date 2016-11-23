import * as Redux from 'redux';
import * as ReactRouterRedux from 'react-router-redux';
import imageListViewer from './imageListViewer.js';
import fileUpload from './fileUpload.js';


const catphoApp = Redux.combineReducers({
	imageListViewer,
	fileUpload,
	routing: ReactRouterRedux.routerReducer,
});

//const catphoApp = imageListViewer;
export default catphoApp;