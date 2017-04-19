import React from 'react';

export default class AutoLoadButton extends React.Component {
	render() {
		return (
			<label className="autoLoadButtonLabel">
				<input
					className="autoLoadButton"
					type="checkbox"
					defaultChecked
					onClick={this.props.onClick}
				/>
				<span>自動読込</span>
			</label>
		);
	}
}