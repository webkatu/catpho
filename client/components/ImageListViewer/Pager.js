import React from 'react';
import PagerItem from './PagerItem.js';
import { createPagerPath } from '../../utils/index.js';

export default class Pager extends React.Component {

	render() {
		const info = this.props.pagerInfo;

		const pagerItemNodes = [];
		let i = info.startPageNumber;
		let key = 0;
		while(i <= info.endPageNumber) {
			const pageNumber = i;
			const href = (pageNumber === info.currentPage)
				? null
				: createPagerPath(pageNumber);

			pagerItemNodes.push((
				<PagerItem href={href} key={key++}>{pageNumber}
				</PagerItem>
			));

			i++;
		}

		return (
			<div className="pager">
				<ul>
					<PagerItem
						href={createPagerPath(1)}
						key={key++}
					>
						&lt;&lt;
					</PagerItem>
					{pagerItemNodes}
					<PagerItem
						href={createPagerPath(info.maxPage)}
						key={key++}
					>
						&gt;&gt;
					</PagerItem>
				</ul>
			</div>
		);
	}
}