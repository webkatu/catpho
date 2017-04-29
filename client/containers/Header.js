import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from '../actions/header.js';
import * as appActions from '../actions/app.js';
import * as simpleImageListViewerActions from '../actions/simpleImageListViewer.js';
import SignUpView from '../components/common/SignUpView.js';
import SignInView from '../components/common/SignInView.js';
import ContentsUploadView from '../components/common/ContentsUploadView.js';
import handleAnchorClick from '../common/handleAnchorClick.js';

class Header extends React.Component {
	handleTitleAnchorClick(e) {
		handleAnchorClick(e);
		this.props.dispatch(simpleImageListViewerActions.changeLocation());
	}

	handleSignUpButtonClick(e) {
		e.preventDefault();
		this.props.dispatch(actions.toggleSignUpView());
	}

	handleSignInButtonClick(e) {
		e.preventDefault();
		this.props.dispatch(actions.toggleSignInView());
	}

	handleContentsUploadButtonClick(e) {
		e.preventDefault();
		this.props.dispatch(actions.toggleContentsUploadView());
	}

	handleSignOutButtonClick(e) {
		e.preventDefault();
		this.props.dispatch(appActions.signOut());
	}

	handleMyPageButtonClick(e) {
		e.preventDefault();
		this.context.router.push(e.currentTarget.pathname);
	}

	handleSignUpCloseAreaClick(e) {
		this.props.dispatch(actions.toggleSignUpView());
	}

	handleSignInCloseAreaClick(e) {
		this.props.dispatch(actions.toggleSignInView());
	}

	handleContentsUploadCloseAreaClick(e) {
		this.props.dispatch(actions.toggleContentsUploadView());
	}

	render() {
		const app = this.props.app;
		const header = this.props.header;

		const signUpButton = (
			<a onClick={::this.handleSignUpButtonClick}>登録</a>
		);

		const signInButton = (
			<a onClick={::this.handleSignInButtonClick}>サインイン</a>
		);

		const signOutButton = (
			<a onClick={::this.handleSignOutButtonClick}>サインアウト</a>
		);

		const myPageButton = (
			<a
				className="myPageButton"
				href="/mypage/"
				title="マイページと設定"
				onClick={::this.handleMyPageButtonClick}
			>
				<img src={this.props.myUser.avatar} />
			</a>
		);

		const contentsUploadButton = (
			<a onClick={::this.handleContentsUploadButtonClick}>アップロード</a>
		);

		const aboutAnchor = (
			<a
				href="/about/"
				onClick={handleAnchorClick}
			>catphoって？</a>
		);

		let signUpButtonNode = null;
		let signInButtonNode = null;
		let signOutButtonNode = null;
		let contentsUploadButtonNode = null;
		let myPageButtonNode = null;
		let aboutAnchorNode = null;
		if(app.isSignedIn) {
			signOutButtonNode = <li>{signOutButton}</li>;
			contentsUploadButtonNode = <li>{contentsUploadButton}</li>;
			myPageButtonNode = <li>{myPageButton}</li>;
		}else {
			aboutAnchorNode = <li>{aboutAnchor}</li>
			signUpButtonNode = <li>{signUpButton}</li>;
			signInButtonNode = <li>{signInButton}</li>;
		}

		const signUpNode = (
			(header.shouldDisplaySignUp)
			? <SignUpView onCloseAreaClick={::this.handleSignUpCloseAreaClick} />
			: null
		);

		const signInNode = (
			(header.shouldDisplaySignIn)
			? <SignInView onCloseAreaClick={::this.handleSignInCloseAreaClick} />
			: null
		);

		const contentsUploadNode = (
			(header.shouldDisplayContentsUpload)
			? <ContentsUploadView onCloseAreaClick={::this.handleContentsUploadCloseAreaClick} />
			: null
		);

		return (
			<header id="header" className="header">
				<h1 className="siteTitle"><a href="/" onClick={::this.handleTitleAnchorClick}>catpho</a></h1>
				<nav>
					<ul>
						{aboutAnchorNode}
						{signUpButtonNode}
						{signInButtonNode}
						{signOutButtonNode}
						{contentsUploadButtonNode}
						{myPageButtonNode}
					</ul>
				</nav>
				{signUpNode}
				{signInNode}
				{contentsUploadNode}
			</header>
		);
	}

	static contextTypes = {
		router: React.PropTypes.object.isRequired,
	};
}

function mapStateToProps(state) {
	return {
		app: state.app,
		myUser: state.myUser,
		header: state.header,
	};
}

export default ReactRedux.connect(mapStateToProps)(Header);