import { NewTgUserT, tgUsers } from './schema'
import { db } from '../../db'
import { eq } from 'drizzle-orm'

export async function createTgUser(input: NewTgUserT) {
  const tgUser = await db.insert(tgUsers).values(input).returning()

  return tgUser[0]
}

export async function findTgUsers() {
  return await db.select().from(tgUsers)
}

export async function findTgUserById(id: number) {
  // TODO make next line working (query field shouldn't be empty)
  // const tgUser = await db.query.tgUsers.findFirst({ where: { id } })

  const tgUser = await db
    .select()
    .from(tgUsers)
    .where(eq(tgUsers.id, id))
    .limit(1)

  return tgUser[0]
}
