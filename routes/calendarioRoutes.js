import calendario from '../controllers/calendario.js'
import express from 'express'


const router = express.Router()
router.get('/calendario', calendario)
export default router