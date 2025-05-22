import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

// Idea is we're doing Cosmere based info for our API
export const planets = sqliteTable('planets', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
})
