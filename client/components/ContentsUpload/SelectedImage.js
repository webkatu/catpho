import React from 'react';

export default class SelectedImage extends React.Component {
	handleDeleteButtonClick(e) {
		this.props.onDeleteButtonClick(this.props.index);
	}
	render() {
		return (
			<div className="selectedImage">
				<button className="deleteButton" type="button" onClick={::this.handleDeleteButtonClick}>☓</button>
				<img src={this.props.src} />
			</div>
		);
	}
}