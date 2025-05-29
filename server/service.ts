import { db } from './db'
import * as schema from './schema'

export async function listBooks() {
  return db.query.books.findMany({ with: { series: true } })
}

export async function listPlanets() {
  return db.query.planets.findMany()
}
