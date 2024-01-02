import { FastifyInstance } from 'fastify'

import {
  createUser,
  findUserById,
  getAllUsers,
  updatedUserById,
} from './service'
import { UserT, InsertUserT } from '../../db'

export async function usersController(server: FastifyInstance) {
  server.post<{ Body: InsertUserT; Reply: UserT }>('/', async (req, reply) => {
    const user = await createUser(req.body)

    return reply.status(201).send(user)
  })

  server.patch<{
    Body: InsertUserT
    Reply: UserT
    Params: Pick<UserT, 'id'>
  }>('/:id', async (req, reply) => {
    const { id } = req.params
    const user = await updatedUserById(id, req.body)

    return reply.status(201).send(user)
  })

  server.get('/', async (req, reply) => {
    const users = await getAllUsers()
    reply.status(201).send(users)
  })

  server.get<{ Params: Pick<InsertUserT, 'id'> }>(
    '/:id',
    async (req, reply) => {
      const { id } = req.params
      const user = await findUserById(id)

      reply.status(201).send(user)
    }
  )
}
