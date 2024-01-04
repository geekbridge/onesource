import { eq } from 'drizzle-orm'

import { CreateTgUserBodyT } from './types'
import { db, TgUserT, users, tgUsers } from '../../db'

export async function createTgUser({
  tgId,
  username,
  isBot,
  isPremium,
  languageCode,
  firstName,
  lastName,
}: CreateTgUserBodyT) {
  const tgUser = await db
    .insert(tgUsers)
    .values({ tgId, username, isBot, isPremium })
    .returning()
  const user = await db
    .insert(users)
    .values({
      firstName,
      lastName,
      languageCode,
      tgId,
    })
    .returning()

  return tgUser[0]
}

export async function getAllTgUsers() {
  return await db.select().from(tgUsers)
}

export async function findTgUserByTgId(tgId: TgUserT['tgId']) {
  // TODO make next line working (query field shouldn't be empty)
  // const tgUser = await db.query.tgUsers.findFirst({ where: { id } })

  const tgUser = await db
    .select()
    .from(tgUsers)
    .where(eq(tgUsers.tgId, tgId))
    .limit(1)

  return tgUser[0]
}
