import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import * as ReactRedux from 'react-redux';
import * as actions from '../actions/activation.js';

class Activation extends React.Component {
	componentDidMount() {
		if(! this.props.user.isSignedIn) return;
		this.props.dispatch(actions.request());
	}

	componentDidUpdate() {
		if(! this.props.user.isSignedIn) return;
		if(this.props.activation.isSuccess !== null) return;
		this.props.dispatch(actions.request());
	}

	render() {
		console.log(this.props.user, this.props.activation);
		let textNode = null;

		if(this.props.activation.isSuccess === true) {
			textNode = '認証されました';
		}else if(this.props.activation.isSuccess === false) {
			switch(this.props.activation.errorMessage) {
				case '500':
					textNode = '500 server error';
					break;

				case '404':
					textNode = '404 not found';
					break;

				case 'expired':
					textNode = '期限切れのURLです';
					break;

				default:
					textNode = '認証に失敗しました。';
			}
		}
		return (
			<div className="activation">
				{textNode}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user,
		activation: state.activation,
	}
}

export default ReactRedux.connect(mapStateToProps)(Activation);