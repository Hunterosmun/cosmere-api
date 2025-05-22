import indexHTML from '../client/index.html'
import { PORT } from './config'
const server = Bun.serve({
  port: PORT,
  routes: {
    '/*': indexHTML,
    '/doINeedToShave': (req) => new Response('Nope'),
    '/greet/:name': (req) => {
      return new Response(`Hello ${req.params.name}`)
    },
  },
  fetch(req) {
    return new Response("Oh no! You found a route we don't have!")
  },
})

console.log(`Listening on ${server.url}`)
