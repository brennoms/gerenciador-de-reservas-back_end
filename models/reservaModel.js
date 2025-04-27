import { ObjectId } from 'mongodb';

import connect from './database.js';

export async function criarReserva(usuario_id, imovel_id, novaReserva) {
  const db = await connect();

  const reserva = {
    usuario_id: new ObjectId(usuario_id),
    imovel_id: new ObjectId(imovel_id),
    nome: novaReserva.nome,
    contato: novaReserva.contato,
    data_inicio: novaReserva.data_inicio,
    data_fim: novaReserva.data_fim,
  };

  const resultado = db.collection('reservas').insertOne(reserva);
  return resultado;
}

export async function excluirReserva(usuario_id, imovel_id, reserva_id) {
  const db = await connect();

  const resultado = db.collection('reservas').deleteOne({
    usuario_id: new ObjectId(usuario_id),
    imovel_id: new ObjectId(imovel_id),
    _id: new ObjectId(reserva_id),
  });
  return resultado;
}

export async function buscarReservas(usuario_id, imovel_id) {
  const db = await connect();
  let resultado;

  if (!imovel_id) {
    resultado =
      db
        .collection('reservas')
        .find({ usuario_id: new ObjectId(usuario_id) })
        .toArray() || [];
  } else {
    resultado =
      db
        .collection('reservas')
        .find({ usuario_id: new ObjectId(usuario_id), imovel_id: new ObjectId(imovel_id) })
        .toArray() || [];
  }

  return resultado;
}

export async function buscarReserva(usuario_id, reserva_id) {
  const db = await connect();

  const resultado = db.collection('reservas').findOne({
    usuario_id: new ObjectId(usuario_id),
    _id: new ObjectId(reserva_id),
  });

  return resultado;
}
