import React from 'react';
import * as ReactRedux from 'react-redux';
import SignIn from './SignIn.js';

class UserOnly extends React.Component {
	render() {
		const component = (this.props.isSignedIn)
			? this.props.children
			: <SignIn />;

		return component;
	}
}

function mapStateToProps(state) {
	return {
		isSignedIn: state.app.isSignedIn,
	};
}

export default ReactRedux.connect(mapStateToProps)(UserOnly);