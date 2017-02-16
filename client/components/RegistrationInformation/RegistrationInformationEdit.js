import React from 'react';
import classnames from 'classnames';

export default class RegistrationInformationEdit extends React.Component {
	render() {
		const registrationInformation = this.props.registrationInformation;
		const form = this.props.form;
		const user = this.props.user;
		return (
			<form className="registrationInformationEdit" onSubmit={this.props.onEditFormSubmit}>
				<dl>
					<dt><img src={form.avatarImg} alt="" />アバター: </dt><dd>
						<input 
							type="file"
							name="avatar"
							onChange={this.props.onAvatarChange}
						/>
					</dd>
					<dt>ニックネーム: </dt><dd>
						<input
							className={classnames({
								error: ! registrationInformation.validationNickname
							})}
							type="text"
							name="nickname"
							value={form.nickname}
							onChange={this.props.onNicknameChange}
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
							onChange={this.props.onEmailChange}
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
							onChange={this.props.onCurrentPasswordChange}
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
							onChange={this.props.onPasswordChange}
						/>
					</dd>
					<dt>新しいパスワード(確認): </dt><dd>
						<input
							className={classnames({
								error: ! registrationInformation.validationRePassword
							})}
							type="password"
							value={form.rePassword}
							onChange={this.props.onRePasswordChange}
						/>
					</dd>
				</dl>
				<button
					type="submit"
					value="submit"
					disabled={! registrationInformation.possibleSubmit()}
				>変更する</button>
			</form>
		);
	}
}