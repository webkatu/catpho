import React from 'react';

export default class DeletionConfirmation extends React.Component {
	render() {
		return (
			<aside className="deletionConfirmation">
				<div>
					<p>{this.props.text}</p>
					<form onSubmit={this.props.onSubmit}>
						<button type="button" value="cancel" disabled={this.props.requesting} onClick={this.props.onCancelButtonClick}>キャンセル</button>
						<button type="submit" disabled={this.props.requesting} value="delete">削除する</button>
					</form>
				</div>
			</aside>
		);
	}
}