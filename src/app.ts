
// Author: Pasima
// Date: 2025-07-31
// Purpose: Express application setup

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';


import authRoutes from './routes/auth';

import authRoutes from "./routes/auth";

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/health', (_, res) => res.json({ status: 'ok' }));

app.use('/auth', authRoutes);

app.use("/auth", authRoutes);


export default app;
