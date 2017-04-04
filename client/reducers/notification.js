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
		
		case 'REQUEST_SIGN_UP_SUCCESS':
			return Object.assign({}, state, {
				text: '登録されました',
				displayTime: 5000,
			});

		case 'REQUEST_SIGN_UP_FAILURE':
			return Object.assign({}, state, {
				text: '登録に失敗しました',
				displayTime: 5000,
			});
/*
		case 'REQUEST_SIGN_IN_SUCCESS':
			return Object.assign({}, state, {
				text: 'サインインしました',
				displayTime: 5000,
			});
*/
		case 'REQUEST_SIGN_IN_FAILURE':
			return Object.assign({}, state, {
				text: 'サインインに失敗しました',
				displayTime: 5000,
			});

		case 'SIGN_OUT':
			return Object.assign({}, state, {
				text: 'サインアウトしました',
				displayTime: 5000,
			});

		case 'POST_CONTENTS':
			return Object.assign({}, state, {
				text: 'コンテンツを投稿しています...',
				displayTime: 5000,
			});

		case 'POST_CONTENTS_SUCCESS':
			return Object.assign({}, state, {
				text: 'コンテンツの投稿に成功しました',
				displayTime: 5000,
			});

		case 'POST_CONTENTS_FAILURE':
			return Object.assign({}, state, {
				text: 'コンテンツの投稿に失敗しました',
				displayTime: 5000,
			});

		case 'DELETE_CONTENT':
			return Object.assign({}, state, {
				text: 'コンテンツを削除しています...',
				displayTime: 5000,
			});

		case 'DELETE_CONTENT_SUCCESS':
			return Object.assign({}, state, {
				text: 'コンテンツの削除に成功しました',
				displayTime: 5000,
			});

		case 'DELETE_CONTENT_FAILURE':
			return Object.assign({}, state, {
				text: 'コンテンツの削除に失敗しました',
				displayTime: 5000,
			});

		case 'POST_COMMENT':
			return Object.assign({}, state, {
				text: 'コメントを投稿しています...',
				displayTime: 5000,
			});

		case 'POST_COMMENT_SUCCESS':
			return Object.assign({}, state, {
				text: 'コメントの投稿に成功しました',
				displayTime: 5000,
			});

		case 'POST_COMMENT_FAILURE':
			return Object.assign({}, state, {
				text: 'コメントの投稿に失敗しました',
				displayTime: 5000,
			});

		case 'DELETE_COMMENT':
			return Object.assign({}, state, {
				text: 'コメントを削除しています...',
				displayTime: 5000,
			});

		case 'DELETE_COMMENT_SUCCESS':
			return Object.assign({}, state, {
				text: 'コメントの削除に成功しました',
				displayTime: 5000,
			});

		case 'DELETE_COMMENT_FAILURE':
			return Object.assign({}, state, {
				text: 'コメントの削除に失敗しました',
				displayTime: 5000,
			});

		case 'PATCH_REGISTRATION_INFORMATION':
			return Object.assign({}, state, {
				text: 'ユーザー情報を変更しています...',
				displayTime: 5000,
			});

		case 'PATCH_REGISTRATION_INFORMATION_SUCCESS':
			return Object.assign({}, state, {
				text: 'ユーザー情報を変更しました',
				displayTime: 5000,
			});

		case 'PATCH_REGISTRATION_INFORMATION_FAILURE':
			return Object.assign({}, state, {
				text: 'ユーザー情報の変更に失敗しました',
				displayTime: 5000,
			});

		case 'DELETE_USER':
			return Object.assign({}, state, {
				text: '退会処理をしています...',
				displayTime: 5000,
			});

		case 'DELETE_USER_SUCCESS':
			return Object.assign({}, state, {
				text: '退会しました',
				displayTime: 5000,
			});

		case 'DELETE_USER_FAILURE':
			return Object.assign({}, state, {
				text: '退会できませんでした',
				displayTime: 5000,
			});

	}
	return state;
}