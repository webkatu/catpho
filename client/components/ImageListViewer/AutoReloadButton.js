import React from 'react';
import ReactDOM from 'react-dom';

export default class AutoReloadButton extends React.Component {

	handleClick(e) {
		const button = ReactDOM.findDOMNode(this.refs.autoReloadButton);
		this.props.onClick(button.checked)
	}

	render() {
		return (
			<label className="autoReloadButtonLabel">オートリロード
				<input
					className="autoReloadButton"
					type="checkbox"
					defaultChecked
					ref="autoReloadButton"
					onClick={this.handleClick.bind(this)}
				/>
			</label>
		);
	}
}