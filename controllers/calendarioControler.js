import { buscarReservas } from '../models/reservaModel.js';

const nome_mes = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
];

export default async function handler(req, res) {
  const { usuario_id, imovel_id } = req.params;
  let { ano, estado } = req.query;
  const token_invert_texto = process.env.TOKEN_INVERT_TEXTO;

  if (!ano) {
    return res.status(400).json({ erro: 'Ano não foi fornecido!' });
  }
  if (ano < 2000 || ano > 3000) {
    return res.status(400).json({ erro: 'Ano invalido!' });
  }

  if (!ano) {
    ano = new Date().getFullYear();
  }

  let feriados = {};
  try {
    const resposta = await fetch(
      `https://api.invertexto.com/v1/holidays/${ano}?token=${token_invert_texto}&state=${estado}`,
      {
        method: 'GET',
      }
    );

    if (!resposta.ok) {
      //return res.status(resposta.status).json({ erro: "Erro ao buscar feriados" })
      feriados = [];
    } else {
      feriados = await resposta.json();
    }
  } catch (erro) {
    return res.status(500).json({ erro: 'Erro interno no servidor' });
  }

  let reservas = {};
  try {
    //busca as reservas no banco de dados
    reservas = await buscarReservas(usuario_id, imovel_id);
    const reservasFiltradas = [];
    for (const reserva of reservas) {
      reservasFiltradas.push({ data_inicio: reserva.data_inicio, data_fim: reserva.data_fim });
    }
  } catch (erro) {
    return res.status(500).json({ erro: 'Erro interno no banco de dados' });
  }

  let lista_ano = [];
  for (let mes = 0; mes <= 11; mes++) {
    let ultimo_dia_mes;
    let primeiro_dia_da_semana = new Date(ano, mes, 1).getDay();
    const dia_atual = new Date().toISOString().split('T')[0];
    const lista_dias = [];

    if (mes + 1 > 11) ultimo_dia_mes = new Date(ano + 1, 0, 0).getDate();
    else ultimo_dia_mes = new Date(ano, mes + 1, 0).getDate();

    for (let dia = 1; dia <= primeiro_dia_da_semana; dia++) {
      const date = {
        date: new Date(ano, mes, dia - primeiro_dia_da_semana).toISOString().split('T')[0],
      };
      date.dia = date.date.split('-')[2];
      for (const feriado of feriados) {
        if (feriado['date'] === date['date']) {
          date['feriado'] = feriado;
        }
      }
      if (new Date(ano, mes, dia).toISOString().split('T')[0] === dia_atual)
        date['dia atual'] = true;
      lista_dias.push(date);
    }

    for (let dia = 1; dia <= ultimo_dia_mes; dia++) {
      const date = { date: new Date(ano, mes, dia).toISOString().split('T')[0], dia };
      for (const feriado of feriados) {
        if (feriado['date'] === date['date']) {
          date['feriado'] = feriado;
        }
      }
      // inserir reservas
      if (new Date(ano, mes, dia).toISOString().split('T')[0] === dia_atual)
        date['dia_atual'] = true;
      lista_dias.push(date);
    }

    const dias_faltando = Math.ceil(lista_dias.length / 7) * 7 - lista_dias.length;
    if (dias_faltando !== 0)
      for (let dia = 0; dia < dias_faltando; dia++) {
        const date = { date: new Date(ano, mes + 1, dia + 1).toISOString().split('T')[0] };
        date.dia = date.date.split('-')[2];
        for (const feriado of feriados) {
          if (feriado['date'] === date['date']) {
            date['feriado'] = feriado;
          }
        }
        lista_dias.push(date);
      }

    lista_ano.push({ ano: ano, mes_nome: nome_mes[mes], mes_numero: mes, dias: lista_dias });
  }
  res.status(200).json(lista_ano);
}
