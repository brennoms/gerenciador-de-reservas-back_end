import express from 'express'
import cors from 'cors'
import { PORT } from './config.js'

import calendarioRoutes from './routes/calendarioRoutes.js'
import reservaRoutes from './routes/reservaRoutes.js'
import usuarioRoutes from './routes/usuarioRoutes.js'
import imoveisRoutes from './routes/imoveisRoutes.js'


const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', calendarioRoutes)
app.use('/api', reservaRoutes)
app.use('/api', usuarioRoutes)
app.use('/api', imoveisRoutes)

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`)
})