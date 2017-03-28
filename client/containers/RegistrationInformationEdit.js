import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactRedux from 'react-redux';
import classnames from 'classnames';
import * as actions from '../actions/registrationInformation.js';

class RegistrationInformationEdit extends React.Component {
	handleAvatarChange(e) {
		this.props.dispatch(actions.inputAvatar(e.target.files[0]));
	}

	handleRestoringAvatarChange(e) {
		ReactDOM.findDOMNode(this.refs.avatar).value = '';
		this.props.dispatch(actions.toggleRestoringAvatar());
	}

	handleNicknameChange(e) {
		this.props.dispatch(actions.inputNickname(e.target.value));
	}

	handleEmailChange(e) {
		this.props.dispatch(actions.inputEmail(e.target.value));
	}

	handleCurrentPasswordChange(e) {
		this.props.dispatch(actions.inputCurrentPassword(e.target.value));
	}

	handlePasswordChange(e) {
		this.props.dispatch(actions.inputPassword(e.target.value));
	}

	handleRePasswordChange(e) {
		this.props.dispatch(actions.inputRePassword(e.target.value));
	}

	handleSubmit(e) {
		e.preventDefault();
		if(this.props.registrationInformation.isPatching) return;
		this.props.dispatch(actions.patchRegistrationInformation(e.target, this.props.user.userName));
	}

	handleQuittingButtonClick(e) {
		if(this.props.registrationInformation.isPatching) return;
		this.props.dispatch(actions.mount());
	}

	render() {
		const registrationInformation = this.props.registrationInformation;
		const form = this.props.form;
		const user = this.props.user;
		return (
			<form className="registrationInformationEdit" onSubmit={::this.handleSubmit}>
				<dl>
					<dt>アバター: </dt><dd>
						<input 
							className={classnames({
								error: ! registrationInformation.validationAvatar
							})}
							type="file"
							name="avatar"
							accept={form.allowedImageTypes.join()}
							disabled={form.avatarDisabled}
							onChange={::this.handleAvatarChange}
							ref="avatar"
						/>
						<label>
							<input
								type="checkbox"
								name="restoringAvatar"
								checked={form.restoringAvatarChecked}
								value="checked"
								onChange={::this.handleRestoringAvatarChange}
							/>
							<span>初期アバターに戻す</span>
						</label>
						<img src={form.avatarImg} alt="" />
					</dd>
					<dt>ニックネーム: </dt><dd>
						<input
							className={classnames({
								error: ! registrationInformation.validationNickname
							})}
							type="text"
							name="nickname"
							value={form.nickname}
							onChange={::this.handleNicknameChange}
						/>
					</dd>
					<dt>ユーザー名: </dt><dd>
						<input
							type="text"
							disabled={true}
							defaultValue={user.userName}
						/>
					</dd>
					<dt>メールアドレス: </dt><dd>
						<input
							className={classnames({
								error: ! registrationInformation.validationEmail
							})}
							type="email"
							name="email"
							value={form.email}
							onChange={::this.handleEmailChange}
						/>
					</dd>
					<dt>現在のパスワード: </dt><dd>
						<input
							className={classnames({
								error: ! registrationInformation.validationCurrentPassword
							})}
							type="password"
							name="currentPassword"
							value={form.currentPassword}
							onChange={::this.handleCurrentPasswordChange}
						/>
					</dd>
					<dt>新しいパスワード: </dt><dd>
						<input
							className={classnames({
								error: ! registrationInformation.validationPassword
							})}
							type="password"
							name="password"
							value={form.password}
							onChange={::this.handlePasswordChange}
						/>
					</dd>
					<dt>新しいパスワード(確認): </dt><dd>
						<input
							className={classnames({
								error: ! registrationInformation.validationRePassword
							})}
							type="password"
							value={form.rePassword}
							onChange={::this.handleRePasswordChange}
						/>
					</dd>
				</dl>
				<button
					type="submit"
					value="submit"
					disabled={! registrationInformation.possibleSubmit()}
				>変更する</button>
				<button
					type="button"
					onClick={::this.handleQuittingButtonClick}
				>変更をやめる</button>
			</form>
		);
	}
}

function mapStateToProps(state) {
	return {
		registrationInformation: state.registrationInformation,
		form: state.registrationInformation.form,
		user: state.user,
	};
}

export default ReactRedux.connect(mapStateToProps)(RegistrationInformationEdit);