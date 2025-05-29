import express from 'express';

import autenticarToken from '../middlewares/autenticarToken.js';
import { gerarCodigo, verificarCodigo } from '../middlewares/autenticarEmail.js';
import {
  cadastrarUsuario,
  loginUsuario,
  pegarUsuario,
  removerUsuario,
} from '../controllers/usuarioController.js';

const router = express.Router();
router.get('/usuarios/me', autenticarToken, pegarUsuario);
router.delete('/usuarios/me', autenticarToken, removerUsuario);
router.post('/usuarios/cadastro', verificarCodigo, cadastrarUsuario);
router.post('/usuarios/cadastro/codigo', gerarCodigo);
router.post('/usuarios/login', loginUsuario);

export default router;
