import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import * as actions from '../actions/signUp.js';
import RequestResultView from '../components/common/RequestResultView.js';

class SignUp extends React.Component {
	componentDidUpdate() {
		if(this.props.signUp.shouldResetForm) {
			const form = ReactDOM.findDOMNode(this.refs.form);
			form.reset();
			this.props.dispatch(actions.resetForm());
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		const form = e.target;
		actions.submit(form);
	}

	handleEmailInputChange(e) {
		const input = e.target;
		this.props.dispatch(actions.inputEmail(input.value))
	}

	handleUserNameInputChange(e) {
		const input = e.target;
		this.props.dispatch(actions.inputUserName(input.value));
	}

	handlePasswordInputChange(e) {
		const input = e.target;
		this.props.dispatch(actions.inputPassword(input.value));
	}

	render() {
		const signUp = this.props.signUp;
		console.log(signUp);

		const resultView = (signUp.shouldViewResult)
			? <RequestResultView isSuccess={signUp.isSuccess} />
			: null;

		return (
			<div className="signUp" >
				{resultView}
				<form className="signUpForm" onSubmit={this.handleSubmit.bind(this)}>
					<input
						type="email"
						name="email"
						placeholder="メールアドレス"
						onChange={this.handleEmailInputChange.bind(this)}
					/>
					<input
						type="text"
						name="userName"
						placeholder="ユーザー名(半角英数字4文字以上)"
						maxLength={signUp.userNameMaxLength}
						onChange={this.handleUserNameInputChange.bind(this)}
					/>
					<input
						type="password"
						name="password"
						placeholder="パスワード(8文字以上)"
						onChange={this.handlePasswordInputChange.bind(this)}
					/>
					<input
						type="submit"
						value="アカウントを作る"
						disabled={! signUp.possibleSubmit()}
					/>
				</form>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		signUp: state.signUp,
	}
}

export default ReactRedux.connect(mapStateToProps)(SignUp);