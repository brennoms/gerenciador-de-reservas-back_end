import {
  buscarImoveis,
  buscarImovel,
  criarImovel,
  excluirImovel,
  atualizarImovel,
} from '../models/imoveisModel.js';

export async function adicionarImovel(req, res) {
  const { usuario_id } = req.usuario;
  const { nome, endereco } = req.body;
  if (!nome || !endereco) {
    return res.status(400).json({ erro: 'Nome e endereço são obrigatórios' });
  }
  if (!req.file) {
    return res.status(400).json({ error: 'Imagem não enviada corretamente' });
  }
  const imovel = {
    nome: nome,
    endereco: endereco,
  };
  try {
    imovel.imagem_url = req.file.path;
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

export async function patchImovel(req, res) {
  const { usuario_id } = req.usuario;
  const { imovel_id } = req.params;
  const { nome, endereco } = req.body;

  if (!nome && !endereco) {
    return res.status(400).json({ erro: 'Pelo menos um campo deve ser atualizado' });
  }

  try {
    const imovelExistente = await buscarImovel(usuario_id, imovel_id);
    if (!imovelExistente) {
      return res.status(404).json({ erro: 'Imóvel não encontrado' });
    }

    const dadosAtualizados = {};
    if (nome) dadosAtualizados.nome = nome;
    if (endereco) dadosAtualizados.endereco = endereco;
    if (req.file) dadosAtualizados.imagem_url = req.file.path;

    await atualizarImovel(usuario_id, imovel_id, dadosAtualizados);
    return res.status(200).json({ mensagem: 'Imóvel atualizado com sucesso' });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao atualizar imóvel' });
  }
}
