import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js'
import persAccoutRouter from './routes/me.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/me', persAccoutRouter);

export default app;