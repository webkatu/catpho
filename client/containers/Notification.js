import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from '../actions/notification.js';

class Notification extends React.Component {
	constructor() {
		super();
		this.timerId = null;
	}

	componentDidUpdate() {
		if(this.props.notification.displayTime !== 0) {
			clearTimeout(this.timerId);
			this.timerId = setTimeout(() => {
				this.props.dispatch(actions.hide());
			}, this.props.notification.displayTime)
		}
	}

	render() {
		let textNode = null;

		if(this.props.notification.displayTime !== 0) {
			textNode = this.props.notification.text;
		}
		return (
			<div className="notification">
				<p>{textNode}</p>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		notification: state.notification,
	};
}

export default ReactRedux.connect(mapStateToProps)(Notification);