import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from './schema'
import { DB_URL } from '../constants'

const queryClient = postgres(DB_URL)

export const db = drizzle(queryClient, { schema })
