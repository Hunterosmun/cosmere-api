import { db } from './db'

export async function listBooks({ search }: { search?: string | null } = {}) {
  return db.query.books.findMany({
    where: (table, { like }) => {
      return search ? like(table.name, `%${search}%`) : undefined
    },
    with: { series: true },
  })
}

export async function getBookById(id: number) {
  return db.query.books.findFirst({
    where: (table, { eq }) => eq(table.id, id),
  })
}

export async function listPlanets({ search }: { search?: string | null } = {}) {
  return db.query.planets.findMany({
    where: (table, { like }) => {
      return search ? like(table.name, `%${search}%`) : undefined
    },
  })
}

export async function getPlanetById(id: number) {
  return db.query.planets.findFirst({
    where: (table, { eq }) => eq(table.id, id),
  })
}

export async function listBooksByPrimaryPlanet(
  id: number,
  { search }: { search?: string | null } = {}
) {
  return db.query.books.findMany({
    where: (table, { eq, and, like }) => {
      const idQuery = eq(table.primaryPlanetId, id)
      return search ? and(idQuery, like(table.name, `%${search}%`)) : idQuery
    },
  })
}

export async function listSeries({ search }: { search?: string | null } = {}) {
  return db.query.series.findMany({
    where: (table, { like }) => {
      return search ? like(table.name, `%${search}%`) : undefined
    },
  })
}

export async function getSeriesById(id: number) {
  return db.query.series.findFirst({
    where: (table, { eq }) => eq(table.id, id),
  })
}

export async function listBooksBySeries(
  id: number,
  { search }: { search?: string | null } = {}
) {
  return db.query.books.findMany({
    where: (table, { eq, and, like }) => {
      const idQuery = eq(table.seriesId, id)
      return search ? and(idQuery, like(table.name, `%${search}%`)) : idQuery
    },
  })
}
