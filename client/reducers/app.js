const initialState = {
	isSignedIn: false,
	title: 'catpho',
}

export default (state = initialState, action) => {
	switch(action.type) {
		case 'REQUEST_SIGN_UP_SUCCESSFUL': 
		case 'REQUEST_SIGN_IN_SUCCESSFUL':
			localStorage.setItem('userToken', action.payload.userToken);
			return Object.assign({}, state, {
				isSignedIn: true,
			});

		case 'DELETE_USER_SUCCESSFUL':
		case 'SIGN_OUT':
			localStorage.removeItem('userToken');
			return Object.assign({}, state, {
				isSignedIn: false,
			});

		case '@@router/LOCATION_CHANGE':
			console.log(action.payload);
			const pathname = action.payload.pathname;
			const query = action.payload.query;
			let title = '';
			let matched;

			if(pathname === '/' || pathname === '/contents/') {
				if(query.tag) title += `${query.tag}のコンテンツ | `;
				if(query.poster) title += `${query.poster}が投稿したコンテンツ | `;
			}else if(matched = pathname.match(/\/contents\/(\d+)\//)) {
				title += `コンテンツ ~ ${matched[1]} | `;
			}else if(pathname === '/mypage/') {
				title += 'マイページ | ';
			}else if(pathname === '/mypage/myposts/') {
				title += '投稿した画像 | ';
			}else if(pathname === '/mypage/favorites/') {
				title += 'お気に入り | ';
			}else if(pathname === '/mypage/mycomments/') {
				title += 'コメントした画像 | ';
			}else if(pathname === '/mypage/activation/') {
				title += 'アクチベーション | ';
			}else if(matched = pathname.match(/\/users\/(.+?)\//)) {
				title += `ユーザー ~ ${matched[1]} | `;
			}else if(pathname === '/other/passwordreissue/') {
				title += 'パスワード再発行 | ';
			}

			if(query.page) {
				title += `ページ${query.page} | `;
			}

			title += 'catpho';

			return Object.assign({}, state, {
				title,
			});
	}

	return state;
}