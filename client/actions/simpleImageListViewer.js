import URL from 'url';
import config from '../config.js';

const _fetchContents = () => {
	return {
		type: 'FETCH_CONTENTS',
	}
}

const fetchContentsSuccessful = (payload) => {
	const contents = payload.contents.map((content) => {
		return {
			id: content.id,
			href: '/contents/' + content.id,
			src: content.thumbnail,
		}
	});

	return {
		type: 'FETCH_CONTENTS_SUCCESSFUL',
		payload: {
			contents,
			currentPage: payload.currentPage,
			maxPage: payload.maxPage,
		},
	};
}

const fetchContentsFailed = (error) => {
	return {
		type: 'FETCH_CONTENTS_FAILED',
		payload: { error }
	};
}

export const fetchContents = (basePath = '/contents' + location.search, page) => {
	//locationと引数からfetch先のpathを作成;

	const params = new URLSearchParams(location.search);
	if(page) params.set('page', page);

	const url = URL.parse(basePath);
	const query = new URLSearchParams(url.query);
	query.delete('null');
	for(const p of params.entries()) query.append(p[0], p[1]);

	const path = url.pathname + '?' + query.toString();

	return async (dispatch) => {
		dispatch(_fetchContents());
		try {
			const response = await fetch(config.apiServer + path, {
				method: 'GET',
				mode: 'cors',
				headers: { ...config.defaultHeaders },
			});
			if (! response.ok) throw new Error(response.status);
			const json = await response.json();
			dispatch(fetchContentsSuccessful(json.payload));
		}catch(e) {
			console.log(e);
			dispatch(fetchContentsFailed(e));
		}
	}
}

export const openViewer = (contents, selectedIndex) => {
	return {
		type: 'OPEN_VIEWER',
		payload: {
			contentIds: contents.map(content => content.id),
			selectedIndex,
		},
	};
}

export const changeLocation = () => {
	return (dispatch, getState) => {
		const { user } = getState();

		let basePathOfFetch;
		switch(location.pathname) {
			case '/':
			case '/contents/':
				const params = new URLSearchParams(location.search);
				if(params.has('tag')) {
					basePathOfFetch = '/contents/?tag'
				}
				basePathOfFetch = '/contents/';
				break;
			case '/mypage/myposts/':
				basePathOfFetch = `/contents/?poster=${user.userName}`;
				break;
			case '/mypage/favorites/':
				basePathOfFetch = `/contents/?favoritesOf=${user.userName}&userToken=${localStorage.getItem('userToken')}`;
				break;
			case '/mypage/mycomments/':
				basePathOfFetch = `/contents/?includingCommentsOf=${user.userName}`;
				break;
		}

		dispatch({
			type: 'CHANGE_LOCATION@simpleImageListViewer',
			payload: {
				basePathOfFetch,
			},
		});

	}
}

export const clear = () => {
	return {
		type: 'CLEAR@simpleImageListViewer',
	};
}

export const mount = (path) => {
	return {
		type: 'MOUNT@simpleImageListViewer',
		payload: {
			basePathOfFetch: path,
		},
	};
}
