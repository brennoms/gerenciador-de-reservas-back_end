import express from 'express';

import multer from 'multer';
import { storage } from '../models/cloudinary.js';
import autenticarToken from '../middlewares/autenticarToken.js';
import {
  pegarImoveis,
  pegarImovel,
  adicionarImovel,
  removerImovel,
} from '../controllers/imoveisController.js';

const upload = multer({ storage });

const router = express.Router();
router.get('/imoveis', autenticarToken, pegarImoveis);
router.post('/imoveis', autenticarToken, upload.single('imagem'), adicionarImovel);
router.get('/imoveis/:imovel_id', autenticarToken, pegarImovel);
router.delete('/imoveis/:imovel_id', autenticarToken, removerImovel);

export default router;
