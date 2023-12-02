import fastify from 'fastify'

import { userController } from './modules/user'

export function buildServer() {
  const server = fastify()

  server.get('/', async function () {
    return { status: 'OK' }
  })

  server.register(userController, { prefix: 'user' })

  return server
}
