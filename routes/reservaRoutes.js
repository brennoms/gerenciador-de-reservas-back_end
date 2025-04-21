import express from 'express';

import autenticarToken from '../middlewares/autenticarToken.js';
import {
  fazerReservas,
  buscarReservas,
  deletarReservas,
} from '../controllers/reservaController.js';

const router = express.Router();
router.get('/:imovel_id/reservas', autenticarToken, buscarReservas);
router.post('/:imovel_id/reservas', autenticarToken, fazerReservas);
router.delete('/:imovel_id/reservas', autenticarToken, deletarReservas);

export default router;
