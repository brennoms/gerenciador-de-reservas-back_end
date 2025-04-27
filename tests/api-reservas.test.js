import request from 'supertest';
import app from '../index.js';
import token from './utils/logar.js';

const autorizacao = ['Authorization', `Bearer ${token}`];

describe('Testes de api reservas', () => {
  let imovel_id = null;
  let reserva_id = null;

  const dataValida = { inicio: new Date(), fim: new Date() };
  dataValida.inicio.setDate(dataValida.inicio.getDate() + 1);
  dataValida.inicio = dataValida.inicio.toISOString().split('T')[0];
  dataValida.fim.setDate(dataValida.fim.getDate() + 2);
  dataValida.fim = dataValida.fim.toISOString().split('T')[0];

  // Criar um imóvel para os testes de reserva
  beforeAll(async () => {
    const novoImovel = {
      nome: 'Casa de Praia',
      imagem: 'https://example.com/imagem.jpg',
      endereco: 'Rua do Sol, 123',
    };
    const res = await request(app)
      .post('/api/imoveis')
      .set(...autorizacao)
      .send(novoImovel);
    imovel_id = res.body.imovel_id;
    expect(res.status).toBe(200);
  });
  afterAll(async () => {
    const res = await request(app)
      .delete(`/api/imoveis/${imovel_id}`)
      .set(...autorizacao);
    expect(res.status).toBe(200);
  });

  describe('POST /api/imoveis/:imovel_id/reservas', () => {
    it('deve retornar 200 e criar uma reserva', async () => {
      const novaReserva = {
        nome: 'João Silva',
        contato: '(11) 98765-4321',
        data_inicio: dataValida.inicio,
        data_fim: dataValida.fim,
      };
      const res = await request(app)
        .post(`/api/imoveis/${imovel_id}/reservas`)
        .set(...autorizacao)
        .send(novaReserva);
      reserva_id = res.body.reserva_id;
      expect(res.status).toBe(200);
    });

    describe('validações dos campos de reserva', () => {
      it('deve retornar 400 se a data de início for anterior à data atual', async () => {
        const novaReserva = {
          nome: 'Maria Oliveira',
          contato: ' (11) 91234-5678',
          data_inicio: '2023-10-10',
          data_fim: '2023-10-15',
        };
        const res = await request(app)
          .post(`/api/imoveis/${imovel_id}/reservas`)
          .set(...autorizacao)
          .send(novaReserva);
        expect(res.status).toBe(400);
      });

      it('deve retornar 400 se a data de início for maior ou igual à data de fim', async () => {
        const novaReserva = {
          nome: 'Carlos Santos',
          contato: ' (11) 99876-5432',
          data_inicio: '2023-10-25',
          data_fim: '2023-10-20',
        };
        const res = await request(app)
          .post(`/api/imoveis/${imovel_id}/reservas`)
          .set(...autorizacao)
          .send(novaReserva);
        expect(res.status).toBe(400);
      });

      it('deve retornar 400 se a data de fim for anterior à data atual', async () => {
        const novaReserva = {
          nome: 'Ana Costa',
          contato: ' (11) 93456-7890',
          data_inicio: '2023-10-15',
          data_fim: '2023-10-05',
        };
        const res = await request(app)
          .post(`/api/imoveis/${imovel_id}/reservas`)
          .set(...autorizacao)
          .send(novaReserva);
        expect(res.status).toBe(400);
      });

      it('deve retornar 400 se o campo nome não for fornecido', async () => {
        const novaReserva = {
          contato: ' (11) 91234-5678',
          data_inicio: '2023-10-15',
          data_fim: '2023-10-20',
        };
        const res = await request(app)
          .post(`/api/imoveis/${imovel_id}/reservas`)
          .set(...autorizacao)
          .send(novaReserva);
        expect(res.status).toBe(400);
      });

      it('deve retornar 400 se o campo contato não for fornecido', async () => {
        const novaReserva = {
          nome: 'Maria Oliveira',
          data_inicio: '2023-10-15',
          data_fim: '2023-10-20',
        };
        const res = await request(app)
          .post(`/api/imoveis/${imovel_id}/reservas`)
          .set(...autorizacao)
          .send(novaReserva);
        expect(res.status).toBe(400);
      });

      it('deve retornar 400 se o campo data_inicio não for fornecido', async () => {
        const novaReserva = {
          nome: 'Carlos Santos',
          contato: ' (11) 99876-5432',
          data_fim: '2023-10-20',
        };
        const res = await request(app)
          .post(`/api/imoveis/${imovel_id}/reservas`)
          .set(...autorizacao)
          .send(novaReserva);
        expect(res.status).toBe(400);
      });

      it('deve retornar 400 se o campo data_fim não for fornecido', async () => {
        const novaReserva = {
          nome: 'Ana Costa',
          contato: ' (11) 93456-7890',
          data_inicio: '2023-10-15',
        };
        const res = await request(app)
          .post(`/api/imoveis/${imovel_id}/reservas`)
          .set(...autorizacao)
          .send(novaReserva);
        expect(res.status).toBe(400);
      });
    });

    it('deve retornar 404 se o imóvel não existir', async () => {
      const novaReserva = {
        nome: 'Lucas Almeida',
        contato: '(11) 91234-5678',
        data_inicio: dataValida.inicio,
        data_fim: dataValida.fim,
      };
      const res = await request(app)
        .post('/api/imoveis/123456789012345678901234/reservas')
        .set(...autorizacao)
        .send(novaReserva);
      expect(res.status).toBe(404);
    });

    it('deve retornar 401 se o token não for fornecido', async () => {
      const novaReserva = {
        nome: 'Lucas Almeida',
        contato: ' (11) 91234-5678',
        data_inicio: dataValida.inicio,
        data_fim: dataValida.fim,
      };
      const res = await request(app).post(`/api/imoveis/${imovel_id}/reservas`).send(novaReserva);
      expect(res.status).toBe(401);
    });

    it('deve retornar 403 se o token for inválido', async () => {
      const novaReserva = {
        nome: 'Lucas Almeida',
        contato: ' (11) 91234-5678',
        data_inicio: dataValida.inicio,
        data_fim: dataValida.fim,
      };
      const res = await request(app)
        .post(`/api/imoveis/${imovel_id}/reservas`)
        .set('Authorization', 'Bearer token-invalido')
        .send(novaReserva);
      expect(res.status).toBe(403);
    });
  });

  describe('GET /api/reservas)', () => {
    it('deve retornar 200 e listar todas as reservas', async () => {
      const res = await request(app)
        .get('/api/reservas')
        .set(...autorizacao);
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
    });

    it('deve retornar 401 se o token não for fornecido', async () => {
      const res = await request(app).get('/api/reservas');
      expect(res.status).toBe(401);
    });

    it('deve retornar 403 se o token for inválido', async () => {
      const res = await request(app)
        .get('/api/reservas')
        .set('Authorization', 'Bearer token-invalido');
      expect(res.status).toBe(403);
    });
  });

  describe('GET /api/reservas/:reserva_id', () => {
    it('deve retornar 200 e listar a reserva', async () => {
      const res = await request(app)
        .get(`/api/reservas/${reserva_id}`)
        .set(...autorizacao);
      expect(res.status).toBe(200);
    });

    it('deve retornar 404 se a reserva não existir', async () => {
      const res = await request(app)
        .get('/api/reservas/123456789012345678901234')
        .set(...autorizacao);
      expect(res.status).toBe(404);
    });
  });

  describe('GET /api/imoveis/:imovel_id/reservas', () => {
    it('deve retornar 200 e listar as reservas do imóvel', async () => {
      const res = await request(app)
        .get(`/api/imoveis/${imovel_id}/reservas`)
        .set(...autorizacao);
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
    });

    it('deve retornar 404 se o imóvel não existir', async () => {
      const res = await request(app)
        .get('/api/imoveis/123456789012345678901234/reservas')
        .set(...autorizacao);
      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/imoveis/:imovel_id/reservas', () => {
    it('deve retornar 200 e deletar a reserva', async () => {
      const res = await request(app)
        .delete(`/api/imoveis/${imovel_id}/reservas/${reserva_id}`)
        .set(...autorizacao);
      expect(res.status).toBe(200);
    });

    it('deve retornar 404 se a reserva não existir', async () => {
      const res = await request(app)
        .delete(`/api/imoveis/${imovel_id}/reservas/123456789012345678901234`)
        .set(...autorizacao);
      expect(res.status).toBe(404);
    });

    it('deve retornar 404 se o imóvel não existir', async () => {
      const res = await request(app)
        .delete('/api/imoveis/123456789012345678901234/reservas/123456789012345678901234')
        .set(...autorizacao);
      expect(res.status).toBe(404);
    });
  });
});
