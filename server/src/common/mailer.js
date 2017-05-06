import nodemailer from 'nodemailer';
import config from '../config.js';
import registerMail from '../mails/registerMail.js';
import activationMail from '../mails/activationMail.js';
import passwordReissueRequestMail from '../mails/passwordReissueRequestMail.js';
import passwordReissueMail from '../mails/passwordReissueMail.js';

export default {
	async sendMail(mailOptions) {
		const transporter = nodemailer.createTransport(config.mail.smtpConfig);

		return await new Promise((res, rej) => {
			transporter.sendMail(mailOptions, (error, info) => {
				if(error) return rej(error);
				res(info);
			});
		});
	},

	async sendRegisterMail(params) {
		const { to, userName, activationToken } = params;

		const activationURL = `${config.appServer}/mypage/activation/?token=${activationToken}`;
		return await this.sendMail({
			from: config.mail.from,
			to,
			subject: 'ユーザー登録されました',
			html: registerMail.render({
				userName,
				activationURL,
				appServer: config.appServer,
			}),
		});
	},

	async sendActivationMail(params) {
		const { to, userName, activationToken } = params;

		const activationURL = `${config.appServer}/mypage/activation/?token=${activationToken}`;
		return await this.sendMail({
			from: config.mail.from,
			to,
			subject: 'メールアドレスのアクチベーション',
			html: activationMail.render({
				userName,
				activationURL,
				appServer: config.appServer,
			}),
		});
	},

	async sendPasswordReissueRequestMail(params) {
		const { to, userName, passwordReissueToken } = params;

		const passwordReissueURL = `${config.appServer}/other/passwordreissue/?token=${passwordReissueToken}&userName=${userName}`;
		return await this.sendMail({
			from: config.mail.from,
			to,
			subject: 'パスワード再発行リクエスト',
			html: passwordReissueRequestMail.render({
				userName,
				passwordReissueURL,
				appServer: config.appServer,
			}),
		});
	},

	async sendPasswordReissueMail(params) {
		const { to, userName, password } = params;

		return await this.sendMail({
			from: config.mail.from,
			to,
			subject: 'パスワード再発行',
			html: passwordReissueMail.render({
				userName,
				password,
				appServer: config.appServer,
			}),
		});
	},
};