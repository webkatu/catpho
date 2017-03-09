import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from '../actions/catContent';
import FavoriteButton from '../components/CatContent/FavoriteButton.js'
import CommentBoxDisplayButton from '../components/CatContent/CommentBoxDisplayButton.js'
import DeletionConfirmation from '../components/CatContent/DeletionConfirmation.js'
import ShareView from '../components/CatContent/ShareView.js'
import CommentBox from '../components/CatContent/CommentBox.js'
import User from '../components/common/User.js'

class CatContent extends React.Component {
	handleAnchorClick(e) {
		e.preventDefault();
		this.context.router.push(e.target.pathname + e.target.search);
	}

	handleUserAnchorClick(e) {
		this.context.router.push(e.target.pathname);
	}

	handleFavoriteButtonClick() {
		if(this.props.catContent.isRequestingFavorite) return;
		
		if(this.props.catContent.isFavorite) {
			this.props.dispatch(actions.removeFavorite(
				this.props.user.userName,
				this.props.content.id,
			));
			return;
		}

		this.props.dispatch(actions.addFavorite(
			this.props.user.userName,
			this.props.content.id,
		));
	}

	handleDeleteButtonClick(e) {
		this.props.dispatch(actions.showDeletionConfirmation());
	}

	handleDeletionConfirmationSubmit(e) {
		e.preventDefault();
		if(this.props.catContent.isDeletingContent) return;
		this.props.dispatch(actions.deleteContent(this.props.content.id));
	}

	handleDeletionConfirmationCancelButtonClick() {
		if(this.props.catContent.isDeletingContent) return;
		this.props.dispatch(actions.hideDeletionConfirmation());
	}

	handleShareButtonClick() {
		this.props.dispatch(actions.toggleShareView());
	}

	handleCommentBoxDisplayButtonClick() {
		if(this.props.catContent.isFetchingComment) return;
		
		if(this.props.catContent.shouldDisplayCommentBox) {
			this.props.dispatch(actions.hideCommentBox())
			return;
		}

		this.props.dispatch(actions.fetchComments(this.props.content.id));
	}

	handleCommentDeleteButtonClick(e, selectedId) {
		this.props.dispatch(actions.showCommentDeletionConfirmation(selectedId));
	}

	handlePostCommentTextChange(e) {
		this.props.dispatch(actions.inputPostCommentText(e.target.value));
	}

	handleCommentFormSubmit(e) {
		e.preventDefault();
		this.props.dispatch(actions.postComment(e.target, this.props.content.id));
	}

	handleCommentDeletionConfirmationSubmit(e) {
		e.preventDefault();
		if(this.props.comment.isDeletingComment) return;
		this.props.dispatch(actions.deleteComment(this.props.content.id, this.props.comment.selectedId));
	}

	handleCommentDeletionConfirmationCancelButtonClick() {
		if(this.props.comment.isDeletingComment) return;
		this.props.dispatch(actions.hideCommentDeletionConfirmation());
	}

	render() {
		const catContent = this.props.catContent;
		const content = this.props.content;

		const closeAreaNode = (
			(! catContent.isGalleryMode)
			? null
			: <div
				className="closeArea"
				onClick={::this.handleCloseButtonClick}
			/>
		);

		const closeButtonNode = (
			(! catContent.isGalleryMode)
			? null
			: <button
				className="closeButton"
				type="button"
				onClick={::this.handleCloseButtonClick}
			>×</button>
		);

		const posterNode = (
			(content.poster.userName === '')
			? null
			: <User
				avatar={content.poster.avatar}
				userName={content.poster.userName}
				nickname={content.poster.nickname}
				onUserAnchorClick={::this.handleUserAnchorClick}
			/>
		);

		const tagNodes = content.tags.map((tag, i) => {
			return (
				<span key={i}>
					<a href={'/contents/?tags=' + tag} onClick={::this.handleAnchorClick}>{tag}</a>
					{' '}
				</span>
			);
		});


		const deleteButtonNode = (
			(! this.props.app.isSignedIn)
			? null
			: <button
				type="button"
				onClick={::this.handleDeleteButtonClick}
			>削除する</button>
		);

		const deletionConfirmationNode = (
			(! catContent.shouldDisplayDeletionConfirmation)
			? null
			: <DeletionConfirmation
				requesting={catContent.isDeletingContent}
				onSubmit={::this.handleDeletionConfirmationSubmit}
				onCancelButtonClick={::this.handleDeletionConfirmationCancelButtonClick}
			/>
		);

		const shareViewNode = (
			(! catContent.shouldDisplayShareView)
			? null
			: <ShareView />
		);

		const commentBoxNode = (
			(! catContent.shouldDisplayCommentBox)
			? null
			: <CommentBox
				comment={this.props.comment}
				user={this.props.user}
				onUserAnchorClick={::this.handleUserAnchorClick}
				onCommentDeleteButtonClick={::this.handleCommentDeleteButtonClick}
				isSignedIn={this.props.app.isSignedIn}
				onPostCommentTextChange={::this.handlePostCommentTextChange}
				onCommentFormSubmit={::this.handleCommentFormSubmit}
				onDeletionConfirmationSubmit={::this.handleCommentDeletionConfirmationSubmit}
				onDeletionConfirmationCancelButtonClick={::this.handleCommentDeletionConfirmationCancelButtonClick}
			/>
		);
		return (
			<article className="catContent">
				<img className="contentImg" src={content.imageURL} alt=""/>
				<ul className="contentInfo">
					<li className="poster">{posterNode}</li>
					<li className="favoritesCount">{content.favoriteCount}</li>
					<li className="tags">{tagNodes}</li>
					<li className="name">{content.name}</li>
					<li className="age">{content.age}</li>
					<li className="sex">{content.sex}</li>
					<li className="description">{content.description}</li>
				</ul>
				<FavoriteButton
					isFavorite={catContent.isFavorite}
					isSignedIn={this.props.app.isSignedIn}
					isRequesting={catContent.isRequestingFavorite}
					onClick={::this.handleFavoriteButtonClick}
				/>
				{deleteButtonNode}
				<button
					type="button"
					onClick={::this.handleShareButtonClick}
				>共有する</button>
				<CommentBoxDisplayButton
					isDisplayingCommentBox={catContent.shouldDisplayCommentBox}
					commentsCount={catContent.commentsCount}
					disabled={catContent.isFetchingComment}
					onClick={::this.handleCommentBoxDisplayButtonClick}
				/>
				{deletionConfirmationNode}
				{shareViewNode}
				{commentBoxNode}
			</article>
		);
	}
}

function mapStateToProps(state) {
	return {
		app: state.app,
		catContent: state.catContent,
		content: state.catContent.content,
		comment: state.comment,
		user: state.user,
	}
}

export default ReactRedux.connect(mapStateToProps)(CatContent);