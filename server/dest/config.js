'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _secret = require('./secret.js');

var _secret2 = _interopRequireDefault(_secret);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appServer = 'https://catpho.webkatu.com';
var apiServer = 'https://api.catpho.webkatu.com';

exports.default = {
	appServer: appServer,
	apiServer: apiServer,
	mysql: {
		host: _secret2.default.mysql.host,
		user: _secret2.default.mysql.user,
		password: _secret2.default.mysql.password,
		database: 'catpho'
	},
	publicDir: __dirname + '/../../public',
	uploadsDir: __dirname + '/../uploads',
	avatarsDir: __dirname + '/../uploads/avatars',
	contentsDir: __dirname + '/../uploads/contents',
	tmpDir: __dirname + '/../uploads/tmp',
	avatarsUrl: apiServer + '/uploads/avatars',
	contentsUrl: apiServer + '/uploads/contents',
	thumbnailsUrl: apiServer + '/uploads/contents/thumbnails',
	bcrypt: {
		salt: _secret2.default.bcrypt.salt
	},
	mail: {
		smtpConfig: {
			host: 'smtp.gmail.com',
			port: '587',
			auth: {
				user: _secret2.default.mail.smtpConfig.auth.user,
				pass: _secret2.default.mail.smtpConfig.auth.pass
			},
			tls: {
				ciphers: 'SSLv3'
			}
		},
		from: 'mail@catpho.webkatu.com'
	},
	userAuthJWT: {
		secretKey: _secret2.default.userAuthJWT.secretKey,
		expiresIn: 1000 * 60 * 60 * 24 * 14 },
	activationJWT: {
		secretKey: _secret2.default.activationJWT.secretKey,
		expiresIn: '1 days'
	},
	passwordReissueJWT: {
		secretKey: _secret2.default.passwordReissueJWT.secretKey,
		expiresIn: 60 * 10 },
	image: {
		contentSize: 1080,
		thumbnailSize: 300,
		avatarSize: 100
	},
	defaultAvatarFileName: 'default.jpg',
	contentsInterval: 20
};