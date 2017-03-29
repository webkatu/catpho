import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from '../actions/registrationInformation.js';

class RegistrationInformationView extends React.Component {
	componentDidUpdate() {
		if(this.props.registrationInformation.didWithdraw) {
			this.props.dispatch(actions.moveToHome());
			this.context.router.push('/');
		}
	}

	handleActivationButtonClick() {
		if(this.props.registrationInformation.isRequestingActivation) return;
		if(this.props.registrationInformation.isAlreadyRequestingActivation) return;

		this.props.dispatch(actions.requestActivation(this.props.user.email));
	}

	handleActivationDialogCloseButtonClick() {
		this.props.dispatch(actions.closeActivationDialog());
	}

	handleEditButtonClick(e) {
		e.preventDefault();
		this.props.dispatch(actions.startEdit(this.props.user));
	}

	handleWithdrawalDialogDisplayButtonClick(e) {
		this.props.dispatch(actions.openWithdrawalDialog());
	}

	handleWithdrawalButtonClick(e) {
		if(! this.props.registrationInformation.didConfirmToWithdraw) {
			e.target.textContent = '退会する(決定)';
			return this.props.dispatch(actions.confirmWithdrawal());
		}

		this.props.dispatch(actions.deleteUser(this.props.user.userName));
	}

	handleWithdrawalCancelButtonClick(e) {
		this.props.dispatch(actions.cancelWithdrawal());
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

		const activationDialog = (
			<aside className="dialog">
				<p>所有権確認のメールを送りました。メールを確認してください。</p>
				<button type="button" onClick={::this.handleActivationDialogCloseButtonClick}>閉じる</button>
			</aside>
		);

		const withdrawalDialog = (
			<aside className="dialog">
				<p>本当に退会しますか？退会すると、今まで投稿したコンテンツが全て削除されます。この操作は取り消せません。</p>
				<button type="button" onClick={::this.handleWithdrawalButtonClick}>退会する(確認)</button>
				<button type="button" onClick={::this.handleWithdrawalCancelButtonClick}>退会しない</button>
			</aside>
		);

		const activationButtonNode = (user.hasBeenActivated)
			? <span>認証済み</span>
			: activationButton;

		const activationDialogNode = (
			(registrationInformation.shouldDisplayActivationDialog)
			? activationDialog
			: null
		);

		const withdrawalDialogNode = (
			(registrationInformation.shouldDisplayWithdrawalDialog)
			? withdrawalDialog
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

				<a href="" onClick={::this.handleEditButtonClick}>登録情報を変更する</a>
				<button type="button" onClick={::this.handleWithdrawalDialogDisplayButtonClick}>退会する</button>

				{activationDialogNode}
				{withdrawalDialogNode}
			</div>
		);
	}

	static contextTypes = {
		router: React.PropTypes.object.isRequired,
	};
}

function mapStateToProps(state) {
	return {
		registrationInformation: state.registrationInformation,
		user: state.user,
	}
}

export default ReactRedux.connect(mapStateToProps)(RegistrationInformationView);