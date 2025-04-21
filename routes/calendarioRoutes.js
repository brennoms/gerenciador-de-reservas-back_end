import express from 'express';

import calendario from '../controllers/calendario.js';

const router = express.Router();
router.get('/calendario', calendario);

export default router;
