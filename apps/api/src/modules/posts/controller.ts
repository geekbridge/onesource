import { FastifyInstance } from 'fastify'

import { createPost, findPostById, getAllPosts } from './service'
import { PostsT, InsertPostsT } from '../../db'

export async function postsController(server: FastifyInstance) {
  server.post<{ Body: InsertPostsT; Reply: PostsT }>(
    '/',
    async (req, reply) => {
      const post = await createPost(req.body)

      return reply.status(201).send(post)
    }
  )

  server.get('/', async (req, reply) => {
    const posts = await getAllPosts()
    reply.status(201).send(posts)
  })

  server.get<{ Params: Pick<PostsT, 'id'> }>('/:id', async (req, reply) => {
    const { id } = req.params
    const post = await findPostById(id)

    reply.status(201).send(post)
  })
}
