import express from 'express';
import cors from 'cors';

import reservaRoutes from './routes/reservaRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import imoveisRoutes from './routes/imoveisRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', usuarioRoutes);
app.use('/api', imoveisRoutes);
app.use('/api', reservaRoutes);

export default app;
