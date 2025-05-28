import { relations } from 'drizzle-orm'
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

// Idea is we're doing Cosmere based info for our API
export const planets = sqliteTable('planets', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
})

export const series = sqliteTable('series', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
})

export const books = sqliteTable('books', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  releaseDate: int('release_date', { mode: 'timestamp' }).notNull(),
  seriesId: int('series_id').references(() => series.id),
  primaryPlanetId: int('primary_planet_id').references(() => planets.id),
})

// export const characters = sqliteTable('characters', {
//   id: int().primaryKey({ autoIncrement: true }),
//   name: text().notNull(),
// })

// Relations (this is so you can query planets on books, etc)

export const booksRelations = relations(books, ({ one }) => ({
  series: one(series, {
    fields: [books.seriesId],
    references: [series.id],
  }),
  primaryPlanet: one(planets, {
    fields: [books.primaryPlanetId],
    references: [planets.id],
  }),
}))

export const seriesRelations = relations(series, ({ many }) => ({
  books: many(books),
}))

export const planetsRelations = relations(planets, ({ many }) => ({
  booksPrimarilySetOn: many(books),
}))
