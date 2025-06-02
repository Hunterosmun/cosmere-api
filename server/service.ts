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
  return db.query.planets.findMany({
    with: {
      booksPrimarilySetOn: {
        columns: {
          id: true,
        },
      },
    },
  })
}

export async function getPlanetById(id: number) {
  return db.query.planets.findFirst({
    where: (table, { eq }) => eq(table.id, id),
    with: {
      booksPrimarilySetOn: {
        columns: {
          id: true,
        },
      },
    },
  })
}
