import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import calendarioRoutes from './routes/calendarioRoutes.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', calendarioRoutes)

const porta = process.env.PORT || 3000
app.listen(porta, () => {
  console.log(`🚀 Servidor rodando na porta ${porta}`)
})