export async function getFeriados(req, res) {
  try {
    const { ano, estado } = req.query;

    const response = await fetch(
      `https://api.invertexto.com/v1/holidays/${ano}?token=${process.env.TOKEN_INVERT_TEXTO}&state=${estado || ""}`
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Erro ao buscar feriados",
      });
    }

    const data = await response.json();

    return res.status(200).json(data);

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
}