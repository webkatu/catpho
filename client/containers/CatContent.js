import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from '../actions/catContent';
import * as simpleImageListViewerActions from '../actions/simpleImageListViewer.js';
import FavoriteButton from '../components/CatContent/FavoriteButton.js'
import CommentBoxDisplayButton from '../components/CatContent/CommentBoxDisplayButton.js'
import DeletionConfirmation from '../components/CatContent/DeletionConfirmation.js'
import ShareView from '../components/CatContent/ShareView.js'
import CommentBox from '../components/CatContent/CommentBox.js'
import UserView from '../components/common/UserView.js'

class CatContent extends React.Component {
	handleTagAnchorClick(e) {
		e.preventDefault();
		this.context.router.push(e.target.pathname + e.target.search);
		this.props.dispatch(simpleImageListViewerActions.changeLocation());
	}

	handleUserAnchorClick(e) {
		e.preventDefault();
		this.context.router.push(e.currentTarget.pathname);
	}

	handleFavoriteButtonClick() {
		if(this.props.catContent.isRequestingFavorite) return;
		
		if(this.props.catContent.isFavorite) {
			this.props.dispatch(actions.removeFavorite(
				this.props.myUser.userName,
				this.props.content.id,
			));
			return;
		}

		this.props.dispatch(actions.addFavorite(
			this.props.myUser.userName,
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

		if(catContent.isFetchingContent) {
			return (
				<article className="catContent">
					<h1></h1>
					<p>読み込み中...</p>				
				</article>
			);
		}

		if(content.id === '') {
			return (
				<article className="catContent">
					<h1></h1>
					<p>コンテンツがありません</p>
				</article>
			);
		}

		const posterNode = (
			(content.poster.userName === '')
			? null
			: <UserView
				avatar={content.poster.avatar}
				userName={content.poster.userName}
				nickname={content.poster.nickname}
				onUserAnchorClick={::this.handleUserAnchorClick}
			/>
		);

		const tagNodes = content.tags.map((tag, i) => {
			return (
				<span className="tag" key={i}>
					<a href={'/contents/?tag=' + tag} onClick={::this.handleTagAnchorClick}>{tag}</a>
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
			: <ShareView url={`${location.origin}/contents/${this.props.content.id}/`}/>
		);

		const commentBoxNode = (
			(! catContent.shouldDisplayCommentBox)
			? null
			: <CommentBox
				comment={this.props.comment}
				myUser={this.props.myUser}
				onUserAnchorClick={::this.handleUserAnchorClick}
				onCommentDeleteButtonClick={::this.handleCommentDeleteButtonClick}
				isSignedIn={this.props.app.isSignedIn}
				onPostCommentTextChange={::this.handlePostCommentTextChange}
				onCommentFormSubmit={::this.handleCommentFormSubmit}
				onDeletionConfirmationSubmit={::this.handleCommentDeletionConfirmationSubmit}
				onDeletionConfirmationCancelButtonClick={::this.handleCommentDeletionConfirmationCancelButtonClick}
			/>
		);

		const name = (content.name === '') ? '?' : content.name;
		const age = (content.age === null) ? '?' : content.age;
		console.log(content);

		return (
			<article className="catContent">
				<div className="contentImg" href={content.imageURL} target="_blank">
					<img src={content.imageURL} alt=""/>
				</div>
				<div className="contentInfo">
					<h1>{content.id}</h1>
					<ul className="contentInfoList">
						<li className="poster">{posterNode}</li>
						<li className="favoritesCount"><span>お気に入り数: {content.favoritesCount}</span></li>
						<li className="tags"><span>タグ: {tagNodes}</span></li>
						<li className="name"><span>名前: {name}</span></li>
						<li className="age"><span>年齢: {age}</span></li>
						<li className="sex"><span>性別: {(() => {
							switch(content.sex) {
								case 'none':
									return '?';
								case 'male':
									return '♂';
								case 'female':
									return '♀';
							}
						})()}</span></li>
						<li className="description"><span>一言: {content.description}</span></li>
					</ul>
					<div className="contentButtons">
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
					</div>
					{deletionConfirmationNode}
					{shareViewNode}
					{commentBoxNode}
				</div>
			</article>
		);
	}

	static contextTypes = {
		router: React.PropTypes.object.isRequired,
	};
}

function mapStateToProps(state) {
	return {
		app: state.app,
		catContent: state.catContent,
		content: state.catContent.content,
		comment: state.comment,
		myUser: state.myUser,
	}
}

export default ReactRedux.connect(mapStateToProps)(CatContent);