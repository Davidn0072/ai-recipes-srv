import mongoose from 'mongoose';
import { mongoUri } from './config.js';

const connectDB = () => {
  mongoose
    .connect(mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(console.error);
};

export default connectDB;
