import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from '../actions/header.js';
import SiteTitle from '../components/Header/SiteTitle.js';

class Header extends React.Component {
	handleSignOutClick(e) {
		this.props.dispatch(actions.signOut());
	}
	render() {
		return (
			<header id="masthead" className="header">
				<SiteTitle />
				<nav>
					<ul>
						<li><button onClick={::this.handleSignOutClick}>サインアウト</button></li>
					</ul>
				</nav>
			</header>
		);
	}
}

export default ReactRedux.connect()(Header);