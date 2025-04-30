import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {
  encontrarPorEmail,
  encontrarPorId,
  criarUsuario,
  excluirUsuario,
} from '../models/usuarioModel.js';

export async function cadastrarUsuario(req, res) {
  const { nome, senha } = req.body;
  const email = req.body.email?.toLowerCase();
  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
  }
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email)) {
    return res.status(400).json({ erro: 'E-mail inválido.' });
  }
  try {
    const existente = await encontrarPorEmail(email);
    if (existente) {
      return res.status(400).json({ erro: 'E-mail já cadastrado.' });
    }
    const senhaCriptografada = await bcryptjs.hash(senha, 12);
    await criarUsuario({ nome, email, senha: senhaCriptografada });
    return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso.' });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'erro interno no servidor' });
  }
}

export async function loginUsuario(req, res) {
  const { email, senha } = req.body;
  try {
    const usuario = await encontrarPorEmail(email);
    if (!usuario) {
      return res.status(401).json({ erro: 'Usuário não encontrado' });
    }
    const senhaCorreta = await bcryptjs.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'Senha incorreta' });
    }
    const token = jwt.sign({ usuario_id: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });
    return res.status(200).json({ mensagem: 'Login realizado com sucesso', token });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'erro interno no servidor' });
  }
}

export async function pegarUsuario(req, res) {
  const id = req.usuario.usuario_id;
  try {
    const usuario = await encontrarPorId(id);
    if (!usuario) {
      return res.status(404).json({ erro: 'usuario não existe' });
    }
    return res.status(200).json(usuario);
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({ erro: 'erro interno no servidor' });
  }
}

export async function removerUsuario(req, res) {
  const id = req.usuario.usuario_id;
  try {
    await excluirUsuario(id);
    return res.status(200).json({ mensagem: 'usuario excluido com sucesso' });
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({ erro: 'erro interno no servidor' });
  }
}
