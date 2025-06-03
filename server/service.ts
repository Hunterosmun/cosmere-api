import { db } from './db'

export async function listBooks() {
  return db.query.books.findMany({ with: { series: true } })
}

export async function getBookById(id: number) {
  return db.query.books.findFirst({
    where: (table, { eq }) => eq(table.id, id),
  })
}

export async function listPlanets() {
  return db.query.planets.findMany({})
}

export async function getPlanetById(id: number) {
  return db.query.planets.findFirst({
    where: (table, { eq }) => eq(table.id, id),
  })
}

export async function listBooksByPrimaryPlanet(id: number) {
  return db.query.books.findMany({
    where: (table, { eq }) => eq(table.primaryPlanetId, id),
  })
}

export async function listSeries() {
  return db.query.series.findMany({})
}

export async function getSeriesById(id: number) {
  return db.query.series.findFirst({
    where: (table, { eq }) => eq(table.id, id),
  })
}

export async function listBooksBySeries(id: number) {
  return db.query.books.findMany({
    where: (table, { eq }) => eq(table.seriesId, id),
  })
}
