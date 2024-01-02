import { eq } from 'drizzle-orm'

import { db, SourcesT, InsertSourcesT, sources } from '../../db'

export async function createSource(input: InsertSourcesT) {
  const source = await db.insert(sources).values(input).returning()

  return source[0]
}

export async function getAllSources() {
  return await db.select().from(sources)
}

export async function findSourceById(id: SourcesT['id']) {
  const source = await db
    .select()
    .from(sources)
    .where(eq(sources.id, id))
    .limit(1)

  return source[0]
}
