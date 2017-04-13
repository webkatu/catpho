export default {
	render(params) {
		return 
`${params.userName}様

パスワード再発行のリクエストを受け付けました。
パスワードを再発行するには10分以内に下記のURLへアクセスしてください。
パスワード再発行後、パスワードが書かれたメールが送信されます。
<a href="${params.passwordReissueURL}">${params.passwordReissueURL}</a>

※このメールに見覚えがない場合は破棄してください。

catpho: <a href="${params.appServer}">${params.appServer}</a>
`;
	},
};