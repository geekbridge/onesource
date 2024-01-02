import { FastifyInstance } from 'fastify'

import { createService, findServiceById, getAllServices } from './service'
import { InsertServicesT, ServicesT } from '../../db'

export async function servicesController(server: FastifyInstance) {
  server.post<{ Body: InsertServicesT; Reply: ServicesT }>(
    '/',
    async (req, reply) => {
      const service = await createService(req.body)

      return reply.status(201).send(service)
    }
  )

  server.get('/', async (req, reply) => {
    const services = await getAllServices()
    reply.status(201).send(services)
  })

  server.get<{ Params: Pick<ServicesT, 'id'> }>('/:id', async (req, reply) => {
    const { id } = req.params
    const service = await findServiceById(id)

    reply.status(201).send(service)
  })
}
