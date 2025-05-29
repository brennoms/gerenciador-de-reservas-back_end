import nodemailer from 'nodemailer';

const mailCodes = new Map();

export function salvarCodigo(email, codigo) {
  mailCodes.set(email, { codigo, expiracao: Date.now() + 5 * 60 * 1000 }); // 5 min
}

export function consultarCodigo(email, codigo) {
  const dados = mailCodes.get(email);
  if (!dados) return false;
  if (Date.now() > dados.expiracao) return false;
  return dados.codigo === codigo;
}

export async function enviarCodigo(email, codigo) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY,
    },
  });

  const mailOptions = {
    from: `<${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Código de verificação',
    text: `Seu código de verificação é: ${codigo}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return false;
  }
}
