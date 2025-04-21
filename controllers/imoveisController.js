import { ObjectId } from 'mongodb';

import { buscarImoveis, buscarImovel, criarImovel, excluirImovel } from '../models/imoveisModel.js';

export async function pegarImoveis(req, res) {
  const { user_id } = req.usuario;
  try {
    const imoveis = await buscarImoveis(user_id);
    return res.json(imoveis);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao buscar imóveis' });
  }
}

export async function pegarImovel(req, res) {
  const { usuario_id } = req.usuario;
  const { imovel_id } = req.params;
  try {
    const imovel = await buscarImovel(usuario_id, imovel_id);
    return res.json(imovel);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao buscar imóvel' });
  }
}

export async function adicionarImovel(req, res) {
  const usuario_id = req.usuario.user_id;
  const { nome, imagem, endereco } = req.body;
  const imovel = {
    _id: new ObjectId(),
    nome: nome || 'não fornecido',
    imagem: imagem || 'não fornecido',
    endereco: endereco || 'não fornecido',
    reservas: [],
  };
  try {
    await criarImovel(usuario_id, imovel);
    return res.json({ mensagem: 'Imóvel adicionado com sucesso' });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro interno ao criar novo imóvel' });
  }
}

export async function removerImovel(req, res) {
  const { usuario_id } = req.usuario;
  const { imovel_id } = req.params;
  try {
    await excluirImovel(usuario_id, imovel_id);
    return res.json({ mensagem: 'imovel excluido com sucesso' });
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({ erro: 'erro interno ao excluir o imovel' });
  }
}
