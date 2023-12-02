import { Config } from 'drizzle-kit'
import dotenv from 'dotenv'

dotenv.config()

if (!process.env.DB_URL) {
  throw Error('DB_URL is not defined in environment')
}

export default {
  schema: './src/modules/*/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DB_URL,
  },
  verbose: true,
  strict: true,
} satisfies Config
