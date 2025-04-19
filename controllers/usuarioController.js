import bcryptjs from 'bcryptjs'
import { encontrarPorEmail, criarUsuario } from '../models/usuarioModel.js'

export async function cadastrarUsuario(req, res) {
  const { nome, email, senha } = req.body

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' })
  }

  const existente = await encontrarPorEmail(email)
  if (existente) {
    return res.status(400).json({ erro: 'E-mail já cadastrado.' })
  }

  const senhaCriptografada = await bcryptjs.hash(senha, 10)
  await criarUsuario({ nome, email, senha: senhaCriptografada })

  res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso.' })
}

export async function pegarUsuario (req, res) {
  const { email } = req.params
  const usuario = await encontrarPorEmail (email)
  if (usuario) {
    return res.json(usuario)
  } else {
    return res.json({erro:"email não existe"})
  }
}
