import mongoose from 'mongoose';
import mongodbConnection from '../common/mongodbConnection.js'

const ActivationCodesSchema = new mongoose.Schema({
	code: String,
	userId: Number,
	created: { type: Date, default: new Date() },
});

export default mongoose.model('ActivationCodes', ActivationCodesSchema);