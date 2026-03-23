import { buscarReservas } from '../models/reservaModel.js';

const NOMES_MESES = [
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

  // Validação inicial
  ano = parseInt(ano) || new Date().getFullYear();
  if (ano < 2000 || ano > 3000) {
    return res.status(400).json({ erro: 'Ano inválido!' });
  }

  const hojeStr = new Date().toISOString().split('T')[0];

  try {
    // 1. Busca de dados em paralelo para ganhar tempo
    const [reservasRaw, feriadosRaw] = await Promise.all([
      buscarReservas(usuario_id, imovel_id),
      fetch(
        `https://api.invertexto.com/v1/holidays/${ano}?token=${token_invert_texto}&state=${
          estado || ''
        }`
      )
        .then(r => (r.ok ? r.json() : []))
        .catch(() => []), // Falha na API de feriados não deve travar o app
    ]);

    // 2. Otimização: Mapas para busca rápida O(1)
    const feriadosMap = new Map(feriadosRaw.map(f => [f.date, f]));

    // Para reservas, como é um intervalo, mantemos simplificado ou usamos um intervalo
    const reservas = reservasRaw.map(r => ({
      inicio: new Date(r.data_inicio).toISOString().split('T')[0],
      fim: new Date(r.data_fim).toISOString().split('T')[0],
    }));

    // Função auxiliar para construir o objeto do dia
    const criarObjetoDia = dataObjeto => {
      const isoDate = dataObjeto.toISOString().split('T')[0];
      const dia = dataObjeto.getDate();

      const obj = {
        date: isoDate,
        dia: dia.toString().padStart(2, '0'),
      };

      // Busca rápida de feriado
      if (feriadosMap.has(isoDate)) obj.feriado = feriadosMap.get(isoDate);

      // Verificação de reserva
      const reservaEncontrada = reservas.find(r => isoDate >= r.inicio && isoDate <= r.fim);
      if (reservaEncontrada) obj.reserva = reservaEncontrada;

      if (isoDate === hojeStr) obj.dia_atual = true;

      return obj;
    };

    // 3. Construção do Calendário
    const lista_ano = [];

    for (let mes = 0; mes < 12; mes++) {
      const diasNoMes = [];

      // Primeiro dia do mês e dia da semana (0-6)
      const primeiroDiaData = new Date(ano, mes, 1);
      const diaSemanaInicial = primeiroDiaData.getDay();

      // Preenchimento: Dias do mês anterior para completar a primeira semana
      for (let i = diaSemanaInicial; i > 0; i--) {
        const d = new Date(ano, mes, 1 - i);
        diasNoMes.push(criarObjetoDia(d));
      }

      // Dias do mês atual
      const ultimoDiaMes = new Date(ano, mes + 1, 0).getDate();
      for (let d = 1; d <= ultimoDiaMes; d++) {
        diasNoMes.push(criarObjetoDia(new Date(ano, mes, d)));
      }

      // Preenchimento: Dias do próximo mês para completar a última semana (até fechar múltiplo de 7)
      const diasRestantes = (7 - (diasNoMes.length % 7)) % 7;
      for (let i = 1; i <= diasRestantes; i++) {
        const d = new Date(ano, mes + 1, i);
        diasNoMes.push(criarObjetoDia(d));
      }

      lista_ano.push({
        ano,
        mes_nome: NOMES_MESES[mes],
        mes_numero: mes,
        dias: diasNoMes,
      });
    }

    return res.status(200).json(lista_ano);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: 'Erro interno ao processar calendário' });
  }
}
