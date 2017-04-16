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
		document.title = this.props.app.title;
		return (
			<div>
				<Notification />
				<div id="headerOuter">
					<Header />
				</div>
				<div id="content">
					{this.props.children}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		app: state.app,
	};
}

export default ReactRedux.connect(mapStateToProps)(App);