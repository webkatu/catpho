import React from 'react';
import handleAnchorClick from '../common/handleAnchorClick.js';

export default class About extends React.Component {
	render() {
		return (
			<article className="about">
				<h1>About</h1>
				<div className="articleContent">
					<section>
						<h1>catphoって？</h1>
						<div className="sectionContent">
							<p>catphoは、猫画像の共有や管理ができるサイトです。猫の画像を閲覧/投稿するに加え、画像にコメントしたり画像をお気に入りに追加して管理することもできます。</p>
						</div>
					</section>
					<section>
						<h1>画像の投稿の仕方</h1>
						<div className="sectionContent">
							<p>猫の画像を投稿するにはユーザー登録をする必要があります。上の登録ボタンから登録してください。</p>
							<p>ユーザー登録をしてログインすると、上に投稿するボタンが表示されます。投稿するボタンを押して投稿したい画像を選択し投稿してください。</p>
						</div>
					</section>
					<section>
						<h1>ユーザー登録すると・・・</h1>
						<div className="sectionContent">
							<p>ユーザー登録をすると、画像の投稿や画像をお気に入りに追加したり、コメントを投稿したりすることができます。また、マイページから今まで自分が投稿した画像やお気に入りに追加した画像やコメントした画像に素早くアクセスできるようになります。</p>
						</div>
					</section>
				</div>
				<footer>
					<p>他にあったらいいなと思う機能があれば<a href="/contact/" onClick={handleAnchorClick}>お問い合わせ</a>から連絡してください。</p>
				</footer>
			</article>
		);
	}
}