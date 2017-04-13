export default {
	render(params) {
		return (`
<p>${params.userName}様</p>

<p>パスワードを再発行しました。</p>
<p>パスワード: ${params.password}</p>
<p>ログイン後、パスワードを変更するようおすすめします。</p>

<p>catpho: <a href="${params.appServer}">${params.appServer}</a></p>
		`);
	},
};