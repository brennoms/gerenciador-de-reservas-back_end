import request from 'supertest';
import app from '../../index.js';

const usuario = {
  nome: process.env.USUARIO_NOME,
  email: process.env.USUARIO_EMAIL,
  senha: process.env.USUARIO_SENHA,
};

const loginOuCadastro = async () => {
  let res = await request(app).post('/api/usuarios/login').send({
    email: usuario.email,
    senha: usuario.senha,
  });

  if (res.statusCode === 401) {
    await request(app).post('/api/usuarios/cadastro').send(usuario);
    res = await request(app).post('/api/usuarios/login').send({
      email: usuario.email,
      senha: usuario.senha,
    });
  }

  return res.body.token;
};

export default await loginOuCadastro();
