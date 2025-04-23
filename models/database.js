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
