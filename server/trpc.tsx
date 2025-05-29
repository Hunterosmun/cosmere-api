import { initTRPC } from '@trpc/server'
import * as service from './service'

const t = initTRPC.create()

export const router = t.router({
  listBooks: t.procedure.query(async () => {
    return service.listBooks()
  }),
  listPlanets: t.procedure.query(async () => {
    return service.listPlanets()
  }),
})

export type AppRouter = typeof router
