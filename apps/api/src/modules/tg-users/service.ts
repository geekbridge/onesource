import { eq } from 'drizzle-orm'

import { db, TgUserT, InsertTgUserT, tgUsers } from '../../db'

export async function createTgUser(input: InsertTgUserT) {
  const tgUser = await db.insert(tgUsers).values(input).returning()

  return tgUser[0]
}

export async function getAllTgUsers() {
  return await db.select().from(tgUsers)
}

export async function findTgUserById(id: TgUserT['id']) {
  // TODO make next line working (query field shouldn't be empty)
  // const tgUser = await db.query.tgUsers.findFirst({ where: { id } })

  const tgUser = await db
    .select()
    .from(tgUsers)
    .where(eq(tgUsers.id, id))
    .limit(1)

  return tgUser[0]
}
