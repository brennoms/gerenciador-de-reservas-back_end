import 'dotenv/config';
import dotenv from 'dotenv';
dotenv.config({ path: './.test.env' });
import app from './index.js';

const port = process.env.PORT || 3000;
if (process.env.IP_LOCAL) {
  const ip = process.env.IP_LOCAL;
  app.listen(port, ip, () => {
    console.log(`🚀 Servidor rodando em http://${ip}:${port}`);
  });
} else {
  app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
  });
}
