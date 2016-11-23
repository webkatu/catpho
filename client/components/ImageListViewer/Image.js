import React from 'react';

export default class Image extends React.Component {
	render() {
		return (
			<div id={this.props.id} className="image">
				<a href={this.props.href}>
					<img src={this.props.src} />
				</a>
			</div>
		);
	}
}