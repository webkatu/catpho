import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import * as ReactRedux from 'react-redux';
import * as actions from '../actions/signUp.js';

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
		this.props.dispatch(actions.signUp(e.target));
	}

	handleEmailInputChange(e) {
		this.props.dispatch(actions.inputEmail(e.target.value))
	}

	handleUserNameInputChange(e) {
		this.props.dispatch(actions.inputUserName(e.target.value));
	}

	handlePasswordInputChange(e) {
		this.props.dispatch(actions.inputPassword(e.target.value));
	}

	render() {
		const signUp = this.props.signUp;

		return (
			<div className="signUp" >
				<form className="signUpForm" onSubmit={::this.handleSubmit} ref="form">
					<input
						type="email"
						className={classnames({error: ! signUp.validationEmail})}
						name="email"
						placeholder="メールアドレス"
						maxLength={signUp.emailMaxLength}
						onChange={::this.handleEmailInputChange}
					/>
					<input
						type="text"
						className={classnames({error: ! signUp.validationUserName})}
						name="userName"
						placeholder="ユーザー名(半角英数字4文字以上)"
						maxLength={signUp.userNameMaxLength}
						onChange={::this.handleUserNameInputChange}
					/>
					<input
						type="password"
						className={classnames({error: ! signUp.validationPassword})}
						name="password"
						placeholder="パスワード(8文字以上)"
						onChange={::this.handlePasswordInputChange}
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