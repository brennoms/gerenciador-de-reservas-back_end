import express from 'express';

import calendarioRestrito from '../controllers/calendarioRestritoControler.js';
import calendario from '../controllers/calendarioControler.js';
import autenticarToken from '../middlewares/autenticarToken.js';

const router = express.Router();
router.get('/calendario/restrito', autenticarToken, calendarioRestrito);
router.get('/:user_id/calendario', calendario);

export default router;
