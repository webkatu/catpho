import React from 'react';

export default class UserView extends React.Component {
	render() {
		if(this.props.userName === '') {
			return (
				<div className="userView">
					<img src={this.props.avatar} alt="" />
					<span>{this.props.nickname}</span>
				</div>
			);
		}

		return (
			<a className="userView" href={`/users/${this.props.userName}/`} onClick={this.props.onUserAnchorClick}>
				<img src={this.props.avatar} alt="" />
				<span>{this.props.nickname}</span>
			</a>
		);
	}

	static defaultProps = {
		userName: '',
	}
}