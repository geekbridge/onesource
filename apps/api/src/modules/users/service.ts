import { eq } from 'drizzle-orm'

import { db, UserT, InsertUserT, users } from '../../db'

export async function createUser(input: InsertUserT) {
  const user = await db.insert(users).values(input).returning()

  return user[0]
}

export async function getAllUsers() {
  return await db.select().from(users)
}

export async function findUserById(id: UserT['id']) {
  // TODO make next line working (query field shouldn't be empty)
  // const user = await db.query.users.findFirst({ where: { id: 1 } })

  const user = await db.select().from(users).where(eq(users.id, id)).limit(1)

  return user
}

export async function updatedUserById(id: UserT['id'], newData: InsertUserT) {
  const updatedUser = await db
    .update(users)
    .set({ ...newData, updatedAt: new Date() })
    .where(eq(users.id, id))
    .returning()

  return updatedUser[0]
}
