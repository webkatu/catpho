import config from '../config.js';

export const _fetchImageList = () => {
	return {
		type: 'FETCH_IMAGE_LIST',
	}
}

const fetchImageListSuccess = (payload) => {
	const images = payload.contents.map((content) => {
		return {
			id: content.id,
			href: '/contents/' + content.id,
			src: '/uploads/contents/thumbnails/' + content.filename,
		}
	});

	return {
		type: 'FETCH_IMAGE_LIST_SUCCESS',
		payload: {
			images,
			currentPage: payload.currentPage,
			maxPage: payload.maxPage,
		},
	};
}

const fetchImageListFailure = (error, path) => {
	return {
		type: 'FETCH_IMAGE_LIST_FAILURE',
		payload: { ...error, path }
	};
}

export const fetchImageList = (path = '/contents/' + location.search) => {
	return async (dispatch) => {
		dispatch(_fetchImageList());
		
		try {
			const response = await fetch(config.apiServer + path, {
				headers: {
					...config.defaultHeaders,
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'get',
			});
			if (! response.ok) throw new Error(response.status);

			const json = await response.json();
			console.log(json);
			if(! json.success) throw json.error;

			dispatch(fetchImageListSuccess(json.payload));
		}catch(e) {
			console.log(e);
			dispatch(fetchImageListFailure(e, path));
		}
	}
}

export const toggleAutoReload = (checked) => {
	return {
		type: 'TOGGLE_AUTO_RELOAD',
		payload: {
			shouldAutoReload: checked,
		},
	};
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

export const mount = () => {
	return {
		type: 'MOUNT@imageListViewer',
	};
}