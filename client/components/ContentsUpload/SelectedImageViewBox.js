import React from 'react';
import SelectedImage from './SelectedImage.js';

export default class SelectedImageViewBox extends React.Component {
	render() {
		const ImageNodes = this.props.files.map((file, i) => {
			return (
				<SelectedImage
					onDeleteButtonClick={this.props.handleImageDeleteButtonClick}
					src={file.url}
					index={i}
					key={i}
				/>
			);
		});

		return (
			<div className="selectedImageViewBox">
				{ImageNodes}
			</div>
		);
	}
}