import React from 'react';
import PagerItem from './PagerItem.js';
import createPagerPath from '../../common/createPagerPath.js';

export default class Pager extends React.Component {

	render() {
		const pagerInfo = this.props.pagerInfo;
		const page = this.props.page;

		let firstPage = page - Math.ceil(pagerInfo.total / 2) + 1;
		if(firstPage < 1) firstPage = 1;

		let lastPage = firstPage + pagerInfo.total - 1;
		if(lastPage > pagerInfo.max) lastPage = pagerInfo.max;

		const pagerItemNodes = Array(lastPage - firstPage + 1).fill().map((el, i) => {
			const pageNum = firstPage + i;
			const href = (pageNum === page)
				? null
				: createPagerPath(pageNum);

			return (
				<PagerItem
					href={href}
					onPagerItemClick={this.props.onPagerItemClick}
					key={i}
				>
					{pageNum}
				</PagerItem>
			);
		});

		return (
			<div className="pager">
				<ul>
					<PagerItem
						href={createPagerPath(1)}
						onPagerItemClick={this.props.onPagerItemClick}
						key={-1}
					>
						&lt;&lt;
					</PagerItem>
					{pagerItemNodes}
					<PagerItem
						href={createPagerPath(pagerInfo.max)}
						onPagerItemClick={this.props.onPagerItemClick}
						key={-2}
					>
						&gt;&gt;
					</PagerItem>
				</ul>
			</div>
		);
	}
}