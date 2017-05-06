export default function sendPageView(title) {
	if(window.ga === undefined) return;
	window.ga('send', 'pageView', {
		page: location.pathname + location.search,
		title,
	});
}