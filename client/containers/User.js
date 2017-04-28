import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from '../actions/user.js';

class User extends React.Component {
	componentWillMount() {
		this.props.dispatch(actions.fetchUser(this.props.params.userName));
	}

	componentWillUnmount() {
		this.props.dispatch(actions.unmount());
	}

	handlePostAnchorClick(e) {
		e.preventDefault();
		this.context.router.push(e.target.pathname + e.target.search);
	}

	render() {
		const user = this.props.user;

		if(user.isFetchingUser) {
			return (
				<article className="user">
					<h1>{user.userName}</h1>
					<p>読み込み中...</p>
				</article>
			);
		}

		if(user.didFailFetchingUser) {
			return (
				<article className="user">
					<h1>{user.userName}</h1>
					<p>ユーザーは存在しません</p>
				</article>
			);
		}
	
		return (
			<article className="user">
				<h1>{user.userName}</h1>
				<div className="articleContent">
					<p>{user.nickname}</p>
					<img src={user.avatar} alt=""/>
					<p>{'登録月 ' + user.created}</p>
					<p>{'投稿数 ' + user.postCount}</p>
					<p><a href={`/contents/?poster=${user.userName}`} onClick={::this.handlePostAnchorClick}>投稿した画像を見る</a></p>
				</div>
			</article>
		);
	}

	static contextTypes = {
		router: React.PropTypes.object.isRequired,
	};
}

function mapStateToProps(state) {
	return {
		user: state.user,
	}
}

export default ReactRedux.connect(mapStateToProps)(User);