import request from 'supertest';
import app from '../../index.js';

const usuario = {
  nome: 'nome usuario',
  email: 'email@teste.com',
  senha: 'usuariosenha',
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
