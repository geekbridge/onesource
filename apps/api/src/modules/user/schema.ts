import { pgTable, varchar, integer } from 'drizzle-orm/pg-core'

export const tgUsers = pgTable('tgUsers', {
  tgId: integer('tgId').primaryKey().unique(),
  username: varchar('username', { length: 256 }).unique().notNull(),
  fullName: varchar('fullName', { length: 256 }),
  phone: varchar('phone', { length: 256 }),
})

export type UserT = typeof tgUsers.$inferSelect // return type when queried
export type NewUserT = typeof tgUsers.$inferInsert // insert type
