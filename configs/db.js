import mongoose from 'mongoose';

const connectDB = () => {
  mongoose
    .connect('mongodb://localhost:27017/recipesDB')
    .then(() => console.log('Connected to recipesDB'))
    .catch(console.error);
};

export default connectDB;
