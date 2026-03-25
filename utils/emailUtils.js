import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const mailCodes = new Map();

export function salvarCodigo(email, codigo) {
  mailCodes.set(email, { codigo, expiracao: Date.now() + 5 * 60 * 1000 });
}

export function consultarCodigo(email, codigo) {
  const dados = mailCodes.get(email);
  if (!dados) return false;
  if (Date.now() > dados.expiracao) return false;
  return dados.codigo === codigo;
}

export async function enviarCodigo(email, codigo) {
  try {
    await resend.emails.send({
      from: 'Gerenciador de Reservas <onboarding@resend.dev>',
      to: email,
      subject: 'Código de Verificação',
      text: `Seu código de verificação é: ${codigo}. Ele expira em 5 minutos.`,
      html: `
        <b>Seu código de verificação é: 
          <span style="color: blue;">${codigo}</span>
        </b>
        <p>Ele expira em 5 minutos.</p>
      `,
    });

    return true;
  } catch (error) {
    console.error('Erro ao enviar email com Resend:', error);
    return false;
  }
}