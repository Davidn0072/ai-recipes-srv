import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import connectDB from './configs/db.js';
import recipesRouter from './routers/recipesRouter.js';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/recipes', recipesRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});