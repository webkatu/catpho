import React from 'react';
import ContentsUpload from '../../containers/ContentsUpload.js';

export default class ContentsUploadView extends React.Component {
	render() {
		return (
			<div className="contentsUploadView">
				<div className="closeArea" onClick={this.props.onCloseAreaClick} />
				<ContentsUpload />
			</div>
		);
	}
}