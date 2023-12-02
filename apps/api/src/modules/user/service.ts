import { NewUserT, tgUsers } from './schema'
import { db } from '../../db'
import { eq } from 'drizzle-orm'

export async function createUser(input: NewUserT) {
  const user = await db.insert(tgUsers).values(input).returning()

  return user
}

export async function findUsers() {
  return await db.select().from(tgUsers)
}

export async function findUserByTgId(tgId: number) {
  return db.select().from(tgUsers).where(eq(tgUsers.tgId, tgId))
}
