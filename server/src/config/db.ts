import { readFileSync } from 'node:fs'
import { Pool } from 'pg'

const caPath = process.env.DB_SSL_CA_PATH

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: caPath ? { ca: readFileSync(caPath, 'utf8') } : undefined,
})