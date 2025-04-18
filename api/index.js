// para testar localmente
// rode npm run start

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import calendario from './calendario.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/calendario', calendario)

const porta = process.env.PORTA_HOST_API
const servidor = process.env.SERVIDOR_HOST_API
app.listen(porta, () => {
  console.log(`🚀 Servidor rodando em ${servidor}`)
});
