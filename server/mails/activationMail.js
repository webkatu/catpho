export default {
	render(params) {
		return 
`${params.userName}様

メールアドレスの本人確認をするには下記のURLへアクセスしてください。
<a href="${params.activationURL}">${params.activationURL}</a>

※このメールに見覚えがない場合は破棄してください。

catpho: <a href="${params.appServer}">${params.appServer}</a>
`;
	},
};