import React from 'react';

export default class DeletionConfirmation extends React.Component {
	handleSubmit(e) {
		this.props.onSubmit(e);
	}

	handleCancelButtonClick(e) {
		this.props.onCancelButtonClick(e);
	}

	render() {
		return (
			<aside className="deletionConfirmation">
				<p>削除しますか?</p>
				<form onSubmit={::this.handleSubmit}>
					<button type="button" value="cancel" disabled={this.props.requesting} onClick={::this.handleCancelButtonClick}>キャンセル</button>
					<button type="submit" disabled={this.props.requesting} value="delete">削除する</button>
				</form>
			</aside>
		);
	}
}