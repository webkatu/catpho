import React from 'react';

export default class CommentBoxDisplayButton extends React.Component {
	render() {
		let textNode;
		if(this.props.isDisplayingCommentBox) {
			textNode = 'コメントを隠す';
		}else {
			textNode = `コメントを見る(${this.props.commentsCount}件)`;
		}

		return (
			<button
				className="commentBoxDisplayButton"
				type="button"
				disabled={this.props.disabled}
				onClick={this.props.onClick}
			>{textNode}
			</button>
		);
	}
}