export default {
	render(params) {
		return 
`${params.userName}様

パスワードを再発行しました。
パスワード: ${params.password}
ログイン後、パスワードを変更するようおすすめします。

catpho: <a href="${params.appServer}">${params.appServer}</a>
`;
	},
};