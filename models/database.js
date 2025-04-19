import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const client = new MongoClient(process.env.URI_MONGODB)

let db

async function connect() {
  if (!db) {
    await client.connect()
    db = client.db(process.env.DB_NAME)
  }
  return db
}

export default connect