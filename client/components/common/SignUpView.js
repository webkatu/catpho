import React from 'react';
import SignUp from '../../containers/SignUp.js';

export default class SignUpView extends React.Component {
	render() {
		return (
			<div className="signUpView">
				<div className="closeArea" onClick={this.props.onCloseAreaClick} />
				<SignUp />
			</div>
		);
	}
}