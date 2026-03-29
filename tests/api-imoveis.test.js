import request from 'supertest';
import app from '../index.js';
import { loginOuCadastro } from './utils/logar.js';

const token = await loginOuCadastro();

let imovel_id = null;

describe('Testes de api imoveis', () => {
  describe('GET /api/imoveis', () => {
    it('deve retornar 200 e uma lista de imóveis', async () => {
      const res = await request(app).get('/api/imoveis').set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('imoveis');
      expect(Array.isArray(res.body.imoveis)).toBe(true);
    });

    it('deve retornar 401 se o token não for fornecido', async () => {
      const res = await request(app).get('/api/imoveis');
      expect(res.statusCode).toBe(401);
    });

    it('deve retornar 403 se o token for inválido', async () => {
      const res = await request(app)
        .get('/api/imoveis')
        .set('Authorization', 'Bearer token-invalido');
      expect(res.statusCode).toBe(403);
    });
  });

  describe('POST /api/imoveis', () => {
    it('deve retornar 200 e adicionar um novo imóvel', async () => {
      const urlImagem = 'https://picsum.photos/200';
      const respostaImagem = await fetch(urlImagem);
      const arrayBuffer = await respostaImagem.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const res = await request(app)
        .post('/api/imoveis')
        .set('Authorization', `Bearer ${token}`)
        .field('nome', 'Casa de Praia')
        .field('endereco', 'Rua do Sol, 123')
        .attach('imagem', buffer, 'casa.jpg');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('imovel_id');

      imovel_id = res.body.imovel_id;
    });

    it('deve retornar 400 se os dados do imóvel estiverem incompletos', async () => {
      const imovelInvalido = {
        nome: 'Casa de Praia',
        imagem: 'https://example.com/imagem.jpg',
      };
      const res = await request(app)
        .post('/api/imoveis')
        .set('Authorization', `Bearer ${token}`)
        .send(imovelInvalido);
      expect(res.statusCode).toBe(400);
    });

    it('deve retornar 401 se o token não for fornecido', async () => {
      const novoImovel = {
        nome: 'Casa de Praia',
        imagem: 'https://example.com/imagem.jpg',
        endereco: 'Rua do Sol, 123',
      };
      const res = await request(app).post('/api/imoveis').send(novoImovel);
      expect(res.statusCode).toBe(401);
    });

    it('deve retornar 403 se o token for inválido', async () => {
      const novoImovel = {
        nome: 'Casa de Praia',
        imagem: 'https://example.com/imagem.jpg',
        endereco: 'Rua do Sol, 123',
      };
      const res = await request(app)
        .post('/api/imoveis')
        .set('Authorization', 'Bearer token-invalido')
        .send(novoImovel);
      expect(res.statusCode).toBe(403);
    });
  });

  describe('GET /api/imoveis/:imovel_id', () => {
    it('deve retornar 200 e o imóvel correspondente', async () => {
      const res = await request(app)
        .get(`/api/imoveis/${imovel_id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('_id', imovel_id);
    });

    it('deve retornar 404 se o imóvel não for encontrado', async () => {
      const res = await request(app)
        .get('/api/imoveis/123456789abcdef123456789')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('erro', 'Imóvel não encontrado');
    });

    it('deve retornar 401 se o token não for fornecido', async () => {
      const res = await request(app).get(`/api/imoveis/${imovel_id}`);
      expect(res.statusCode).toBe(401);
    });

    it('deve retornar 403 se o token for inválido', async () => {
      const res = await request(app)
        .get(`/api/imoveis/${imovel_id}`)
        .set('Authorization', 'Bearer token-invalido');
      expect(res.statusCode).toBe(403);
    });
  });

  describe('PATCH /api/imoveis/:imovel_id', () => {
    it('deve retornar 200 e atualizar o imóvel', async () => {
      const res = await request(app)
        .patch(`/api/imoveis/${imovel_id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: 'Casa de Praia Atualizada' });
      expect(res.statusCode).toBe(200);
    });

    it('deve retornar 404 se o imóvel não for encontrado', async () => {
      const res = await request(app)
        .patch('/api/imoveis/123456789abcdef123456789')
        .set('Authorization', `Bearer ${token}`)
        .send({ nome: 'Casa de Praia Atualizada' });
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('erro', 'Imóvel não encontrado');
    });

    it('deve retornar 400 se nenhum campo for fornecido para atualização', async () => {
      const res = await request(app)
        .patch(`/api/imoveis/${imovel_id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({});
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('erro', 'Pelo menos um campo deve ser atualizado');
    });

    it('deve retornar 401 se o token não for fornecido', async () => {
      const res = await request(app)
        .patch(`/api/imoveis/${imovel_id}`)
        .send({ nome: 'Casa de Praia Atualizada' });
      expect(res.statusCode).toBe(401);
    });

    it('deve retornar 403 se o token for inválido', async () => {
      const res = await request(app)
        .patch(`/api/imoveis/${imovel_id}`)
        .set('Authorization', 'Bearer token-invalido')
        .send({ nome: 'Casa de Praia Atualizada' });
      expect(res.statusCode).toBe(403);
    });
  });

  describe('DELETE /api/imoveis/:imovel_id', () => {
    it('deve retornar 200 e excluir o imóvel', async () => {
      const res = await request(app)
        .delete(`/api/imoveis/${imovel_id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    });

    it('deve retornar 404 se o imóvel não for encontrado', async () => {
      const res = await request(app)
        .delete('/api/imoveis/123456789abcdef123456789')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('erro', 'Imóvel não encontrado');
    });

    it('deve retornar 401 se o token não for fornecido', async () => {
      const res = await request(app).delete(`/api/imoveis/${imovel_id}`);
      expect(res.statusCode).toBe(401);
    });

    it('deve retornar 403 se o token for inválido', async () => {
      const res = await request(app)
        .delete(`/api/imoveis/${imovel_id}`)
        .set('Authorization', 'Bearer token-invalido');
      expect(res.statusCode).toBe(403);
    });
  });
});
