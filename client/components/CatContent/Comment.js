import React from 'react';
import UserView from '../common/UserView.js';

export default class Comment extends React.Component {
	handleDeleteButtonClick(e) {
		this.props.onDeleteButtonClick(e, this.props.comment.id);
	}

	render() {
		const deleteButtonNode = (
			(! this.props.myself)
			? null
			: <button type="button" value="delete" onClick={::this.handleDeleteButtonClick}>削除</button>
		);

		const commentLines = this.props.comment.comment.split('\n');
		const commentTextNode = commentLines.map((line, i) => {
			return (<span key={i}>{line}<br /></span>);
		});

		return (
			<section data-id={this.props.comment.id} ref="comment">
				<h1 className="commentAuthor">
					<UserView
						avatar={this.props.comment.avatar}
						userName={this.props.comment.userName}
						nickname={this.props.comment.nickname}
						onUserAnchorClick={this.props.onUserAnchorClick}
					/>
				</h1>
				<p>{commentTextNode}</p>
				<aside>
					{deleteButtonNode}
				</aside>
			</section>
		);
	}
}