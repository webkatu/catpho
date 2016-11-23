import React from 'react';
import SelectedImage from './SelectedImage.js';

export default class SelectedImageViewBox extends React.Component {
	render() {
		const ImageNodes = this.props.images.map((src, i) => {
			return (
				<SelectedImage
					onDeleteButtonClick={this.props.onDeleteButtonClick}
					src={src}
					key={i}
					index={i}
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