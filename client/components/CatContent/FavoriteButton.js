import React from 'react';

export default (props) => {
	let textNode;
	if(props.isFavorite) {
		textNode = 'お気に入りから外す';
	}else {
		textNode = 'お気に入り';
	}

	if(! props.isSignedIn) {
		return (
			<button title="サインインしてください" disabled={true} onClick={props.onClick}>{textNode}</button>
		);
	}

	return (
		<button disabled={props.isRequesting} onClick={props.onClick}>{textNode}</button>
	);
}