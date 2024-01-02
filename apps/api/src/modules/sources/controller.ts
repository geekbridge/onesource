import { FastifyInstance } from 'fastify'

import { createSource, findSourceById, getAllSources } from './service'
import { InsertSourcesT, SourcesT } from '../../db'

export async function sourcesController(server: FastifyInstance) {
  server.post<{ Body: InsertSourcesT; Reply: SourcesT }>(
    '/',
    async (req, reply) => {
      const source = await createSource(req.body)

      return reply.status(201).send(source)
    }
  )

  server.get('/', async (req, reply) => {
    const sources = await getAllSources()
    reply.status(201).send(sources)
  })

  server.get<{ Params: Pick<SourcesT, 'id'> }>('/:id', async (req, reply) => {
    const { id } = req.params
    const source = await findSourceById(id)

    reply.status(201).send(source)
  })
}
