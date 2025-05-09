import express from 'express';
import cors from 'cors';

import { criarIndices } from './models/database.js';

import reservaRoutes from './routes/reservaRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import imoveisRoutes from './routes/imoveisRoutes.js';
import CalendarioRoutes from './routes/calendarioRoutes.js';

criarIndices();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', usuarioRoutes);
app.use('/api', imoveisRoutes);
app.use('/api', reservaRoutes);
app.use('/api', CalendarioRoutes);

export default app;
