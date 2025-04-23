import express from 'express';

import autenticarToken from '../middlewares/autenticarToken.js';
import {
  cadastrarUsuario,
  loginUsuario,
  pegarUsuario,
  removerUsuario,
} from '../controllers/usuarioController.js';

const router = express.Router();
router.get('/usuarios/me', autenticarToken, pegarUsuario);
router.delete('/usuarios/me', autenticarToken, removerUsuario);
router.post('/usuarios/cadastro', cadastrarUsuario);
router.post('/usuarios/login', loginUsuario);

export default router;
