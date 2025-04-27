import express from 'express';

import autenticarToken from '../middlewares/autenticarToken.js';
import {
  listarTodasReservas,
  listarReservasPorImovel,
  pegarReserva,
  fazerReserva,
  deletarReserva,
} from '../controllers/reservaController.js';

const router = express.Router();
router.get('/reservas', autenticarToken, listarTodasReservas);
router.get('/reservas/:reserva_id', autenticarToken, pegarReserva);
router.get('/imoveis/:imovel_id/reservas', autenticarToken, listarReservasPorImovel);
router.post('/imoveis/:imovel_id/reservas', autenticarToken, fazerReserva);
router.delete('/imoveis/:imovel_id/reservas/:reserva_id', autenticarToken, deletarReserva);

export default router;
