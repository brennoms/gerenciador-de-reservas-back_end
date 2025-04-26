import { ObjectId } from 'mongodb';

import connect from './database.js';

export async function criarImovel(usuario_id, imovel) {
  const db = await connect();
  const novoImovel = { usuario_id: new ObjectId(usuario_id), ...imovel };
  const resultado = await db.collection('imoveis').insertOne(novoImovel);
  return resultado;
}

export async function excluirImovel(usuario_id, imovel_id) {
  const db = await connect();
  const resultado = await db.collection('imoveis').deleteOne({
    _id: new ObjectId(imovel_id),
    usuario_id: new ObjectId(usuario_id),
  });
  return resultado;
}

export async function buscarImovel(usuario_id, imovel_id) {
  const db = await connect();
  const imovel = await db.collection('imoveis').findOne({
    _id: new ObjectId(imovel_id),
    usuario_id: new ObjectId(usuario_id),
  });
  return imovel;
}

export async function buscarImoveis(usuario_id) {
  const db = await connect();
  const imoveis = await db
    .collection('imoveis')
    .find({ usuario_id: new ObjectId(usuario_id) })
    .toArray();
  return imoveis;
}
