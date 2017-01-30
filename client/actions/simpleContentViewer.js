export const goPrevious = () => {
	return {
		type: 'GO_PREVIOUS@simpleContentViewer',
	};
}

export const goNext = () => {
	return {
		type: 'GO_NEXT@simpleContentViewer',
	};
}

export const closeViewer = () => {
	return {
		type: 'CLOSE_VIEWER',
	};
}