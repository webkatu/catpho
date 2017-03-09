import React from 'react';
import * as ReactRedux from 'react-redux';
import * as simpleImageListViewerActions from '../actions/simpleImageListViewer.js';
import RegistrationInformation from './RegistrationInformation.js';

class MyPage extends React.Component {
	handleAnchorClick(e) {
		e.preventDefault();
		this.context.router.push(e.target.pathname + e.target.search);
	}

	handleAnchorContainingSimpleImageListViewerClick(e) {
		e.preventDefault();
		this.context.router.push(e.target.pathname + e.target.search);
		if(location.pathname === e.target.pathname) {
			this.props.dispatch(simpleImageListViewerActions.clear());
		}
	}

	render() {
		const myPage = this.props.myPage;

		return (
			<article className="myPage">
				<ul className="myPageNav">
					<li><a href="/mypage" onClick={::this.handleAnchorClick}>登録情報</a></li>
					<li><a href="/mypage/myposts" onClick={::this.handleAnchorContainingSimpleImageListViewerClick}>投稿した画像</a></li>
					<li><a href="/mypage/favorites" onClick={::this.handleAnchorContainingSimpleImageListViewerClick}>お気に入り</a></li>
					<li><a href="/mypage/mycomments" onClick={::this.handleAnchorContainingSimpleImageListViewerClick}>コメントした画像</a></li>
				</ul>

				{this.props.children}
			</article>
		);
	}

	static contextTypes = {
		router: React.PropTypes.object.isRequired,
	};

}

function mapStateToProps(state) {
	return {
		myPage: state.myPage,
	};
}

export default ReactRedux.connect(mapStateToProps)(MyPage);