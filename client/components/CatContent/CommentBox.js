import React from 'react';
import CommentList from './CommentList.js';
import CommentForm from './CommentForm.js';
import DeletionConfirmation from './DeletionConfirmation.js'

export default class CommentBox extends React.Component {
	render() {
		const deletionConfirmationNode = (
			(! this.props.comment.shouldDisplayDeletionConfirmation)
			? null
			: <DeletionConfirmation
				text="このコメントを削除しますか？"
				requesting={this.props.comment.isDeletingComment}
				onSubmit={this.props.onDeletionConfirmationSubmit}
				onCancelButtonClick={this.props.onDeletionConfirmationCancelButtonClick}
			/>
		);
		return (
			<article className="commentBox">
				<CommentList
					comments={this.props.comment.comments}
					myUser={this.props.myUser}
					onUserAnchorClick={this.props.onUserAnchorClick}
					onCommentDeleteButtonClick={this.props.onCommentDeleteButtonClick}
				/>
				<CommentForm 
					isSignedIn={this.props.isSignedIn}
					possibleSubmit={this.props.comment.possibleSubmit()}
					postCommentText={this.props.comment.postCommentText}
					onPostCommentTextChange={this.props.onPostCommentTextChange}
					onSubmit={this.props.onCommentFormSubmit}
				/>
				{deletionConfirmationNode}
			</article>
		);
	}

	static defaultProps = {
		myUser: {},
	}
}