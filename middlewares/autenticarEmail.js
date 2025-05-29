import { enviarCodigo, salvarCodigo, consultarCodigo } from '../utils/emailUtils.js';
import { encontrarPorEmail } from '../models/usuarioModel.js';

export async function gerarCodigo(req, res) {
  const { email } = req.body;

  try {
    if (await encontrarPorEmail(email)) {
      return res.status(400).json({ error: 'Usuário já cadastrado' });
    }

    const codigo = Math.floor(100000 + Math.random() * 900000); // Gera código de 6 dígitos
    salvarCodigo(email, String(codigo));

    if ((await enviarCodigo(email, codigo)) === true) {
      res.status(201).json({ ok: true });
    } else {
      res.status(500).json({ error: 'Falha ao enviar o código' });
    }
  } catch (err) {
    console.error('Erro ao enviar o código:', err);
    res.status(500).json({ error: 'Falha ao enviar o código' });
  }
}

export async function verificarCodigo(req, res, next) {
  const { email, codigo } = req.body;
  const valido = consultarCodigo(email, codigo);
  if (valido) {
    next();
  } else {
    res.status(401).json({ autenticado: false });
  }
}
