import React from 'react';

export default class User extends React.Component {
	render() {
		const userNameNode = (
			(this.props.userName === '')
			? this.props.nickname
			: <a href={'/users/' + this.props.userName} onClick={this.props.onUserAnchorClick}
			>
				{this.props.nickname}
			</a>
		);
		return (
			<span className="user">
				<img src={this.props.avatar} alt="" />
				{userNameNode}
			</span>
		);
	}

	static defaultProps = {
		userName: '',
	}
}