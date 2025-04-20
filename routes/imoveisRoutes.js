import express from 'express'
import { pegarImoveis, pegarImovel, adicionarImovel, removerImovel } from '../controllers/imoveisController.js'
import autenticarToken from '../middlewares/autenticarToken.js'

const router = express.Router()

router.get('/imoveis', autenticarToken,pegarImoveis)
router.get('/imoveis/:imovel_id', autenticarToken, pegarImovel)
router.post('/imoveis', autenticarToken,adicionarImovel)
router.delete('/imoveis/:imovel_id', autenticarToken, removerImovel)

export default router
