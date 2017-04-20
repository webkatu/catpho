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
		this.props.dispatch(actions.patchRegistrationInformation(e.target, this.props.myUser.userName));
	}

	handleQuittingButtonClick(e) {
		if(this.props.registrationInformation.isPatching) return;
		this.props.dispatch(actions.mount());
	}

	render() {
		const registrationInformation = this.props.registrationInformation;
		const form = this.props.form;
		const myUser = this.props.myUser;
		return (
			<form className="registrationInformationEdit" onSubmit={::this.handleSubmit}>
				<dl>
					<div>
						<dt>アバター:</dt>
						<dd className="avatar">
							<input 
								className={classnames({
									error: ! registrationInformation.validAvatar
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
					</div>
					<div>
						<dt>ニックネーム:</dt>
						<dd>
							<input
								className={classnames({
									error: ! registrationInformation.validNickname
								})}
								type="text"
								name="nickname"
								value={form.nickname}
								onChange={::this.handleNicknameChange}
							/>
						</dd>
					</div>
					<div>
						<dt>ユーザー名:</dt>
						<dd>
							<input
								type="text"
								disabled={true}
								defaultValue={myUser.userName}
							/>
						</dd>
					</div>
					<div>
						<dt>メールアドレス:</dt>
						<dd>
							<input
								className={classnames({
									error: ! registrationInformation.validEmail
								})}
								type="email"
								name="email"
								value={form.email}
								onChange={::this.handleEmailChange}
							/>
						</dd>
					</div>
					<div>
						<dt>現在のパスワード:</dt>
						<dd>
							<input
								className={classnames({
									error: ! registrationInformation.validCurrentPassword
								})}
								type="password"
								name="currentPassword"
								value={form.currentPassword}
								onChange={::this.handleCurrentPasswordChange}
							/>
						</dd>
					</div>
					<div>
						<dt>新しいパスワード:</dt>
						<dd>
							<input
								className={classnames({
									error: ! registrationInformation.validPassword
								})}
								type="password"
								name="password"
								value={form.password}
								onChange={::this.handlePasswordChange}
							/>
						</dd>
					</div>
					<div>
						<dt>新しいパスワード(確認):</dt>
						<dd>
							<input
								className={classnames({
									error: ! registrationInformation.validRePassword
								})}
								type="password"
								value={form.rePassword}
								onChange={::this.handleRePasswordChange}
							/>
						</dd>
					</div>
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
		myUser: state.myUser,
	};
}

export default ReactRedux.connect(mapStateToProps)(RegistrationInformationEdit);