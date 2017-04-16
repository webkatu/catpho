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
		if(this.props.notification.displayTime === 0) {
			return <div className="notification" style={{opacity: 0, zIndex: -999}}></div>
		}

		return (
			<div className="notification">
				<p>{this.props.notification.text}</p>
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