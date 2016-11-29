import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';
import * as ReactRouter from 'react-router';
import * as ReactRouterRedux from 'react-router-redux';
import thunk from 'redux-thunk';
import catphoApp from './reducers/index.js';
import App from './components/App.js';
import NotFound from './components/NotFound.js';
import ImageListViewer from './containers/ImageListViewer.js';
import FileUpload from './containers/FileUpload.js';
import SignUp from './containers/SignUp.js';

const store = Redux.createStore(
	catphoApp,
	Redux.applyMiddleware(thunk),
	Redux.compose(Redux.applyMiddleware(ReactRouterRedux.routerMiddleware(ReactRouter.browserHistory)))
);
console.log(store.getState());

const history = ReactRouterRedux.syncHistoryWithStore(ReactRouter.browserHistory, store);

const routes = (<ReactRouter.Route path="/" component={App}>
				<ReactRouter.IndexRoute component={ImageListViewer} />
				<ReactRouter.Route path="test" component={ImageListViewer} />
				<ReactRouter.Route path="upload" component={FileUpload} />
				<ReactRouter.Route path="signup" component={SignUp} />
				<ReactRouter.Route path="*" component={NotFound} />
			</ReactRouter.Route>)

ReactDOM.render(
	<ReactRedux.Provider store={store}>
		<ReactRouter.Router routes={routes} history={history} />
	</ReactRedux.Provider>,
	document.getElementById('app')
);