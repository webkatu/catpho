import secret from './secret.js';
const appServer = 'http://192.168.1.138:3000';
const apiServer = 'http://192.168.1.138:3001';

export default {
	appServer,
	apiServer,
	mysql: {
		host: 'localhost',
		user: secret.mysql.user,
		password: secret.mysql.password,
		database: 'catpho',
	},
	uploadsDir: __dirname + '/uploads',
	avatarsDir: __dirname + '/uploads/avatars',
	contentsDir: __dirname + '/uploads/contents',
	tmpDir: __dirname + '/uploads/tmp',
	avatarsUrl: apiServer + '/uploads/avatars',
	contentsUrl: apiServer + '/uploads/contents',
	thumbnailsUrl: apiServer + '/uploads/contents/thumbnails',
	bcrypt: {
		salt: secret.bcrypt.salt,
	},
	mail: {
		smtpConfig: {
			host: 'smtp.gmail.com',
			port: '587',
			auth: {
				user: secret.mail.smtpConfig.auth.user,
				pass: secret.mail.smtpConfig.auth.pass,
			},
			tls: {
				ciphers: 'SSLv3',
			},
		},
		from: 'mail@catpho.webkatu.com',
	},
	userAuthJWT: {
		secretKey: secret.userAuthJWT.secretKey,
		expiresIn: 1000 * 60 * 60 * 24 * 14, //millsecond;
	},
	activationJWT: {
		secretKey: secret.activationJWT.secretKey,
		expiresIn: '1 days',
	},
	passwordReissueJWT: {
		secretKey: secret.passwordReissueJWT.secretKey,
		expiresIn: 60 * 10, //second;
	},
	image: {
		contentSize: 1080,
		thumbnailSize: 300,
		avatarSize: 100,
	},
	defaultAvatarFileName: 'default.jpg',
	contentsInterval: 20,
}