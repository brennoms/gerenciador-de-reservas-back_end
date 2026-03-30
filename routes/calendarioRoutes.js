import express from 'express';

import calendarioRestrito from '../controllers/calendarioRestritoControler.js';
import autenticarToken from '../middlewares/autenticarToken.js';
import {getFeriados} from '../controllers/calendarioControler.js';

const router = express.Router();
router.get('/:imovel_id/calendario/restrito', autenticarToken, calendarioRestrito);
router.get('/calendario/feriados', autenticarToken, getFeriados);

export default router;
