import React from 'react';

export default class ShareView extends React.Component {
	render() {
		return (
			<aside className="shareView">
				<p>{'URL: ' + location.href}</p>
				<ul className="shareButtons">
					<li>Twitter</li>
					<li>FaceBook</li>
					<li>はてな</li>
				</ul>
			</aside>
		);
	}
}