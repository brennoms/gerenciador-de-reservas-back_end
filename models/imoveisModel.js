import { ObjectId } from 'mongodb'
import connect from './database.js'

export async function buscarImoveis(usuario_id) {
  const db = await connect()
  const usuario = await db.collection('usuarios').findOne(
    { _id: new ObjectId(usuario_id) },
    { projection: { imoveis: 1 } }
  )
  return usuario?.imoveis || []
}

export async function buscarImovel(usuario_id, imovel_id) {
  const db = await connect()
  const usuario = await db.collection('usuarios').findOne(
    {
      _id: new ObjectId(usuario_id),
      'imoveis._id': new ObjectId(imovel_id)
    },
    {
      projection: {
        imoveis: {
          $elemMatch: { _id: new ObjectId(imovel_id) }
        }
      }
    }
  )
  return usuario?.imoveis?.[0] || null
}

export async function criarImovel(usuario_id, imovel) {
  const db = await connect()
  await db.collection('usuarios').updateOne(
    { _id: new ObjectId(usuario_id) },
    { $push: { imoveis: imovel } }
  )
}

export async function excluirImovel(usuario_id, imovel_id) {
  const db = await connect()
  await db.collection('usuarios').updateOne(
    { _id: new ObjectId(usuario_id) },
    { $pull: { imoveis: { _id: new ObjectId(imovel_id) } } }
  )
}