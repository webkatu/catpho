import nodemailer from 'nodemailer';
import config from '../config.js';

export default async (mailOptions) => {

	const transporter = nodemailer.createTransport(config.mail.smtpConfig);

	return await new Promise((res, rej) => {
		transporter.sendMail(mailOptions, (error, info) => {
			if(error) return rej(error);
			res(info);
		});
	});
}