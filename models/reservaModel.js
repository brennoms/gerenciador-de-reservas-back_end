import { ObjectId } from 'mongodb';

import connect from './database.js';

export async function criarReserva(usuario_id, imovel_id, novaReserva) {
  const db = await connect();

  const dataInicio = new Date(novaReserva.data_inicio);
  const dataFim = new Date(novaReserva.data_fim);

  if (isNaN(dataInicio) || isNaN(dataFim)) {
    return false;
  }

  const reserva = {
    usuario_id: new ObjectId(usuario_id),
    imovel_id: new ObjectId(imovel_id),
    nome: novaReserva.nome,
    contato: novaReserva.contato,
    data_inicio: new Date(dataInicio),
    data_fim: new Date(dataFim),
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

export async function buscarReservaPorPeriodo(usuario_id, imovel_id, data_inicio, data_fim) {
  const db = await connect();
  const reservas = db.collection('reservas');

  const resultado = await reservas
    .find({
      usuario_id,
      imovel_id,
      data: {
        $gte: new Date(data_inicio),
        $lte: new Date(data_fim),
      },
    })
    .toArray();

  return resultado;
}
