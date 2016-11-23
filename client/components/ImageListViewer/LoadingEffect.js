import React from 'react';
import classNames from 'classnames';

export default class LoadingEffect extends React.Component {
	render() {
		/*
		const classes = classNames({
			'loadingEffect': true,
			'loading': this.props.isLoading,
		});
		*/
		return (
			<div className="loadingEffect">
				Load中です。
			</div>
		);
	}
}