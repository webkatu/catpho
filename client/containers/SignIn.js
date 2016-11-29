import React from 'react';
import * as ReactRedux from 'react-redux';
import * actions from '../actions/signIn.js';
import RequestResultView from '../components/common/RequestResultView.js'

class SignIn extends React.Component {
	handleSubmit(e) {
		e.preventDefault();
		const form = e.target;
		this.props.onSubmit(form);
	}

	handleIdInputChange(e) {
		const input = e.target;
		this.props.dispatch(actions.inputId(input.value));
	}

	handlePasswordInputChange(e) {
		const input = e.target;
		this.props.dispatch(actions.inputPassword(input.value));
	}

	render() {
		const signIn = this.props.signIn;

		const resultView = (signIn.shouldViewResult)
			? <RequestResultView isSuccess={signIn.isSuccess} />
			: null,

		return (
			<div className="signIn" >
				{resultView}
				<form className="signInForm">
					<input type="text" name="id" />
					<input type="password" name="password" />
					<input type="submit" value="サインイン" disabled={signIn.possibleSubmit()}/>
				</form>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		signIn: state.signIn,
	}
}

export default ReactRedux.connect(mapStateToProps)(SignIn);