import fastify from 'fastify'

import { tgUsersController } from './modules/tg-users'

export function buildServer() {
  const server = fastify()

  server.get('/', async function () {
    return { status: 'OK' }
  })

  server.register(tgUsersController, { prefix: 'tg-users' })

  return server
}
