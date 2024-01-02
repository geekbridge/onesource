import { eq } from 'drizzle-orm'

import {
  db,
  SubscriptionsT,
  InsertSubscriptionsT,
  subscriptions,
} from '../../db'

export async function createSubscription(input: InsertSubscriptionsT) {
  const subscription = await db.insert(subscriptions).values(input).returning()

  return subscription[0]
}

export async function getAllSubscriptions() {
  return await db.select().from(subscriptions)
}

export async function findSubscriptionById(id: SubscriptionsT['id']) {
  const subscription = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.id, id))
    .limit(1)

  return subscription[0]
}
