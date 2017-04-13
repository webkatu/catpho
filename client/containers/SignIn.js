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
		if(this.props.passwordReissueRequest.shouldResetForm) {
			const form = ReactDOM.findDOMNode(this.refs.passwordReissueForm);
			form.reset();
			this.props.dispatch(actions.resetPasswordReissueForm());
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

	handlePasswordReissueAnchorClick(e) {
		e.preventDefault();
		this.props.dispatch(actions.togglePasswordReissueForm());
	}

	handlePasswordReissueFormSubmit(e) {
		e.preventDefault();
		this.props.dispatch(actions.requestPasswordReissueRequest(e.target));
	}

	handleEmailInputChange(e) {
		this.props.dispatch(actions.inputEmail(e.target.value));
	}

	render() {
		const signIn = this.props.signIn;
		const passwordReissueRequest =  this.props.passwordReissueRequest;

		const passwordReissueForm = (
			<form onSubmit={::this.handlePasswordReissueFormSubmit} ref="passwordReissueForm">
				<p>パスワードを再発行できます。以下のフォームにメールアドレスを入力して再発行のリクエストをしてください。</p>
				<input
					type="email"
					className={classnames({
						error: ! passwordReissueRequest.validEmail
					})}
					name="email"
					placeholder="メールアドレス"
					maxLength={passwordReissueRequest.emailMaxLength}
					value={passwordReissueRequest.email}
					onChange={::this.handleEmailInputChange}
				/>
				<button
					type="submit"
					disabled={! passwordReissueRequest.possibleSubmit()}
				>再発行のメールを送信	</button>
			</form>
		);

		const passwordReissueFormNode = (
			(signIn.shouldDisplayPasswordReissueForm)
			? passwordReissueForm
			: null
		);

		return (
			<div className="signIn" >
				<form className="signInForm" ref="form" onSubmit={::this.handleSubmit}>
					<input
						type="text"
						className={classnames({error: ! signIn.validEmailOrUserName})}
						name="emailOrUserName"
						placeholder="メールアドレスまたはユーザー名"
						maxLength={signIn.emailOrUserNameMaxLength}
						value={signIn.emailOrUserName}
						onChange={::this.handleEmailOrUserNameInputChange}
					/>
					<input
						type="password"
						className={classnames({error: ! signIn.validPassword})}
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
				<a onClick={::this.handlePasswordReissueAnchorClick}>パスワードを忘れましたか?</a>
				{passwordReissueFormNode}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		signIn: state.signIn,
		passwordReissueRequest: state.passwordReissueRequest,
	}
}

export default ReactRedux.connect(mapStateToProps)(SignIn);