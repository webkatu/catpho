import React from 'react';

export default (props) => {
	let textNode;
	if(props.isFavorite) {
		textNode = 'お気に入りから外す';
	}else {
		textNode = 'お気に入り';
	}

	return (
		<button disabled={props.disabled} onClick={props.onClick}>{textNode}</button>
	);
}