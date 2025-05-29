import { QueryClient } from '@tanstack/react-query'
import { createTRPCClient, httpBatchLink } from '@trpc/client'
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query'
import type { AppRouter } from '../server/trpc'

export const queryClient = new QueryClient()
const client = createTRPCClient<AppRouter>({
  links: [httpBatchLink({ url: '/trpc' })],
})

export const trpc = createTRPCOptionsProxy({ client, queryClient })
