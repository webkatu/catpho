import nodemailer from 'nodemailer';
import config from '../config.js';

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
		const { to, activationURL } = params;
		return await sendMail({
			from: config.mail.from,
			to,
			subject: 'activation',
			html: `please access to <a href="${activationURL}">${activationURL}</a>`,
		});
	},
};