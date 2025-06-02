import indexHTML from '../client/index.html'
import { PORT } from './config'
import * as service from './service'

const server = Bun.serve({
  port: PORT,
  routes: {
    '/*': indexHTML,
    '/api/books': async () => {
      const books = await service.listBooks()
      const results = books.map((b) => addLinks(b, 'books'))
      return Response.json({ results })
    },
    '/api/books/:id': async (req) => {
      const id = req.params.id
      const book = await service.getBookById(Number(id))
      if (!book) {
        return Response.json({ error: 'Book not found' }, { status: 404 })
      }
      const results = addLinks(book, 'books')
      return Response.json({ results })
    },
    '/api/planets': async () => {
      const planets = await service.listPlanets()
      const results = planets.map((p) => addLinks(p, 'planets'))
      return Response.json({ results })
    },
    '/api/planets/:id': async (req) => {
      const id = req.params.id
      const planet = await service.getPlanetById(Number(id))
      if (!planet) {
        return Response.json({ error: 'Planet not found' }, { status: 404 })
      }
      const results = addLinks(planet, 'planets')
      return Response.json({ results })
    },
  },
  fetch(req) {
    return new Response("Oh no! You found a route we don't have!")
  },
})

console.log(`Listening on ${server.url}`)

function addLinks(res: any, url: string) {
  const links: Record<string, string> = {}
  links.url = `/api/${url}/${res.id}`
  if (res.seriesId) {
    links.series = `/api/series/${res.seriesId}`
  }
  if (res.primaryPlanetId) {
    links.primaryPlanet = `/api/planets/${res.primaryPlanetId}`
  }
  if (res.booksPrimarilySetOn) {
    links.booksPrimarilySetOn = res.booksPrimarilySetOn.map(
      ({ id }: { id: number }) => `/api/books/${id}`
    )
  }
  return { ...res, links }
}
