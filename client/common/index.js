export const createPagerPath = (pageNumber) => {
		const pathname = location.pathname;
		if(pageNumber === 1) return pathname;
		
		const query = `page=${pageNumber}`;
		let qs = location.search.slice(1);

		if(qs === '') {
			qs = query;
		}else if(! qs.includes('page=')) {
			qs = query + '&' + qs;
		}else {
			qs = qs.replace(/page=\d+/, query);
		}
		return pathname + '?' + qs;
}