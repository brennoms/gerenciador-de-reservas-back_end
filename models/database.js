import { MongoClient } from 'mongodb'
import { MONGO_URI, DB_NOME } from '../config.js'


const client = new MongoClient(MONGO_URI)

let db
async function connect() {
  if (!db) {
    await client.connect()
    db = client.db(DB_NOME)
  }
  return db
}

export default connect