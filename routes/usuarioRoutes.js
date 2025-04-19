import express from 'express'
import { cadastrarUsuario, pegarUsuario } from '../controllers/usuarioController.js'


const router = express.Router()

router.post('/usuarios/cadastro', cadastrarUsuario)
router.get('/usuario/:email', pegarUsuario)

export default router