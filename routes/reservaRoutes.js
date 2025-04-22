import express from 'express';

import autenticarToken from '../middlewares/autenticarToken.js';
import {
  fazerReservas,
  buscarReservas,
  deletarReservas,
} from '../controllers/reservaController.js';

const router = express.Router();
router.get('/reservas/:imovel_id', autenticarToken, buscarReservas);
router.post('/reservas/:imovel_id', autenticarToken, fazerReservas);
router.delete('/reservas/:imovel_id', autenticarToken, deletarReservas);

export default router;
