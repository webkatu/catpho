import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import * as ReactRedux from 'react-redux';
import * as actions from '../actions/signIn.js';
import RequestResultView from '../components/common/RequestResultView.js';

class SignIn extends React.Component {
	componentDidUpdate() {
		if(this.props.signIn.shouldResetForm) {
			const form = ReactDOM.findDOMNode(this.refs.form);
			form.reset();
			this.props.dispatch(actions.resetForm());
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		const form = e.target;
		this.props.dispatch(actions.submit(form));
	}

	handleEmailOrUserNameInputChange(e) {
		const input = e.target;
		this.props.dispatch(actions.inputEmailOrUserName(input.value));
	}

	handlePasswordInputChange(e) {
		const input = e.target;
		this.props.dispatch(actions.inputPassword(input.value));
	}

	render() {
		const signIn = this.props.signIn;
		console.log(signIn);

		const resultView = (signIn.shouldViewResult)
			? <RequestResultView isSuccess={signIn.isSuccess} />
			: null;

		return (
			<div className="signIn" >
				{resultView}
				<form className="signInForm" ref="form" onSubmit={::this.handleSubmit}>
					<input
						type="text"
						className={classnames({error: ! signIn.validationEmailOrUserName})}
						name="emailOrUserName"
						placeholder="メールアドレスまたはユーザー名"
						maxLength={signIn.emailOrUserNameMaxLength}
						onChange={::this.handleEmailOrUserNameInputChange}
					/>
					<input
						type="password"
						className={classnames({error: ! signIn.validationPassword})}
						name="password"
						placeholder="パスワード"
						onChange={::this.handlePasswordInputChange}
					/>
					<input
						type="submit"
						value="サインイン"
						disabled={! signIn.possibleSubmit()}
					/>
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