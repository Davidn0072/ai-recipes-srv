import mongoose from 'mongoose';
import { mongoUri } from './config.js';

/* old way to connect to database
const connectDB = () => {
  mongoose
    .connect(mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(console.error);
};*/

let cachedConnection = null;

async function connectToDatabase() {
  if (cachedConnection) {
    console.log('Using cached MongoDB connection');
    return cachedConnection;
  }

  try {
    console.log('Creating new MongoDB connection');
    const connection = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    cachedConnection = connection;
    console.log('Connected to MongoDB');
    return connection;
  } catch (err) {
    console.log('MongoDB connection error:', err);
    throw err;
  }
}

//export default connectDB;// old way to connect to database
export default connectToDatabase;

