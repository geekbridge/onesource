import { FastifyInstance } from 'fastify'

import { createTgUser, findTgUserById, getAllTgUsers } from './service'
import { TgUserT, InsertTgUserT } from '../../db'

export async function tgUsersController(server: FastifyInstance) {
  server.post<{ Body: InsertTgUserT; Reply: TgUserT }>(
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

  server.get<{ Params: Pick<TgUserT, 'id'> }>('/:id', async (req, reply) => {
    const { id } = req.params
    const tgUser = await findTgUserById(id)

    reply.status(201).send(tgUser)
  })
}
