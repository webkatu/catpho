import React from 'react';
import Comment from './Comment.js';

export default class CommentList extends React.Component {
	render() {
		const commentNodes = this.props.comments.map((comment, i) => {
			return (
				<Comment
					key={i}
					comment={comment}
					myself={this.props.myUser.userName === comment.userName}
					onUserAnchorClick={this.props.onUserAnchorClick}
					onDeleteButtonClick={this.props.onCommentDeleteButtonClick}
				/>
			);
		})
		return (
			<div className="CommentList">
				{commentNodes}
			</div>
		);
	}
}