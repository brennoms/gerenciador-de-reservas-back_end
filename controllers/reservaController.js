import { criarReservas, pegarReservas, excluirReservas } from '../models/reservaModel.js';

export async function fazerReservas(req, res) {
  const { usuario_id } = req.usuario;
  const { imovel_id } = req.params;
  const { reservas } = req.body;
  try {
    await criarReservas(usuario_id, imovel_id, reservas);
    return res.json({ mensagem: 'reservas feita' });
  } catch (erro) {
    console.log(erro);
    return res.status(404).json({ erro: 'erro interno ao tentar fazer a reserva' });
  }
}

export async function buscarReservas(req, res) {
  const { usuario_id } = req.usuario;
  const { imovel_id } = req.params;
  try {
    const reservas = await pegarReservas(usuario_id, imovel_id);
    return res.json({ reservas });
  } catch (erro) {
    console.log(erro);
    return res.json({ erro: 'erro interno ao buscar as reservas' });
  }
}

export async function deletarReservas(req, res) {
  const { usuario_id } = req.usuario;
  const { imovel_id } = req.params;
  const { reservas } = req.body;
  const reservas_id = reservas.map(reserva => reserva._id);
  try {
    await excluirReservas(usuario_id, imovel_id, reservas_id);
    return res.json({ mensagem: 'reservas canceladas' });
  } catch (erro) {
    console.log(erro);
    return res.json({ erro: 'erro ao cancelar reservas' });
  }
}
