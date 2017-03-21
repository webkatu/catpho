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
		this.props.dispatch(actions.toggleSignUpView());
	}

	handleSignInButtonClick(e) {
		this.props.dispatch(actions.toggleSignInView());
	}

	handleContentsUploadButtonClick(e) {
		this.props.dispatch(actions.toggleContentsUploadView());
	}

	handleSignOutButtonClick(e) {
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
			<button
				type="button"
				value="SignUp"
				onClick={::this.handleSignUpButtonClick}
			>登録</button>
		);
		const signUpButtonNode = (
			(app.isSignedIn)
			? null
			: signUpButton
		);

		const signInButton = (
			<button
				type="button"
				value="SignIn"
				onClick={::this.handleSignInButtonClick}
			>ログイン</button>
		);
		const signInButtonNode = (
			(app.isSignedIn)
			? null
			: signInButton
		);

		const signOutButton = (
			<button
				type="button"
				value="SignOut"
				onClick={::this.handleSignOutButtonClick}
			>サインアウト</button>
		);
		const signOutButtonNode = (
			(app.isSignedIn)
			? signOutButton
			: null
		);

		const myPageButtonNode = <a href="/mypage" onClick={::this.handleMyPageButtonClick}><img src={this.props.user.avatar} /></a>

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
		user: state.user,
		header: state.header,
	};
}

export default ReactRedux.connect(mapStateToProps)(Header);