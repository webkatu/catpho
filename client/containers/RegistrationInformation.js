import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from '../actions/registrationInformation.js';
import RegistrationInformationView from '../components/RegistrationInformation/RegistrationInformationView.js'
import RegistrationInformationEdit from '../components/RegistrationInformation/RegistrationInformationEdit.js'

class RegistrationInformation extends React.Component {

	handleActivationButtonClick() {
		if(this.props.registrationInformation.isRequestingActivation) return;
		if(this.props.registrationInformation.isAlreadyRequestingActivation) return;

		this.props.dispatch(actions.requestActivation());
	}

	handleDialogCloseButtonClick() {
		this.props.dispatch(actions.closeDialog());
	}

	handleEditButtonClick(e) {
		e.preventDefault();
		this.props.dispatch(actions.startEdit(this.props.user));
	}

	handleAvatarChange(e) {
		this.props.dispatch(actions.inputAvatar(e.target.files[0]));
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

	handleEditFormSubmit(e) {
		e.preventDefault();
		if(this.props.registrationInformation.isPatching) return;
		this.props.dispatch(actions.patchRegistrationInformation(e.target, this.props.user.userName));
	}

	render() {
		console.log(this.props.registrationInformation)
		const RegistrationInformationContentNode = (
			(! this.props.registrationInformation.isEditMode)
			? <RegistrationInformationView
				registrationInformation={this.props.registrationInformation}
				user={this.props.user}
				onActivationButtonClick={::this.handleActivationButtonClick}
				onDialogCloseButtonClick={::this.handleDialogCloseButtonClick}
				onEditButtonClick={::this.handleEditButtonClick}
			/>
			: <RegistrationInformationEdit
				registrationInformation={this.props.registrationInformation}
				form={this.props.form}
				user={this.props.user}
				onAvatarChange={::this.handleAvatarChange}
				onNicknameChange={::this.handleNicknameChange}
				onEmailChange={::this.handleEmailChange}
				onCurrentPasswordChange={::this.handleCurrentPasswordChange}
				onPasswordChange={::this.handlePasswordChange}
				onRePasswordChange={::this.handleRePasswordChange}
				onEditFormSubmit={::this.handleEditFormSubmit}
			/>
		);
		return (
			<article className="registrationInformation">
				<h1>登録情報</h1>
				{RegistrationInformationContentNode}
			</article>
		);
	}
}

function mapStateTopProps(state) {
	return {
		registrationInformation: state.registrationInformation,
		form: state.registrationInformation.form,
		user: state.user,
	};
}

export default ReactRedux.connect(mapStateTopProps)(RegistrationInformation);