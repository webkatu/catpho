import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from '../actions/activation.js';

class Activation extends React.Component {
	componentDidMount() {
		if(this.props.activation.shouldRequestActivation) {
			this.props.dispatch(actions.requestActivation(this.props.myUser.userName));
		}
	}

	componentDidUpdate() {
		if(this.props.activation.shouldRequestActivation) {
			this.props.dispatch(actions.requestActivation(this.props.myUser.userName));
		}
	}

	render() {
		const activation = this.props.activation;

		let textNode = null;

		if(! this.props.app.isSignedIn) textNode = 'サインインしてください';
		else if(activation.isRequesting) textNode = '認証中...';
		else if(activation.didRequestSucceed) textNode = '認証されました';
		else if(activation.didRequestSucceed === false) textNode = '認証に失敗しました';

		return (
			<div className="activation">
				{textNode}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		app: state.app,
		myUser: state.myUser,
		activation: state.activation,
	}
}

export default ReactRedux.connect(mapStateToProps)(Activation);