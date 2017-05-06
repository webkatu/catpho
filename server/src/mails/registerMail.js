export default {
	render(params) {
		return (`
<p>${params.userName}様</p>

<p>catphoへユーザー登録されました。</p>
<p>メールアドレスの本人確認をするには下記のURLへアクセスしてください。</p>
<p><a href="${params.activationURL}">${params.activationURL}</a></p>

<p>※このメールに見覚えがない場合は破棄してください。</p>

<p>catpho: <a href="${params.appServer}">${params.appServer}</a></p>
		`);
	},
};