import { eq } from 'drizzle-orm'

import { db, ServicesT, InsertServicesT, services } from '../../db'

export async function createService(input: InsertServicesT) {
  const service = await db.insert(services).values(input).returning()

  return service[0]
}

export async function getAllServices() {
  return await db.select().from(services)
}

export async function findServiceById(id: ServicesT['id']) {
  const service = await db
    .select()
    .from(services)
    .where(eq(services.id, id))
    .limit(1)

  return service[0]
}
