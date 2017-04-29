import { browserHistory } from 'react-router';

export default function handleAnchorClick(e) {
	e.preventDefault();
	browserHistory.push(e.currentTarget.pathname + e.currentTarget.search);
}