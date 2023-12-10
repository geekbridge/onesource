import { pgTable, varchar, integer, boolean } from 'drizzle-orm/pg-core'

export const tgUsers = pgTable('tgUsers', {
  id: integer('id').primaryKey().unique(),
  username: varchar('username', { length: 256 }).unique().notNull(),
  firstName: varchar('firstName', { length: 256 }),
  lastName: varchar('lastName', { length: 256 }),
  isBot: boolean('isBot'),
  isPremium: boolean('isPremium'),
  languageCode: varchar('languageCode', { length: 256 }),
  phone: varchar('phone', { length: 2 }),
})

export type UserT = typeof tgUsers.$inferSelect // return type when queried
export type NewUserT = typeof tgUsers.$inferInsert // insert type
