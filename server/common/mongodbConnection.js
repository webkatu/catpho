import mongoose from 'mongoose';
import config from '../config.js';

mongoose.connect(config.mongodb.url)