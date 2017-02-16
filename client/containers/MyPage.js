import React from 'react';
import * as ReactRedux from 'react-redux';
import RegistrationInformation from './RegistrationInformation.js';

class MyPage extends React.Component {
	handleRegistrationInformationClick(e) {
		e.preventDefault();
	}
	render() {
		const myPage = this.props.myPage;

		let contentNode = null;
		if(myPage.shouldDisplayRegistrationInformation) {
			contentNode = <RegistrationInformation />
		}

		return (
			<article className="myPage">
				<ul className="myPageNav">
					<li><a href="" onClick={::this.handleRegistrationInformationClick}>登録情報</a></li>
					<li><a href="">投稿した画像</a></li>
					<li><a href="">お気に入り</a></li>
					<li><a href="">コメントした画像</a></li>
				</ul>

				{contentNode}
			</article>
		);
	}
}

function mapStateToProps(state) {
	return {
		myPage: state.myPage,
	};
}

export default ReactRedux.connect(mapStateToProps)(MyPage);