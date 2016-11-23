import React from 'react';
import * as ReactRouter from 'react-router';

export default class PagerItem extends React.Component {
	handleClick(e) {
		e.preventDefault();
		ReactRouter.browserHistory.push(this.props.href);
	}

	render() {
		const children = this.props.href === null
			? this.props.children
			: <a
				className="pageLink"
				href={this.props.href}
				onClick={this.handleClick.bind(this)}
			>
			{this.props.children}
			</a>

		return (
			<li className="pagerItem">
				{children}
			</li>
		);

	}
}