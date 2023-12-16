import {
  pgTable,
  varchar,
  integer,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core'

export const tgUsers = pgTable('tgUsers', {
  id: integer('id').primaryKey().unique(),
  username: varchar('username', { length: 256 }),
  firstName: varchar('firstName', { length: 256 }),
  lastName: varchar('lastName', { length: 256 }),
  isBot: boolean('isBot'),
  isPremium: boolean('isPremium'),
  languageCode: varchar('languageCode', { length: 256 }),
  createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow(),
})

export type TgUserT = typeof tgUsers.$inferSelect // return type when queried
export type NewTgUserT = typeof tgUsers.$inferInsert // insert type
