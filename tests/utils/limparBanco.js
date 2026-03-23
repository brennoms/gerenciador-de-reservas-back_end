const connect = (await import('../../models/database')).default;

export async function limparBanco() {
  const db = await connect();
  const collections = await db.listCollections().toArray();
  for (const collection of collections) {
    await db.collection(collection.name).deleteMany({});
  }
}

// Opcional: Fechar a conexão após todos os testes da suite
export const fecharConexao = async () => {
  const db = await connect();
  if (db.client) {
    await db.client.close();
  }
};
