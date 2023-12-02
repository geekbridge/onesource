import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { DB_URL } from './src/constants'

async function migration() {
  console.info('migrating...')
  const sql = postgres(DB_URL, { max: 1 })
  const db = drizzle(sql)
  await migrate(db, { migrationsFolder: 'drizzle' })
  console.info('migrate done!')
  process.exit()
}

migration()
