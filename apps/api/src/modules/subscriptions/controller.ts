import { FastifyInstance } from 'fastify'

import {
  createSubscription,
  findSubscriptionById,
  getAllSubscriptions,
} from './service'
import { InsertSubscriptionsT, SubscriptionsT } from '../../db'

export async function subscriptionsController(server: FastifyInstance) {
  server.post<{ Body: InsertSubscriptionsT; Reply: SubscriptionsT }>(
    '/',
    async (req, reply) => {
      const subscription = await createSubscription(req.body)

      return reply.status(201).send(subscription)
    }
  )

  server.get('/', async (req, reply) => {
    const subscriptions = await getAllSubscriptions()
    reply.status(201).send(subscriptions)
  })

  server.get<{ Params: Pick<SubscriptionsT, 'id'> }>(
    '/:id',
    async (req, reply) => {
      const { id } = req.params
      const subscription = await findSubscriptionById(id)

      reply.status(201).send(subscription)
    }
  )
}
