import { FastifyInstance } from 'fastify'

import { CreateTgUserBodyT } from './types'
import { createTgUser, findTgUserByTgId, getAllTgUsers } from './service'
import { TgUserT } from '../../db'

export async function tgUsersController(server: FastifyInstance) {
  server.post<{ Body: CreateTgUserBodyT; Reply: TgUserT }>(
    '/',
    async (req, reply) => {
      const tgUser = await createTgUser(req.body)

      return reply.status(201).send(tgUser)
    }
  )

  server.get('/', async (req, reply) => {
    const tgUsers = await getAllTgUsers()
    reply.status(201).send(tgUsers)
  })

  server.get<{ Params: Pick<TgUserT, 'tgId'> }>(
    '/:tgId',
    async (req, reply) => {
      const { tgId } = req.params
      const tgUser = await findTgUserByTgId(tgId)

      reply.status(201).send(tgUser)
    }
  )
}
