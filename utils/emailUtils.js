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
    service: 'gmail',
    secure: true, // Use SSL
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_APP_PASS, // Garanta que não tenha espaços no .env
    },
  });

  const mailOptions = {
    // O 'from' deve ser o seu e-mail do Gmail
    from: `"Gerenciador de Reservas" <${process.env.EMAIL}>`,
    to: email,
    subject: 'Código de Verificação',
    text: `Seu código de verificação é: ${codigo}. Ele expira em 5 minutos.`,
    html: `<b>Seu código de verificação é: <span style="color: blue;">${codigo}</span></b><p>Ele expira em 5 minutos.</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    // 2. Log detalhado para sabermos o motivo real da falha
    console.error('Erro detalhado do Nodemailer:');
    if (error.code === 'EAUTH') {
      console.error(
        'Falha de Autenticação: Verifique se a Senha de Aplicativo está correta e sem espaços.'
      );
    } else {
      console.error(error);
    }
    return false;
  }
}
