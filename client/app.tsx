import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Explorer } from './explorer'

const client = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={client}>
      <h1 className="text-2xl font-bold my-4">Explore!</h1>
      <Explorer />
    </QueryClientProvider>
  )
}
