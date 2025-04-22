import request from 'supertest';
import app from '../index.js';

describe('Testes de API', () => {
  it('deve responder com 404 em rota inexistente', async () => {
    const res = await request(app).get('/api/rota-invalida');
    expect(res.statusCode).toBe(404);
  });
});
