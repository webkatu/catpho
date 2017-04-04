import React from 'react';
import * as ReactRedux from 'react-redux';
import * as signInActions from '../actions/signIn.js';
import Notification from './Notification.js';
import Header from './Header.js';

class App extends React.Component {
	componentWillMount() {
		if(localStorage.getItem('userToken') === null) return;
		this.props.dispatch(signInActions.signIn());
	}
	render() {
		return (
			<div>
				<Notification />
				<Header />
				{this.props.children}
			</div>
		);
	}
}

export default ReactRedux.connect()(App);