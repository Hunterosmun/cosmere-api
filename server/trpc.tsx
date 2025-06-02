import { initTRPC } from '@trpc/server'
import * as v from 'valibot'
import * as service from './service'

const t = initTRPC.create()

export const router = t.router({
  listBooks: t.procedure.query(async () => {
    return service.listBooks()
  }),
  fetchBookById: t.procedure.input(v.number()).query(({ input }) => {
    return service.getBookById(input)
  }),
  listPlanets: t.procedure.query(async () => {
    return service.listPlanets()
  }),
})

export type AppRouter = typeof router
