import express from 'express'
import { cadastrarUsuario, loginUsuario, pegarUsuario, removerUsuario } from '../controllers/usuarioController.js'
import autenticarToken from '../middlewares/autenticarToken.js'


const router = express.Router()

router.post('/usuario/cadastro', cadastrarUsuario)
router.post('/usuario/login', loginUsuario)
router.get('/usuario', autenticarToken, pegarUsuario)
router.delete('/usuario', autenticarToken, removerUsuario)

export default router
