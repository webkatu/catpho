import React from 'react';

export default class Image extends React.Component {
	render() {
		return (
			<div className="image" data-id={this.props.id}>
				<a href={this.props.href} onClick={this.props.onClick}>
					<img src={this.props.src} alt="" />
				</a>
			</div>
		);
	}
}