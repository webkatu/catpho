import qs from 'querystring';
import URL from 'url';
import config from '../config.js';

const _fetchContents = () => {
	return {
		type: 'FETCH_CONTENTS',
	}
}

const fetchContentsSuccess = (payload) => {
	const contents = payload.contents.map((content) => {
		return {
			id: content.id,
			href: '/contents/' + content.id,
			src: content.thumbnail,
		}
	});

	return {
		type: 'FETCH_CONTENTS_SUCCESS',
		payload: {
			contents,
			currentPage: payload.currentPage,
			maxPage: payload.maxPage,
		},
	};
}

const fetchContentsFailed = (error, path) => {
	return {
		type: 'FETCH_CONTENTS_FAILED',
		payload: { ...error, path }
	};
}

export const fetchContents = (basePath = '/contents' + location.search, page) => {
	//引数からfetch先のpathを作成;
	if(page === undefined) page = qs.parse(location.search.slice(1)).page;

	const url = URL.parse(basePath);
	const query = qs.parse(url.query);
	if(page) query.page = page;
	else delete query.page;
	const path = url.pathname + '?' + qs.stringify(query);
	
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
			dispatch(fetchContentsSuccess(json.payload));
		}catch(e) {
			console.log(e);
			dispatch(fetchContentsFailed(e, path));
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
	return {
		type: 'CHANGE_LOCATION@simpleImageListViewer',
	};
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
