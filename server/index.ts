import indexHTML from '../client/index.html'
import { PORT } from './config'
import * as service from './service'
import { router } from './trpc'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

async function trpc(req: Request) {
  return fetchRequestHandler({
    endpoint: '/trpc',
    req,
    router,
  })
}

const server = Bun.serve({
  port: PORT,
  routes: {
    '/*': indexHTML,
    '/trpc/*': {
      GET: trpc,
      POST: trpc,
    },
    '/doINeedToShave': (req) => new Response('Nope'),
    '/greet/:name': (req) => {
      return new Response(`Hello ${req.params.name}`)
    },
    '/api/books': async () => {
      const books = await service.listBooks()
      return Response.json(books)
    },
  },
  fetch(req) {
    return new Response("Oh no! You found a route we don't have!")
  },
})

console.log(`Listening on ${server.url}`)
