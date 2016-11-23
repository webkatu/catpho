import React from 'react';
import AutoReloadButton from './AutoReloadButton.js';

export default class ImageListViewerNav extends React.Component {
	render() {
		return (
			<div className="imageListViewerNav">
				<AutoReloadButton onClick={this.props.onAutoReloadButtonClick} />
			</div>
		);
	}
}