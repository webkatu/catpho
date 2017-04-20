import React from 'react';
import * as ReactRedux from 'react-redux';
import * as simpleImageListViewerActions from '../actions/simpleImageListViewer.js';
import * as registrationInfromationActions from '../actions/registrationInformation.js';
import RegistrationInformation from './RegistrationInformation.js';

class MyPage extends React.Component {
	handleRegistrationInformationAnchorClick(e) {
		e.preventDefault();
		this.context.router.push(e.target.pathname + e.target.search);
		this.props.dispatch(registrationInfromationActions.mount());
	}

	handleAnchorContainingSimpleImageListViewerClick(e) {
		e.preventDefault();
		this.context.router.push(e.target.pathname + e.target.search);
		if(location.pathname === e.target.pathname) {
			this.props.dispatch(simpleImageListViewerActions.changeLocation());
		}
	}

	render() {
		const myPage = this.props.myPage;

		return (
			<article className="myPage">
				<header>
					<h1>マイページ</h1>
					<ul className="myPageNav">
						<li><a href="/mypage/" onClick={::this.handleRegistrationInformationAnchorClick}>登録情報</a></li>
						<li><a href="/mypage/myposts/" onClick={::this.handleAnchorContainingSimpleImageListViewerClick}>投稿した画像</a></li>
						<li><a href="/mypage/favorites/" onClick={::this.handleAnchorContainingSimpleImageListViewerClick}>お気に入り</a></li>
						<li><a href="/mypage/mycomments/" onClick={::this.handleAnchorContainingSimpleImageListViewerClick}>コメントした画像</a></li>
					</ul>
				</header>

				<div className="myPageContent">
					{this.props.children}
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
		myPage: state.myPage,
	};
}

export default ReactRedux.connect(mapStateToProps)(MyPage);