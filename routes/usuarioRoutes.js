import express from 'express';

import autenticarToken from '../middlewares/autenticarToken.js';
import {
  cadastrarUsuario,
  loginUsuario,
  pegarUsuario,
  removerUsuario,
} from '../controllers/usuarioController.js';

const router = express.Router();
router.get('/usuario/me', autenticarToken, pegarUsuario);
router.delete('/usuario/me', autenticarToken, removerUsuario);
router.post('/usuario/cadastro', cadastrarUsuario);
router.post('/usuario/login', loginUsuario);

export default router;
