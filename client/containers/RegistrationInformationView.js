import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from '../actions/registrationInformation.js';

class RegistrationInformationView extends React.Component {
	handleActivationButtonClick() {
		if(this.props.registrationInformation.isRequestingActivation) return;
		if(this.props.registrationInformation.isAlreadyRequestingActivation) return;

		this.props.dispatch(actions.requestActivation(this.props.user.email));
	}

	handleDialogCloseButtonClick() {
		this.props.dispatch(actions.closeDialog());
	}

	handleEditButtonClick(e) {
		e.preventDefault();
		this.props.dispatch(actions.startEdit(this.props.user));
	}

	render() {
		const registrationInformation = this.props.registrationInformation;
		const user = this.props.user;

		const activationButton = (
			<button
				type="button"
				disabled={registrationInformation.isAlreadyRequestingActivation || registrationInformation.isRequestingActivation}
				onClick={::this.handleActivationButtonClick}
			>所有権を確認</button>
		);
		const activationButtonNode = (user.hasBeenActivated)
			? <span>認証済み</span>
			: activationButton;

		const dialog = (
			<aside class="dialog">
				<p>所有権確認のメールを送りました。メールを確認してください。</p>
				<button type="button" onClick={::this.handleDialogCloseButtonClick}>閉じる</button>
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
				<a href="" onClick={::this.handleEditButtonClick}>登録情報を変更する</a>
				<a href="">退会する</a>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		registrationInformation: state.registrationInformation,
		user: state.user,
	}
}

export default ReactRedux.connect(mapStateToProps)(RegistrationInformationView);