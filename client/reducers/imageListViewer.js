import { LOCATION_CHANGE } from 'react-router-redux';
import qs from 'querystring'

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
	contents: [],
	pagerInfo: {
		interval: 5,
		total: 10,
		max: 0,
		start: 0,
		current: 0,
	},
	interval: 2,
	pagerTotal: 10,
	error: false,
	errorObject: {},
	shouldFetchContents: false,
	isLoading: false,
	shouldAutoReload: true,
	hasNextPage: false,
	isDisplayingViewer: false,
	contentsPath: '/contents',
	imagesPath: '/uploads/contents/thumbnails',
}

const imageListViewer = (state = initialState, action) => {
	switch(action.type) {
		case 'FETCH_IMAGE_LIST':
			return Object.assign({}, state, {
				error: false,
				shouldFetchContents: false,
				isLoading: true,
			});

		case 'FETCH_IMAGE_LIST_SUCCESS':
			return Object.assign({}, state, {
				contents: [...state.contents, ...action.payload.images],
				pagerInfo: {
					...state.pagerInfo,
					max: action.payload.maxPage,
					current: action.payload.currentPage,
				},
				lists: [
					...state.lists,
					{ images: action.payload.images },
				],
				isLoading: false,
				hasNextPage: action.payload.currentPage < action.payload.maxPage,
			});

		case 'FETCH_IMAGE_LIST_FAILURE':
			return Object.assign({}, state, {
				isLoading: false,
				error: true,
				errorObject: action.payload,
			});

		case 'OPEN_VIEWER':
			return Object.assign({}, state, {
				isDisplayingViewer: true,
			});

		case 'CLOSE_VIEWER':
			return Object.assign({}, state, {
				isDisplayingViewer: false,
			});

		case 'MOUNT@imageListViewer':
			const query = qs.parse(location.search.slice(1));
			const start = (Number(query.page) > 0) ? Number(query.page) : 1;
			
			return Object.assign({}, initialState, {
				pagerInfo: {
					...initialState.pagerInfo,
					start,
				},
				shouldFetchContents: true,
				shouldAutoReload: state.shouldAutoReload,
			});

		case 'TOGGLE_AUTO_RELOAD':
			return Object.assign({}, state, {
				shouldAutoReload: action.payload.shouldAutoReload,
			});

		case 'DELETE_CONTENT_SUCCESS':
			const deletedContents = [];
			const contents = [...state.contents];
			for(let i = 0; i < contents.length; i++) {
				const content = contents[i];
				if(content.id !== action.payload.contentId) continue;
				deletedContents.push(content);
				contents.splice(i, 1);
				i--;
			}

			const lists = [...state.lists];
			lists.forEach((list) => {
				for(let i = 0; i < deletedContents.length; i++) {
					const deletedContent = deletedContents[i];
					const index = list.images.indexOf(deletedContent);
					if(index === -1) continue;
					list.images.splice(index, 1);
					deletedContents.splice(i, 1);
					i--;
				}
			});

			return Object.assign({}, state, {
				lists,
				contents,
				isDisplayingViewer: false,
			});
	}

	return state;
}

export default imageListViewer;