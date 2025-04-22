import express from 'express';

import autenticarToken from '../middlewares/autenticarToken.js';
import {
  pegarImoveis,
  pegarImovel,
  adicionarImovel,
  removerImovel,
} from '../controllers/imoveisController.js';

const router = express.Router();
router.get('/imoveis', autenticarToken, pegarImoveis);
router.post('/imoveis', autenticarToken, adicionarImovel);
router.get('/imoveis/:imovel_id', autenticarToken, pegarImovel);
router.delete('/imoveis/:imovel_id', autenticarToken, removerImovel);

export default router;
