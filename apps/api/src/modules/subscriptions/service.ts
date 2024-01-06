import { and, eq } from 'drizzle-orm'

import { CreateSubscriptionBodyT, GetSubscriptionsBodyT } from './types'

import { db, services, sources, subscriptions, users } from '../../db'
import { getSourceInfo } from '../../parsers'

export async function createSubscription({
  url,
  tgUserId,
}: CreateSubscriptionBodyT) {
  const { key, name, sourceUrl, imageUrl, type, serviceKey } =
    await getSourceInfo(url)

  if (!key) {
    throw Error('Source not recognized')
  }

  const subscriptionService = await db.query.services.findFirst({
    where: eq(services.key, serviceKey),
  })
  if (!subscriptionService) {
    throw Error('Service not recognized')
  }

  const user = await db.query.users.findFirst({
    where: eq(users.tgId, tgUserId),
  })

  if (!user) {
    throw Error('User not found')
  }

  let source = await db.query.sources.findFirst({
    where: eq(sources.key, key),
  })

  if (!source && subscriptionService) {
    source = (
      await db
        .insert(sources)
        .values({
          // FIXME ???
          key,
          name,
          url: sourceUrl,
          imageUrl,
          type,
          serviceId: subscriptionService.id,
        })
        .returning()
    )[0]
  }

  if (!source) {
    throw Error('Source not found')
  }

  const existedSubscription = await db.query.subscriptions.findFirst({
    where: and(
      eq(subscriptions.sourceId, source.id),
      eq(subscriptions.userId, user.id)
    ),
  })

  if (existedSubscription) {
    throw Error('Subscription already exist')
  }

  const newSubscription = await db
    .insert(subscriptions)
    .values({ userId: user.id, sourceId: source.id })
    .returning()

  return newSubscription[0]
}

export async function findSubscriptions({ tgId }: GetSubscriptionsBodyT) {
  const user = await db.query.users.findFirst({
    where: eq(users.tgId, tgId),
  })

  if (!user) {
    throw Error('User not found')
  }

  const subscription = await db.query.subscriptions.findMany({
    where: eq(subscriptions.userId, user.id),
  })

  return subscription
}
