import { FastifyInstance } from 'fastify'

import { createSubscription, findSubscriptions } from './service'
import { SubscriptionsT } from '../../db'
import { CreateSubscriptionBodyT, GetSubscriptionsBodyT } from './types'

export async function subscriptionsController(server: FastifyInstance) {
  server.post<{
    Body: CreateSubscriptionBodyT
    Reply: SubscriptionsT | string
  }>('/', async (req, reply) => {
    try {
      const subscription = await createSubscription(req.body)

      if (!subscription) {
        // TODO handle errors normal
        reply.code(404).send('404')
      }

      return reply.status(201).send(subscription)
    } catch (error) {
      // FIXME typing
      reply.code(500).send(error)
    }
  })

  server.get<{ Querystring: GetSubscriptionsBodyT }>(
    '/',
    async (req, reply) => {
      try {
        const subscriptions = await findSubscriptions(req.query)

        reply.status(201).send(subscriptions)
      } catch (error) {}
    }
  )
}
