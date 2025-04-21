import { criarReservas, pegarReservas, excluirReservas } from '../models/reservaModel.js';

export async function fazerReservas(req, res) {
  const { user_id } = req.usuario;
  const { imovel_id } = req.params;
  const { reservas } = req.body;
  try {
    await criarReservas(user_id, imovel_id, reservas);
    return res.json({ mensagem: 'reservas feita' });
  } catch (erro) {
    console.log(erro);
    return res.status(404).json({ erro: 'erro interno ao tentar fazer a reserva' });
  }
}

export async function buscarReservas(req, res) {
  const { user_id } = req.usuario;
  const { imovel_id } = req.params;
  try {
    const reservas = await pegarReservas(user_id, imovel_id);
    return res.json({ reservas });
  } catch (erro) {
    console.log(erro);
    return res.json({ erro: 'erro interno ao buscar as reservas' });
  }
}

export async function deletarReservas(req, res) {
  const { user_id } = req.usuario;
  const { imovel_id } = req.params;
  const { reservas_ids } = req.body;
  try {
    await excluirReservas(user_id, imovel_id, reservas_ids);
    return res.json({ mensagem: 'reservas canceladas' });
  } catch (erro) {
    console.log(erro);
    return res.json({ erro: 'erro ao cancelar reservas' });
  }
}
