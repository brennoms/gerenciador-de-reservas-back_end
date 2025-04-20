import { ObjectId } from 'mongodb'
import connect from './database.js'

export async function pegarReservas(user_id, imovel_id) {
  const db = await connect()
  const usuario = await db.collection('usuarios').findOne({
      _id: new ObjectId(user_id),
      'imoveis._id': new ObjectId(imovel_id)
    }, {
      projection: {
        imoveis: {$elemMatch: { _id: new ObjectId(imovel_id) }
        }
      }
    })
  return usuario?.imoveis?.[0]?.reservas || []
}

export async function criarReservas(user_id, imovel_id, reservas) {
  const db = await connect()
  const docs = reservas.map(reserva => ({
    _id: new ObjectId(),
    ...reserva
  }))
  return db.collection('usuarios').updateOne
  ({
    _id: new ObjectId(user_id), 
    'imoveis._id': new ObjectId(imovel_id) 
  }, {
    $push: { 'imoveis.$.reservas': { $each: docs } }
  })
}

export async function excluirReservas(user_id, imovel_id, reservas_ids) {
  const db = await connect()
  const idsConvertidos = reservas_ids.map(id => new ObjectId(id))

  return db.collection('usuarios').updateOne(
    {
      _id: new ObjectId(user_id),
      'imoveis._id': new ObjectId(imovel_id)
    },
    {
      $pull: {
        'imoveis.$.reservas': {
          _id: { $in: idsConvertidos }
        }
      }
    }
  )
}
