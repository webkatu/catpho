import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from '../actions/app.js';

class App extends React.Component {
	componentWillMount() {
		if(localStorage.getItem('userToken') === null) return;
		this.props.dispatch(actions.requestSignIn());
	}
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

export default ReactRedux.connect()(App);