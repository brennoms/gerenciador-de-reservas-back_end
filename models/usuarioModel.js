import { ObjectId } from 'mongodb';

import connect from './database.js';

export async function encontrarPorEmail(email) {
  const db = await connect();
  return db.collection('usuarios').findOne({ email });
}

export async function encontrarPorId(id) {
  const db = await connect();
  return db.collection('usuarios').findOne({ _id: new ObjectId(id) });
}

export async function criarUsuario(usuario) {
  const db = await connect();
  return db.collection('usuarios').insertOne(usuario);
}

export async function excluirUsuario(id) {
  const db = await connect();
  await db.collection('usuarios').deleteOne({ _id: new ObjectId(id) });
}
