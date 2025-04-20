import connect from './database.js'

export async function encontrarPorEmail(email) {
  const db = await connect()
  return db.collection('usuarios').findOne({ email })
}

export async function criarUsuario(usuario) {
  const db = await connect()
  return db.collection('usuarios').insertOne(usuario)
}
