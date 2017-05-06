export default {
	render(params) {
		return (`
<p>${params.userName}様</p>

<p>パスワード再発行のリクエストを受け付けました。</p>
<p>パスワードを再発行するには10分以内に下記のURLへアクセスしてください。</p>
<p>パスワード再発行後、パスワードが書かれたメールが送信されます。</p>
<p><a href="${params.passwordReissueURL}">${params.passwordReissueURL}</a></p>

<p>※このメールに見覚えがない場合は破棄してください。</p>

<p>catpho: <a href="${params.appServer}">${params.appServer}</a></p>
		`);
	},
};