import React from 'react';
import { browserHistory } from 'react-router';

export default class RequestError extends React.Component {
	handleClick(e) {
		e.preventDefault();
		browserHistory.replace(location.href);
	}
	render() {
		console.log(this.props.error);
		return (
			<div className="requestError">
				読み込みに失敗しました。
				<a
					href=""
					onClick={this.handleClick.bind(this)}
				>
					再読み込みする。
				</a>
			</div>
		);
	}
}