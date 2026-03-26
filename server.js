import './loadEnv.js';

import express from 'express';
import cors from 'cors';

import { port } from './configs/config.js';
import connectDB from './configs/db.js';
import recipesRouter from './routers/recipesRouter.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/recipes', recipesRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB();
});