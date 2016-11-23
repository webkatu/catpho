import React from 'react';

export default class SelectedImage extends React.Component {
	handleDeleteButtonClick(e) {
		this.props.onDeleteButtonClick(this.props.index);
	}
	render() {
		return (
			<div className="selectedImage">
				<span className="deleteButton" onClick={this.handleDeleteButtonClick.bind(this)}>☓</span>
				<img src={this.props.src} />
			</div>
		);
	}
}