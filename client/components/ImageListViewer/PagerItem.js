import React from 'react';

export default class PagerItem extends React.Component {
	render() {
		const children = this.props.href === null
			? this.props.children
			: <a
				className="pageLink"
				href={this.props.href}
				onClick={this.props.onPagerItemClick}
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