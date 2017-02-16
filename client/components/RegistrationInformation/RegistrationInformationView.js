import React from 'react';

export default class RegistrationInformationView extends React.Component {
	render() {
		const registrationInformation = this.props.registrationInformation;
		const user = this.props.user;

		const activationButton = (
			<button
				type="button"
				disabled={registrationInformation.isAlreadyRequestingActivation || registrationInformation.isRequestingActivation}
				onClick={this.props.onActivationButtonClick}
			>所有権を確認</button>
		);
		const activationButtonNode = (user.hasActivated)
			? null
			: activationButton;

		const dialog = (
			<aside class="dialog">
				<p>所有権確認のメールを送りました。メールを確認してください。</p>
				<button type="button" onClick={this.props.onDialogCloseButtonClick}>閉じる</button>
			</aside>
		);
		const dialogNode = (
			(registrationInformation.shouldDisplayDialog)
			? dialog
			: null
		);

		return (
			<div className="registrationInformationView">
				<dl>
					<dt>アバター: </dt><dd><img src={user.avatar} alt="" /></dd>
					<dt>ニックネーム: </dt><dd>{user.nickname}</dd>
					<dt>ユーザー名: </dt><dd>{user.userName}</dd>
					<dt>メールアドレス: </dt><dd><span>{user.email}</span>{activationButtonNode}</dd>
				</dl>

				{dialogNode}
				<a href="" onClick={this.props.onEditButtonClick}>登録情報を変更する</a>
				<a href="">退会する</a>
			</div>
		);
	}
}