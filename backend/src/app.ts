import express from 'express';
import { authRouter } from './routes/auth';

export const app = express();
app.use(express.json());

app.use('/api/auth/', authRouter);
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});
