import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from '../actions/header.js';
import * as appActions from '../actions/app.js';
import SignUp from './SignUp.js';
import SignIn from './SignIn.js';
import ContentsUpload from './ContentsUpload.js';
import SiteTitle from '../components/Header/SiteTitle.js';


class Header extends React.Component {
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

	render() {
		const app = this.props.app;
		const header = this.props.header;

		const signUpButton = (
			<a onClick={::this.handleSignUpButtonClick}>登録</a>
		);

		const signInButton = (
			<a onClick={::this.handleSignInButtonClick}>ログイン</a>
		);

		const signOutButton = (
			<a onClick={::this.handleSignOutButtonClick}>サインアウト</a>
		);

		const myPageButton = (
			<a
				href="/mypage/"
				onClick={::this.handleMyPageButtonClick}
			>
				<img src={this.props.myUser.avatar} />
			</a>
		);

		const contentsUploadButton = (
			<a onClick={::this.handleContentsUploadButtonClick}>アップロード</a>
		);

		let signUpButtonNode = null;
		let signInButtonNode = null;
		let signOutButtonNode = null;
		let contentsUploadButtonNode = null;
		let myPageButtonNode = null;
		if(app.isSignedIn) {
			signOutButtonNode = signOutButton;
			contentsUploadButtonNode = contentsUploadButton;
			myPageButtonNode = myPageButton;
		}else {
			signUpButtonNode = signUpButton;
			signInButtonNode = signInButton;
		}

		const signUpNode = (
			(header.shouldDisplaySignUp)
			? <SignUp />
			: null
		);

		const signInNode = (
			(header.shouldDisplaySignIn)
			? <SignIn />
			: null
		);

		const contentsUploadNode = (
			(header.shouldDisplayContentsUpload)
			? <ContentsUpload />
			: null
		);

		return (
			<header id="masthead" className="header">
				<SiteTitle />
				<nav>
					<ul>
						<li>{signUpButtonNode}</li>
						<li>{signInButtonNode}</li>
						<li>{signOutButtonNode}</li>
						<li>{contentsUploadButtonNode}</li>
						<li>{myPageButtonNode}</li>
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