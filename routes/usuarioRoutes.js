import express from 'express'
import { cadastrarUsuario, pegarUsuario, loginUsuario } from '../controllers/usuarioController.js'
import autenticarToken from '../middlewares/autenticarToken.js'


const router = express.Router()

router.post('/usuarios/cadastro', cadastrarUsuario)
router.post('usuario/login', loginUsuario)
router.get('/usuario/:email', autenticarToken, pegarUsuario)

export default router