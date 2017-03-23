import secret from './secret.js';

export default {
	appServer: 'http://192.168.1.138:3000',
	mysql: {
		host: 'localhost',
		user: secret.mysql.user,
		password: secret.mysql.password,
		database: 'catpho',
	},
	mongodb: {
		uri: 'mongodb://localhost/catpho',
	},
	contentsDir: __dirname + '/uploads/contents',
	tmpDir: __dirname + '/uploads/tmp',
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
		from: 'mail@webkatu.com',
	},
	activationCodeTimeLimit: 1000 * 60 * 60 * 24 * 1,
	userAuthJWT: {
		secretKey: secret.userAuthJWT.secretKey,
		expiresIn: 1000 * 60 * 60 * 24 * 14,
	},
	activationJWT: {
		secretKey: secret.activationJWT.secretKey,
		expiresIn: '1 days',
	},
	image: {
		contentSize: 1080,
		thumbnailSize: 300,
		avatarSize: 100,
	},
	defaultAvatarFileName: 'default.jpg',
}