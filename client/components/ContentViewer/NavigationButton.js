import React from 'react';

class NavigationButton extends React.Component {
	render() {
		if(this.props.contentId === 0) {
			return <div className="navigationButton">{this.props.children}</div>
		}

		return (
			<div className="navigationButton">
				<a
					href={`/contents/${this.props.contentId}/`}
					onClick={this.props.onClick}
				>{this.props.children}</a>
			</div>
		);
	}
}

NavigationButton.defaultProps = {
	contentId: 0,
};

export default NavigationButton;