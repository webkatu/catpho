import { LOCATION_CHANGE } from 'react-router-redux';

const url = 'http://lorempixel.com/100/100/';
const initialState = {
	path: '',
	lists: [/*
		{
			images: [
				{id: Number, src: url, href: url},
			],
			pagerInfo: {
				pathname: location.pathname,
				total: 10,
				maxPage: 100,
				currentPage: 1,
				interval: 5,
			}
		}
	*/],
	interval: 2,
	pagerTotal: 10,
	error: false,
	errorObject: {},
	isLoading: false,
	shouldAutoReload: true,
	hasNextPage: false,
	contentsPath: '/contents',
	imagesPath: '/uploads/contents/thumbnails',
}

const imageListViewer = (state = initialState, action) => {
	switch(action.type) {
		case 'FETCH_IMAGE_LIST':
			return Object.assign({}, state, {
				error: false,
				isLoading: true,
			});

		case 'FETCH_IMAGE_LIST_SUCCESS':
			return Object.assign({}, state, {
				lists: [
					...state.lists,
					{
						images: action.payload.images,
						pagerInfo: {
							...action.payload.pagerInfo,
							total: initialState.pagerTotal,
						},
					}
				],
				isLoading: false,
				hasNextPage: action.payload.pagerInfo.currentPage < action.payload.pagerInfo.maxPage,
			});

		case 'FETCH_IMAGE_LIST_FAILURE':
			return Object.assign({}, state, {
				isLoading: false,
				error: true,
				errorObject: action.payload,
			});

		case 'INIT':
			return Object.assign({}, initialState, {
				shouldAutoReload: state.shouldAutoReload,
			});

		case 'TOGGLE_AUTO_RELOAD':
			return Object.assign({}, state, {
				shouldAutoReload: action.payload.shouldAutoReload,
			});
	}

	return state;
}

export default imageListViewer;