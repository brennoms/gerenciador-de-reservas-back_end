import { buscarImoveis, buscarImovel, criarImovel, excluirImovel } from '../models/imoveisModel.js';

export async function adicionarImovel(req, res) {
  const { usuario_id } = req.usuario;
  const { nome, imagem, endereco } = req.body;
  if (!nome || !imagem || !endereco) {
    return res.status(400).json({ erro: 'Nome, imagem e endereço são obrigatórios' });
  }
  const imovel = {
    nome: nome,
    imagem: imagem,
    endereco: endereco,
  };
  try {
    const resultado = await criarImovel(usuario_id, imovel);
    return res.status(200).json({ imovel_id: resultado.insertedId });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro interno ao criar novo imóvel' });
  }
}

export async function removerImovel(req, res) {
  const { usuario_id } = req.usuario;
  const { imovel_id } = req.params;
  try {
    if (!(await buscarImovel(usuario_id, imovel_id))) {
      return res.status(404).json({ erro: 'Imóvel não encontrado' });
    }
    await excluirImovel(usuario_id, imovel_id);
    return res.status(200).json({ mensagem: 'Imóvel excluído com sucesso' });
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({ erro: 'erro interno ao excluir o imovel' });
  }
}

export async function pegarImovel(req, res) {
  const { usuario_id } = req.usuario;
  const { imovel_id } = req.params;
  try {
    const imovel = await buscarImovel(usuario_id, imovel_id);
    if (!imovel) {
      return res.status(404).json({ erro: 'Imóvel não encontrado' });
    }
    return res.status(200).json(imovel);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao buscar imóvel' });
  }
}

export async function pegarImoveis(req, res) {
  const { usuario_id } = req.usuario;
  try {
    const imoveis = await buscarImoveis(usuario_id);
    return res.status(200).json({ imoveis });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao buscar imóveis' });
  }
}
