import { FastifyInstance } from 'fastify'
import { TgUserT, NewTgUserT } from './schema'
import { createTgUser, findTgUserById, findTgUsers } from './service'

export async function tgUsersController(server: FastifyInstance) {
  server.post<{ Body: NewTgUserT; Reply: TgUserT[] }>(
    '/',
    async (req, reply) => {
      const tgUser = await createTgUser(req.body)

      return reply.status(201).send(tgUser)
    }
  )

  server.get('/', async (req, reply) => {
    const tgUsers = await findTgUsers()
    reply.status(201).send(tgUsers)
  })

  server.get('/:tgUserId', async (req, reply) => {
    // TODO fix typing
    const { tgUserId } = req.params
    const tgUser = await findTgUserById(tgUserId)

    reply.status(201).send(tgUser)
  })
}
