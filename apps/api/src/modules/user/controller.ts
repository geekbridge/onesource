import { FastifyInstance } from 'fastify'
import { UserT, NewUserT } from './schema'
import { createUser, findUserByTgId, findUsers } from './service'

export async function userController(server: FastifyInstance) {
  server.post<{ Body: NewUserT; Reply: UserT[] }>('/', async (req, reply) => {
    const user = await createUser(req.body)

    return reply.status(201).send(user)
  })

  server.get('/', async (req, reply) => {
    const users = await findUsers()
    reply.status(201).send(users)
  })

  server.get('/:userId', async (req, reply) => {
    // TODO fix typing
    const { userId } = req.params
    const user = await findUserByTgId(userId)

    reply.status(201).send(user)
  })
}
