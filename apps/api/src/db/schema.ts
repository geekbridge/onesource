import { relations } from 'drizzle-orm'
import {
  pgTable,
  varchar,
  timestamp,
  integer,
  boolean,
  serial,
  uuid,
} from 'drizzle-orm/pg-core'

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 256 }).notNull(),
  title: varchar('title', { length: 256 }).notNull(),
  content: varchar('content', { length: 5000 }),
  url: varchar('url', { length: 2048 }).notNull(),
  imageUrl: varchar('imageUrl', { length: 2048 }),
  sourceId: integer('sourceId').references(() => sources.id),
  createdAt: timestamp('createdAt', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updatedAt', { withTimezone: true })
    .defaultNow()
    .notNull(),
})

export const postsRelations = relations(posts, ({ one }) => ({
  source: one(sources, {
    fields: [posts.sourceId],
    references: [sources.id],
  }),
}))

export type PostsT = typeof posts.$inferSelect // return type when queried
export type InsertPostsT = typeof posts.$inferInsert // insert type

export const services = pgTable('services', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 256 }).unique().notNull(),
  hosts: varchar('hosts', { length: 256 }).notNull(),
  imageUrl: varchar('imageUrl', { length: 2048 }),
  createdAt: timestamp('createdAt', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updatedAt', { withTimezone: true })
    .defaultNow()
    .notNull(),
})

export const servicesRelations = relations(services, ({ many }) => ({
  sources: many(sources),
}))

export type ServicesT = typeof services.$inferSelect // return type when queried
export type InsertServicesT = typeof services.$inferInsert // insert type

export const sources = pgTable('sources', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 256 }).notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  description: varchar('description', { length: 5000 }),
  url: varchar('url', { length: 2048 }).notNull(),
  imageUrl: varchar('imageUrl', { length: 2048 }),
  type: varchar('type', { length: 64 }),
  serviceId: integer('serviceId').references(() => services.id),
  createdAt: timestamp('createdAt', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updatedAt', { withTimezone: true })
    .defaultNow()
    .notNull(),
})

export const sourcesRelations = relations(sources, ({ many, one }) => ({
  subscriptions: many(subscriptions),
  posts: many(posts),
  service: one(services, {
    fields: [sources.serviceId],
    references: [services.id],
  }),
}))

export type SourcesT = typeof sources.$inferSelect // return type when queried
export type InsertSourcesT = typeof sources.$inferInsert // insert type

export const subscriptions = pgTable('subscriptions', {
  id: serial('id').primaryKey(),
  userId: integer('userId')
    .references(() => users.id)
    .notNull(),
  sourceId: integer('sourceId')
    .references(() => sources.id)
    .notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updatedAt', { withTimezone: true })
    .defaultNow()
    .notNull(),
})

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
  source: one(sources, {
    fields: [subscriptions.userId],
    references: [sources.id],
  }),
}))

export type SubscriptionsT = typeof subscriptions.$inferSelect // return type when queried
export type InsertSubscriptionsT = typeof subscriptions.$inferInsert // insert type

export const tgUsers = pgTable('tgUsers', {
  id: integer('id').primaryKey().unique(),
  username: varchar('username', { length: 256 }),
  isBot: boolean('isBot'),
  isPremium: boolean('isPremium'),
  createdAt: timestamp('createdAt', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updatedAt', { withTimezone: true })
    .defaultNow()
    .notNull(),
})

export const tgUsersRelations = relations(tgUsers, ({ one }) => ({
  user: one(users, {
    fields: [tgUsers.id],
    references: [users.tgId],
  }),
}))

export type TgUserT = typeof tgUsers.$inferSelect // return type when queried
export type InsertTgUserT = typeof tgUsers.$inferInsert // insert type

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  firstName: varchar('firstName', { length: 256 }),
  lastName: varchar('lastName', { length: 256 }),
  languageCode: varchar('languageCode', { length: 2 }),
  tgId: integer('tgId').references(() => tgUsers.id),
  createdAt: timestamp('createdAt', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updatedAt', { withTimezone: true })
    .defaultNow()
    .notNull(),
})

export const usersRelations = relations(users, ({ many, one }) => ({
  subscriptions: many(subscriptions),
}))

export type UserT = typeof users.$inferSelect // return type when queried
export type InsertUserT = typeof users.$inferInsert // insert type
