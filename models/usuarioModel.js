import connect from './database.js'

async function encontrarPorEmail(email) {
  const db = await connect()
  return db.collection('usuarios').findOne({ email })
}

async function criarUsuario(usuario) {
  const db = await connect()
  return db.collection('usuarios').insertOne(usuario)
}

export { encontrarPorEmail, criarUsuario }