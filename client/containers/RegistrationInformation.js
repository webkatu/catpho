import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from '../actions/registrationInformation.js';
import RegistrationInformationView from './RegistrationInformationView.js'
import RegistrationInformationEdit from './RegistrationInformationEdit.js'

class RegistrationInformation extends React.Component {
	render() {
		const RegistrationInformationContentNode = (
			(! this.props.registrationInformation.isEditMode)
			? <RegistrationInformationView />
			: <RegistrationInformationEdit />
		);
		return (
			<article className="registrationInformation">
				<header>
					<h1>登録情報</h1>
				</header>
				<div className="registrationInformationContent">
					{RegistrationInformationContentNode}
				</div>
			</article>
		);
	}
}

function mapStateTopProps(state) {
	return {
		registrationInformation: state.registrationInformation,
	};
}

export default ReactRedux.connect(mapStateTopProps)(RegistrationInformation);