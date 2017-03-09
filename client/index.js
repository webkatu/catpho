import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';
import * as ReactRouter from 'react-router';
import * as ReactRouterRedux from 'react-router-redux';
import thunk from 'redux-thunk';
import catphoApp from './reducers/index.js';
import App from './containers/App.js';
import NotFound from './components/NotFound.js';
import Contents from './containers/Contents.js';
import ImageListViewer from './containers/ImageListViewer.js';
import FileUpload from './containers/FileUpload.js';
import SignUp from './containers/SignUp.js';
import SignIn from './containers/SignIn.js';
import Activation from './containers/Activation.js';
import MyPage from './containers/MyPage.js';
import RegistrationInformation from './containers/RegistrationInformation.js';
import MyPosts from './containers/MyPosts.js';
import Favorites from './containers/Favorites.js';
import MyComments from './containers/MyComments.js';
import UserOnly from './containers/UserOnly.js';

const store = Redux.createStore(
	catphoApp,
	Redux.applyMiddleware(thunk),
	Redux.compose(Redux.applyMiddleware(ReactRouterRedux.routerMiddleware(ReactRouter.browserHistory)))
);
console.log(store.getState());

const history = ReactRouterRedux.syncHistoryWithStore(ReactRouter.browserHistory, store);

const routes = (
	<ReactRouter.Route path="/" component={App}>
		<ReactRouter.IndexRoute component={Contents} />
		<ReactRouter.Route path="test" component={Contents} />
		<ReactRouter.Route path="upload" component={FileUpload} />
		<ReactRouter.Route path="signup" component={SignUp} />
		<ReactRouter.Route path="signIn" component={SignIn} />
		<ReactRouter.Route component={UserOnly}>
			<ReactRouter.Route path="activation/*" component={Activation} />
			<ReactRouter.Route path="mypage" component={MyPage}>
				<ReactRouter.IndexRoute component={RegistrationInformation} />
				<ReactRouter.Route path="myposts" component={MyPosts} />
				<ReactRouter.Route path="favorites" component={Favorites} />
				<ReactRouter.Route path="mycomments" component={MyComments} />
			</ReactRouter.Route>
		</ReactRouter.Route>
		<ReactRouter.Route path="*" component={NotFound} />
	</ReactRouter.Route>
);

ReactDOM.render(
	<ReactRedux.Provider store={store}>
		<ReactRouter.Router routes={routes} history={history} />
	</ReactRedux.Provider>,
	document.getElementById('app')
);