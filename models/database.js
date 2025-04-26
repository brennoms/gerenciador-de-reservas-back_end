import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI);
let db;

export default async function connect() {
  if (!db) {
    await client.connect();
    db = client.db(process.env.DB_NOME);
  }
  return db;
}

export async function criarIndices() {
  const db = await connect();
  await db.collection('usuarios').createIndex({ email: 1 }, { unique: true });
  await db.collection('imoveis').createIndex({ usuario_id: 1 });
  await db.collection('reservas').createIndex({ usuario_id: 1, imovel_id: 1 });
}
