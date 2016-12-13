import React from 'react';
import * as ReactRedux from 'react-redux';
import SiteTitle from '../components/Header/SiteTitle.js';

class Header extends React.Component {
	render() {
		return (
			<header id="masthead" className="header">
				<SiteTitle />
				<nav>
					<p>サインアウト</p>
				</nav>
			</header>
		);
	}
}