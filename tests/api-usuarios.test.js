import request from 'supertest';
import app from '../index.js';
import { usuario, loginOuCadastro } from './utils/logar.js';
import { limparBanco, fecharConexao } from './utils/limparBanco.js';
import { consultarCodigo } from '../utils/emailUtils.js';
import { loginUsuario } from '../controllers/usuarioController.js';

let token = null;

beforeEach(async () => {
  await limparBanco();
});

afterAll(async () => fecharConexao());

describe('Testes de POST /api/usuarios/cadastro', () => {
  it('cadastro correto. status deve ser 201', async () => {
    const codigo = (
      await request(app).post('/api/usuarios/cadastro/codigo').send({ email: usuario.email })
    ).body.codigo;
    const res = await request(app)
      .post('/api/usuarios/cadastro')
      .send({
        ...usuario,
        codigo: codigo,
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.mensagem).toBe('Usuário cadastrado com sucesso.');
  });

  it('cadastro com dados faltando. status deve ser 400.', async () => {
    const codigo = (
      await request(app).post('/api/usuarios/cadastro/codigo').send({ email: usuario.email })
    ).body.codigo;
    const res = await request(app)
      .post('/api/usuarios/cadastro')
      .send({ email: usuario.email, codigo: codigo });
    expect(res.body.erro).toBe('Todos os campos são obrigatórios.');
    expect(res.statusCode).toBe(400);
  });

  it('cadastro com email invalido. status deve ser 400.', async () => {
    const codigo = (
      await request(app).post('/api/usuarios/cadastro/codigo').send({ email: 'emailprovisório' })
    ).body.codigo;
    const res = await request(app).post('/api/usuarios/cadastro').send({
      nome: 'nome_provisório',
      email: 'emailprovisório',
      senha: 'senha_provisória',
      codigo: codigo,
    });
    expect(res.body.erro).toBe('E-mail inválido.');
    expect(res.statusCode).toBe(400);
  });

  it('cadastro com email repetido. status deve ser 400.', async () => {
    const codigo = (
      await request(app).post('/api/usuarios/cadastro/codigo').send({ email: usuario.email })
    ).body.codigo;
    await request(app)
      .post('/api/usuarios/cadastro')
      .send({
        ...usuario,
        codigo: codigo,
      });
    const res = await request(app)
      .post('/api/usuarios/cadastro')
      .send({
        ...usuario,
        codigo: codigo,
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.erro).toBe('E-mail já cadastrado.');
  });
});

describe('Testes de POST /api/usuarios/login', () => {
  it('login correto. status deve ser 200.', async () => {
    await loginOuCadastro();
    const res = await request(app).post('/api/usuarios/login').send({
      email: usuario.email,
      senha: usuario.senha,
    });
    expect(res.statusCode).toBe(200);
    token = res.body.token;
    expect(token).not.toBeNull();
  });

  it('login com usuario não cadastrado. status deve ser 401.', async () => {
    const res = await request(app).post('/api/usuarios/login').send({
      email: 'email@não_existe',
      senha: 'senha_provisória',
    });
    expect(res.statusCode).toBe(401);
  });

  it('login com senha errada. status deve ser 401.', async () => {
    const res = await request(app).post('/api/usuarios/login').send({
      email: 'email@provisorio.com',
      senha: 'senha_provisória_errada',
    });
    expect(res.statusCode).toBe(401);
  });
});

describe('Testes de /api/usuarios/me', () => {
  describe('Testes de GET /api/usuarios/me', () => {
    it('pegar usuario correto. status deve ser 200.', async () => {
      token = await loginOuCadastro();
      const res = await request(app)
        .get('/api/usuarios/me')
        .set({ Authorization: `Bearer ${token}` });
      expect(res.statusCode).toBe(200);
    });

    it('pegar usuario sem token. status deve ser 401.', async () => {
      const res = await request(app).get('/api/usuarios/me');
      expect(res.statusCode).toBe(401);
    });

    it('pegar usuario com token invalido. status deve ser 403.', async () => {
      const res = await request(app)
        .get('/api/usuarios/me')
        .set({ Authorization: `Bearer ${token}invalido` });
      expect(res.statusCode).toBe(403);
    });
  });

  describe('Testes de DELETE /api/usuarios/me', () => {
    it('deletar usuario correto. status deve ser 200.', async () => {
      const res = await request(app)
        .delete('/api/usuarios/me')
        .set({ Authorization: `Bearer ${token}` });
      expect(res.statusCode).toBe(200);
    });

    it('deletar usuario sem token. status deve ser 401.', async () => {
      const res = await request(app).delete('/api/usuarios/me');
      expect(res.statusCode).toBe(401);
    });

    it('deletar usuario com token invalido. status deve ser 403.', async () => {
      const res = await request(app)
        .delete('/api/usuarios/me')
        .set({ Authorization: `Bearer ${token}invalido` });
      expect(res.statusCode).toBe(403);
    });
  });
});
