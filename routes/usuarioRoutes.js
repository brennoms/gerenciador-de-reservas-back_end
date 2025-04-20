import express from 'express'
import { cadastrarUsuario, loginUsuario } from '../controllers/usuarioController.js'
import autenticarToken from '../middlewares/autenticarToken.js'


const router = express.Router()

router.post('/usuario/cadastro', cadastrarUsuario)
router.post('/usuario/login', loginUsuario)

export default router
