import React from 'react';
import { browserHistory } from 'react-router';

export default class RequestError extends React.Component {
	handleClick(e) {
		e.preventDefault();
		this.props.onReloadButtonClick(e.target);
	}
	render() {
		return (
			<div className="requestError">
				読み込みに失敗しました。
				<a
					href={this.props.errorObject.path}
					onClick={::this.handleClick}
				>
					再読み込みする。
				</a>
			</div>
		);
	}
}