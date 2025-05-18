import { ObjectId } from 'mongodb';

import connect from './database.js';

export async function criarReserva(usuario_id, imovel_id, novaReserva) {
  const db = await connect();

  const [anoInicio, mesInicio, diaInicio] = novaReserva.data_inicio.split('-').map(Number);
  const [anoFim, mesFim, diaFim] = novaReserva.data_fim.split('-').map(Number);

  const dataInicio = new Date(Date.UTC(anoInicio, mesInicio - 1, diaInicio));
  const dataFim = new Date(Date.UTC(anoFim, mesFim - 1, diaFim));

  if (isNaN(dataInicio) || isNaN(dataFim)) {
    return false;
  }

  const reserva = {
    usuario_id: new ObjectId(usuario_id),
    imovel_id: new ObjectId(imovel_id),
    nome: novaReserva.nome,
    contato: novaReserva.contato,
    sinal: novaReserva.sinal,
    valor: novaReserva.valor,
    data_inicio: dataInicio,
    data_fim: dataFim,
    observacoes: novaReserva.observacoes,
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
        .find({
          usuario_id: new ObjectId(usuario_id),
          imovel_id: new ObjectId(imovel_id),
        })
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

export async function buscarReservasPorPeriodo(usuario_id, imovel_id, data_inicio, data_fim) {
  const db = await connect();

  const [anoInicio, mesInicio, diaInicio] = data_inicio.split('-').map(Number);
  const [anoFim, mesFim, diaFim] = data_fim.split('-').map(Number);

  const dataInicioUTC = new Date(Date.UTC(anoInicio, mesInicio - 1, diaInicio, 0, 0, 0));
  const dataFimUTC = new Date(Date.UTC(anoFim, mesFim - 1, diaFim, 23, 59, 59, 999)); // Fim do dia

  if (isNaN(dataInicioUTC) || isNaN(dataFimUTC)) {
    return { sucesso: false, mensagem: 'Data inválida.' };
  }

  const reservas = await db
    .collection('reservas')
    .find({
      usuario_id: new ObjectId(usuario_id),
      imovel_id: new ObjectId(imovel_id),
      data_inicio: { $lte: dataFimUTC },
      data_fim: { $gte: dataInicioUTC },
    })
    .toArray();

  return reservas || [];
}
