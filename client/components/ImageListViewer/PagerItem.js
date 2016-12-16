import React from 'react';

export default class PagerItem extends React.Component {
	handleClick(e) {
		e.preventDefault();
		this.props.onPagerItemClick(e.target);
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