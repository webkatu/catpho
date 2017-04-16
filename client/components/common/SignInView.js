import React from 'react';
import SignIn from '../../containers/SignIn.js';

export default class SignInView extends React.Component {
	render() {
		return (
			<div className="signInView">
				<div className="closeArea" onClick={this.props.onCloseAreaClick} />
				<SignIn />
			</div>
		);
	}
}