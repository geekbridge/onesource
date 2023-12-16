import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { DB_URL } from './constants'
import { tgUsers } from './modules/tg-users'

const queryClient = postgres(DB_URL)

export const db = drizzle(queryClient, { schema: { tgUsers } })
