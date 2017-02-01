import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from '../actions/header.js';
import SiteTitle from '../components/Header/SiteTitle.js';

class Header extends React.Component {
	handleSignOutClick(e) {
		this.props.dispatch(actions.signOut());
	}
	render() {
		const app = this.props.app;

		const signUpButton = <a href="/signup">SignUp</a>;
		const signUpButtonNode = (
			(app.isSignedIn)
			? null
			: <li>{signUpButton}</li>
		);

		const signInButton = <a href="/signin">SignIn</a>;
		const signInButtonNode = (
			(app.isSignedIn)
			? null
			: <li>{signInButton}</li>
		);

		const signOutButton = <button type="button" onClick={::this.handleSignOutClick}>サインアウト</button>;
		const signOutButtonNode = (
			(app.isSignedIn)
			? <li>{signOutButton}</li>
			: null
		);

		return (
			<header id="masthead" className="header">
				<SiteTitle />
				<nav>
					<ul>
						{signUpButtonNode}
						{signInButtonNode}
						{signOutButtonNode}
					</ul>
				</nav>
			</header>
		);
	}
}

function mapStateToProps(state) {
	return {
		app: state.app,
	};
}

export default ReactRedux.connect(mapStateToProps)(Header);