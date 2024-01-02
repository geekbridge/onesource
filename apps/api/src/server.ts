import fastify from 'fastify'

import { postsController } from './modules/posts'
import { servicesController } from './modules/services'
import { sourcesController } from './modules/sources'
import { subscriptionsController } from './modules/subscriptions'
import { tgUsersController } from './modules/tg-users'
import { usersController } from './modules/users'

export function buildServer() {
  const server = fastify()

  server.get('/', async function () {
    return { status: 'OK' }
  })

  server.register(postsController, { prefix: 'posts' })
  server.register(servicesController, { prefix: 'services' })
  server.register(sourcesController, { prefix: 'sources' })
  server.register(subscriptionsController, { prefix: 'subscriptions' })
  server.register(tgUsersController, { prefix: 'tg-users' })
  server.register(usersController, { prefix: 'users' })

  return server
}
