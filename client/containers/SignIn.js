import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import * as ReactRedux from 'react-redux';
import * as actions from '../actions/signIn.js';

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
		this.props.dispatch(actions.signIn(form));
	}

	handleEmailOrUserNameInputChange(e) {
		this.props.dispatch(actions.inputEmailOrUserName(e.target.value));
	}

	handlePasswordInputChange(e) {
		this.props.dispatch(actions.inputPassword(e.target.value));
	}

	render() {
		const signIn = this.props.signIn;

		return (
			<div className="signIn" >
				<form className="signInForm" ref="form" onSubmit={::this.handleSubmit}>
					<input
						type="text"
						className={classnames({error: ! signIn.validationEmailOrUserName})}
						name="emailOrUserName"
						placeholder="メールアドレスまたはユーザー名"
						maxLength={signIn.emailOrUserNameMaxLength}
						value={signIn.emailOrUserName}
						onChange={::this.handleEmailOrUserNameInputChange}
					/>
					<input
						type="password"
						className={classnames({error: ! signIn.validationPassword})}
						name="password"
						placeholder="パスワード"
						value={signIn.password}
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