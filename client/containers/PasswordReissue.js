import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from '../actions/passwordReissue.js';

class PasswordReissue extends React.Component {
	componentWillMount() {
		if(this.props.passwordReissue.shouldRequest) {
			this.props.dispatch(actions.requestPasswordReissue());
		}
	}

	render() {
		const passwordReissue = this.props.passwordReissue;

		let text = null;
		if(passwordReissue.isRequesting) {
			text = '再発行中...';
		}else if(passwordReissue.didRequestSucceed === true) {
			text = 'パスワードを再発行しました。メールを確認してください。';
		}else if(passwordReissue.didRequestSucceed === false) {
			text = 'パスワードの再発行に失敗しました。';
		}

		return (
			<div>
				<p>{text}</p>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		passwordReissue: state.passwordReissue,
	};
}

export default ReactRedux.connect(mapStateToProps)(PasswordReissue);