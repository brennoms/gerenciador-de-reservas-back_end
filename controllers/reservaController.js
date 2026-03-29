import {
  criarReserva,
  buscarReservas,
  excluirReserva,
  buscarReserva,
  buscarReservasPorPeriodo,
  atualizarReserva,
} from '../models/reservaModel.js';
import { buscarImovel } from '../models/imoveisModel.js';

export async function fazerReserva(req, res) {
  const { imovel_id } = req.params;
  const { usuario_id } = req.usuario;
  const novaReserva = req.body;
  const chavesObrigatorias = ['nome', 'contato', 'data_inicio', 'data_fim'];

  for (const chave of chavesObrigatorias) {
    if (!novaReserva[chave]) {
      return res.status(400).json({ erro: `Campo ${chave} é obrigatório` });
    }
  }
  if (!(novaReserva.data_inicio === novaReserva.data_fim)) {
    if (novaReserva.data_inicio >= novaReserva.data_fim) {
      return res.status(400).json({ erro: 'Data de início deve ser anterior à data de fim' });
    }
    if (novaReserva.data_inicio < new Date().toISOString().split('T')[0]) {
      return res.status(400).json({ erro: 'Data de início deve ser futura' });
    }
  }

  try {
    if (!(await buscarImovel(usuario_id, imovel_id))) {
      return res.status(404).json({ erro: 'Imóvel não encontrado' });
    }
    const diasOcupados = await buscarReservasPorPeriodo(
      usuario_id,
      imovel_id,
      novaReserva.data_inicio,
      novaReserva.data_fim
    );
    if (diasOcupados.length > 0) {
      return res.status(400).json({ erro: 'já existem reservas nesse periodo' });
    }
    const reserva = await criarReserva(usuario_id, imovel_id, novaReserva);
    if (!reserva) {
      return res.status(500).json({ erro: 'Erro ao criar reserva' });
    }
    return res.status(200).json({ reserva_id: reserva.insertedId });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno no servidor' });
  }
}

export async function deletarReserva(req, res) {
  const { imovel_id, reserva_id } = req.params;
  const { usuario_id } = req.usuario;

  try {
    if (!(await buscarImovel(usuario_id, imovel_id))) {
      return res.status(404).json({ erro: 'Imóvel não encontrado' });
    }
    const resultado = await excluirReserva(usuario_id, imovel_id, reserva_id);
    if (!resultado.deletedCount) {
      return res.status(404).json({ erro: 'Reserva não encontrada' });
    }
    return res.status(200).json({ mensagem: 'Reserva excluída com sucesso' });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno no servidor' });
  }
}

export async function listarReservasPorImovel(req, res) {
  const { imovel_id } = req.params;
  const { usuario_id } = req.usuario;

  try {
    if (!(await buscarImovel(usuario_id, imovel_id))) {
      return res.status(404).json({ erro: 'Imóvel não encontrado' });
    }
    const reservas = await buscarReservas(usuario_id, imovel_id);
    return res.status(200).json(reservas);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno no servidor' });
  }
}

export async function listarTodasReservas(req, res) {
  const { usuario_id } = req.usuario;

  try {
    const reservas = await buscarReservas(usuario_id);
    return res.status(200).json(reservas);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno no servidor' });
  }
}

export async function pegarReserva(req, res) {
  const { reserva_id } = req.params;
  const { usuario_id } = req.usuario;

  try {
    const reserva = await buscarReserva(usuario_id, reserva_id);
    if (!reserva) {
      return res.status(404).json({ erro: 'Reserva não encontrada' });
    }
    return res.status(200).json(reserva);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno no servidor' });
  }
}

export async function putReserva(req, res) {
  const { usuario_id } = req.usuario;
  const { reserva_id, imovel_id } = req.params;
  const chavesObrigatorias = [
    'nome',
    'contato',
    'data_inicio',
    'data_fim',
    'sinal',
    'valor',
    'observacoes',
  ];
  const novosDados = req.body;

  for (const chave of chavesObrigatorias) {
    if (!novosDados[chave]) {
      return res.status(400).json({ erro: `Campo ${chave} é obrigatório` });
    }
  }

  const data = {
    nome: novosDados.nome,
    contato: novosDados.contato,
    sinal: novosDados.sinal,
    valor: novosDados.valor,
    data_inicio: novosDados.data_inicio,
    data_fim: novosDados.data_fim,
    observacoes: novosDados.observacoes,
  };

  try {
    const reservaExistente = await buscarReserva(usuario_id, reserva_id);
    if (!reservaExistente) {
      return res.status(404).json({ erro: 'Reserva não encontrada' });
    }

    if (!(data.data_inicio === data.data_fim)) {
      if (data.data_inicio >= data.data_fim) {
        return res.status(400).json({ erro: 'Data de início deve ser anterior à data de fim' });
      }
      if (data.data_inicio < new Date().toISOString().split('T')[0]) {
        return res.status(400).json({ erro: 'Data de início deve ser futura' });
      }
    }

    const reserva_atualizada = await atualizarReserva(usuario_id, imovel_id, reserva_id, data);
    return res.status(200).json(reserva_atualizada);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao atualizar reserva' });
  }
}
