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
  const { imovel_id } = req.params;
  const { usuario_id } = req.usuario;
  let { ano, estado } = req.query;
  const token_invert_texto = process.env.TOKEN_INVERT_TEXTO;

  if ((!usuario_id, !imovel_id)) {
    return res.status(400).json({ erro: 'id do usuario e do imovel são obrigatorios' });
  }

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
    console.log(erro);
    return res.status(500).json({ erro: 'Erro interno no servidor' });
  }

  let reservas = [];
  try {
    //busca as reservas no banco de dados
    reservas = await buscarReservas(usuario_id, imovel_id);
  } catch (erro) {
    return res.status(500).json({ erro: 'Erro interno no banco de dados' });
  }

  const trabalhos_assincronos = [];

  for (let mes = 0; mes <= 11; mes++) {
    const trabalho_assincrono = async () => {
      let ultimo_dia_mes;
      let primeiro_dia_da_semana = new Date(ano, mes, 1).getDay();
      const dia_atual = new Date().toISOString().split('T')[0];
      const lista_dias = [];

      if (mes + 1 > 11) {
        ultimo_dia_mes = new Date(ano + 1, 0, 0).getDate();
      } else {
        ultimo_dia_mes = new Date(ano, mes + 1, 0).getDate();
      }

      const adicionaInfo = date => {
        const dia = parseInt(date.split('-')[2]);
        const item = { date, dia };

        const feriado = feriados.find(f => f.date === date);
        if (feriado) item.feriado = feriado;

        const reserva = reservas.find(
          r =>
            date >= r.data_inicio.toISOString().split('T')[0] &&
            date <= r.data_fim.toISOString().split('T')[0]
        );
        if (reserva) item.reserva = reserva;

        if (date === dia_atual) item.dia_atual = true;

        return item;
      };

      // Dias do mês anterior
      for (let dia = 1; dia <= primeiro_dia_da_semana; dia++) {
        const data = new Date(ano, mes, dia - primeiro_dia_da_semana).toISOString().split('T')[0];
        lista_dias.push(adicionaInfo(data));
      }

      // Dias do mês atual
      for (let dia = 1; dia <= ultimo_dia_mes; dia++) {
        const data = new Date(ano, mes, dia).toISOString().split('T')[0];
        lista_dias.push(adicionaInfo(data));
      }

      // Dias do próximo mês para completar semana
      const dias_faltando = Math.ceil(lista_dias.length / 7) * 7 - lista_dias.length;
      for (let dia = 0; dia < dias_faltando; dia++) {
        const data = new Date(ano, mes + 1, dia + 1).toISOString().split('T')[0];
        lista_dias.push(adicionaInfo(data));
      }

      return {
        ano,
        mes_nome: nome_mes[mes],
        mes_numero: mes,
        dias: lista_dias,
      };
    };

    trabalhos_assincronos.push(trabalho_assincrono());
  }

  const lista_ano = await Promise.all(trabalhos_assincronos);
  res.status(200).json(lista_ano);
}
