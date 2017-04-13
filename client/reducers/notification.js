const initialState = {
	text: '',
	displayTime: 5000,
};

export default (state = initialState, action) => {
	switch(action.type) {
		case 'HIDE@notification':
			return Object.assign({}, state, {
				text: '',
				displayTime: 0,
			});
		
		case 'REQUEST_SIGN_UP_SUCCESSFUL':
			return Object.assign({}, state, {
				text: '登録されました',
				displayTime: 5000,
			});

		case 'REQUEST_SIGN_UP_FAILED':
			return Object.assign({}, state, {
				text: '登録に失敗しました',
				displayTime: 5000,
			});
/*
		case 'REQUEST_SIGN_IN_SUCCESSFUL':
			return Object.assign({}, state, {
				text: 'サインインしました',
				displayTime: 5000,
			});
*/
		case 'REQUEST_SIGN_IN_FAILED':
			return Object.assign({}, state, {
				text: 'サインインに失敗しました',
				displayTime: 5000,
			});

		case 'SIGN_OUT':
			return Object.assign({}, state, {
				text: 'サインアウトしました',
				displayTime: 5000,
			});

		case 'FETCH_CONTENTS_FAILED':
			return Object.assign({}, state, {
				text: `コンテンツの取得に失敗しました (Error: ${action.payload.error.message})`,
				displayTime: 5000,
			});

		case 'POST_CONTENTS':
			return Object.assign({}, state, {
				text: 'コンテンツを投稿しています...',
				displayTime: 5000,
			});

		case 'POST_CONTENTS_SUCCESSFUL':
			return Object.assign({}, state, {
				text: 'コンテンツの投稿に成功しました',
				displayTime: 5000,
			});

		case 'POST_CONTENTS_FAILED':
			return Object.assign({}, state, {
				text: 'コンテンツの投稿に失敗しました',
				displayTime: 5000,
			});

		case 'DELETE_CONTENT':
			return Object.assign({}, state, {
				text: 'コンテンツを削除しています...',
				displayTime: 5000,
			});

		case 'DELETE_CONTENT_SUCCESSFUL':
			return Object.assign({}, state, {
				text: 'コンテンツの削除に成功しました',
				displayTime: 5000,
			});

		case 'DELETE_CONTENT_FAILED':
			return Object.assign({}, state, {
				text: 'コンテンツの削除に失敗しました',
				displayTime: 5000,
			});

		case 'POST_COMMENT':
			return Object.assign({}, state, {
				text: 'コメントを投稿しています...',
				displayTime: 5000,
			});

		case 'POST_COMMENT_SUCCESSFUL':
			return Object.assign({}, state, {
				text: 'コメントの投稿に成功しました',
				displayTime: 5000,
			});

		case 'POST_COMMENT_FAILED':
			return Object.assign({}, state, {
				text: 'コメントの投稿に失敗しました',
				displayTime: 5000,
			});

		case 'DELETE_COMMENT':
			return Object.assign({}, state, {
				text: 'コメントを削除しています...',
				displayTime: 5000,
			});

		case 'DELETE_COMMENT_SUCCESSFUL':
			return Object.assign({}, state, {
				text: 'コメントの削除に成功しました',
				displayTime: 5000,
			});

		case 'DELETE_COMMENT_FAILED':
			return Object.assign({}, state, {
				text: 'コメントの削除に失敗しました',
				displayTime: 5000,
			});

		case 'PATCH_REGISTRATION_INFORMATION':
			return Object.assign({}, state, {
				text: 'ユーザー情報を変更しています...',
				displayTime: 5000,
			});

		case 'PATCH_REGISTRATION_INFORMATION_SUCCESSFUL':
			return Object.assign({}, state, {
				text: 'ユーザー情報を変更しました',
				displayTime: 5000,
			});

		case 'PATCH_REGISTRATION_INFORMATION_FAILED':
			return Object.assign({}, state, {
				text: 'ユーザー情報の変更に失敗しました',
				displayTime: 5000,
			});

		case 'DELETE_USER':
			return Object.assign({}, state, {
				text: '退会処理をしています...',
				displayTime: 5000,
			});

		case 'DELETE_USER_SUCCESSFUL':
			return Object.assign({}, state, {
				text: '退会しました',
				displayTime: 5000,
			});

		case 'DELETE_USER_FAILED':
			return Object.assign({}, state, {
				text: '退会できませんでした',
				displayTime: 5000,
			});

		case 'REQUEST_PASSWORD_REISSUE_REQUEST_SUCCESSFUL':
			return Object.assign({}, state, {
				text: 'メールを送信しました。メールを確認してください',
				displayTime: 5000,
			});

		case 'REQUEST_PASSWORD_REISSUE_REQUEST_FAILED':
			return Object.assign({}, state, {
				text: 'メールの送信に失敗しました。やり直してください',
				displayTime: 5000,
			});

	}
	return state;
}