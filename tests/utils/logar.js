import request from 'supertest';
import app from '../../index.js';

export const usuario = {
  nome: 'nome usuario',
  email: 'usuario@teste.com',
  senha: 'usuariosenha',
};

export async function loginOuCadastro() {
  let res = await request(app).post('/api/usuarios/login').send({
    email: usuario.email,
    senha: usuario.senha,
  });

  if (res.statusCode === 401) {
    const codigo = (
      await request(app).post('/api/usuarios/cadastro/codigo').send({ email: usuario.email })
    ).body.codigo;
    await request(app)
      .post('/api/usuarios/cadastro')
      .send({ ...usuario, codigo: codigo });
    res = await request(app).post('/api/usuarios/login').send({
      email: usuario.email,
      senha: usuario.senha,
    });
  }

  return res.body.token;
}
