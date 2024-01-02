import { eq } from 'drizzle-orm'

import { db, PostsT, InsertPostsT, posts } from '../../db'

export async function createPost(input: InsertPostsT) {
  const post = await db.insert(posts).values(input).returning()

  return post[0]
}

export async function getAllPosts() {
  return await db.select().from(posts)
}

export async function findPostById(id: PostsT['id']) {
  const post = await db.select().from(posts).where(eq(posts.id, id)).limit(1)

  return post[0]
}
