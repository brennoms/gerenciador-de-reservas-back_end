import dotenv from 'dotenv';
dotenv.config({ path: '.test.env' });

const app = (await import('./index.js')).default;

const port = process.env.PORT || 3000;
if (process.env.IP_LOCAL) {
  const ip = process.env.IP_LOCAL;
  app.listen(port, ip, () => {
    console.log(`🚀 Servidor rodando em http://${ip}:${port}`);
  });
} else {
  app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta http://localhost:${port}`);
  });
}
