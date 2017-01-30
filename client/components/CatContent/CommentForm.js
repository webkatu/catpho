import React from 'react';

export default class CommentForm extends React.Component {

	render() {
		const textToPromptSignIn = (
			(this.props.isSignedIn)
			? null
			: <p>サインインが必要です。</p>
		);
		return (
			<form className="commentForm" onSubmit={this.props.onSubmit}>
				{textToPromptSignIn}
				<textarea
					name="comment"
					placeholder="コメント"
					value={this.props.postCommentText}
					disabled={! this.props.isSignedIn}
					onChange={this.props.onPostCommentTextChange}
				/>
				<button
					type="submit"
					value="Post"
					disabled={! this.props.isSignedIn || ! this.props.possibleSubmit}
				>コメントする</button>
			</form>
		);
	}
}