import { db } from './db'
import * as schema from './schema'

export async function listBooks() {
  return db.query.books.findMany({ with: { series: true } })
}

export async function listPlanets() {
  return db.query.planets.findMany()
}

export async function getBookById(id: number) {
  return db.query.books.findFirst({
    where: (table, { eq }) => eq(table.id, id),
  })
}
