import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  return res
    .status(200)
    .json({
      mensagem: 'conectado ao servidor gerenciador-de-reservas, use /api para acessar as features',
    });
});

export default router;
