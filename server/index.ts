import indexHTML from '../client/index.html'
import { PORT } from './config'
import * as service from './service'
import * as schema from './schema'
import openAPI from './openapi.json' with { type: 'json' }

const server = Bun.serve({
  port: PORT,
  routes: {
    '/*': indexHTML,
    '/openapi.json': Response.json(openAPI),
    '/api': async (req) => {
      return Response.json({
        links: {
          books: new URL('/api/books', req.url),
          planets: new URL('/api/planets', req.url),
          series: new URL('/api/series', req.url),
        },
      })
    },
    '/api/books': async (req) => {
      const books = await service.listBooks()
      const results = books.map((book) => addBookLinks(book, req))
      return Response.json({ results })
    },
    '/api/books/:id': async (req) => {
      const id = req.params.id
      const book = await service.getBookById(Number(id))
      if (!book) {
        return Response.json({ error: 'Book not found' }, { status: 404 })
      }
      const results = addBookLinks(book, req)
      return Response.json({ results })
    },
    '/api/planets': async (req) => {
      const planets = await service.listPlanets()
      const results = planets.map((planet) => addPlanetLinks(planet, req))
      return Response.json({ results })
    },
    '/api/planets/:id': async (req) => {
      const id = req.params.id
      const planet = await service.getPlanetById(Number(id))
      if (!planet) {
        return Response.json({ error: 'Planet not found' }, { status: 404 })
      }
      const results = addPlanetLinks(planet, req)
      return Response.json({ results })
    },
    '/api/planets/:id/booksPrimarilySetOn': async (req) => {
      const id = Number.parseInt(req.params.id, 10)
      const books = await service.listBooksByPrimaryPlanet(id)
      const results = books.map((book) => addBookLinks(book, req))
      return Response.json({ results })
    },
    '/api/series': async (req) => {
      const series = await service.listSeries()
      const results = series.map((series) => addSeriesLinks(series, req))
      return Response.json({ results })
    },
    '/api/series/:id': async (req) => {
      const id = Number.parseInt(req.params.id, 10)
      const series = await service.getSeriesById(id)
      if (!series) {
        return Response.json({ error: 'Series not found' }, { status: 404 })
      }
      const results = addSeriesLinks(series, req)
      return Response.json({ results })
    },
    '/api/series/:id/books': async (req) => {
      const id = Number.parseInt(req.params.id, 10)
      const books = await service.listBooksBySeries(id)
      const results = books.map((book) => addBookLinks(book, req))
      return Response.json({ results })
    },
  },
  fetch(req) {
    return new Response("Oh no! You found a route we don't have!")
  },
})

console.log(`Listening on ${server.url}`)

function makeURL(req: Request, path: string) {
  return new URL(path, req.url).toString()
}

function addPlanetLinks(planet: schema.Planet, req: Request) {
  const links: Record<string, string> = {}
  links.url = makeURL(req, `/api/planets/${planet.id}`)
  links.booksPriarilySetOn = makeURL(
    req,
    `/api/planets/${planet.id}/booksPrimarilySetOn`
  )
  links.up = getUpLink(req)
  return { ...planet, links }
}

function addBookLinks(book: schema.Book, req: Request) {
  const links: Record<string, string> = {}
  links.url = makeURL(req, `/api/books/${book.id}`)
  links.series = makeURL(req, `/api/series/${book.seriesId}`)
  links.primaryPlanet = makeURL(req, `/api/planets/${book.primaryPlanetId}`)
  links.up = getUpLink(req)
  return { ...book, links }
}

function addSeriesLinks(series: schema.Series, req: Request) {
  const links: Record<string, string> = {}
  links.url = makeURL(req, `/api/series/${series.id}`)
  links.books = makeURL(req, `/api/series/${series.id}/books`)
  links.up = getUpLink(req)
  return { ...series, links }
}

function getUpLink(req: Request) {
  return req.url.split('/').slice(0, -1).join('/')
}
