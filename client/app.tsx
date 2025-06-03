import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Explorer } from './explorer'

const client = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={client}>
      <div>Docs will go here!</div>
      <Explorer />
    </QueryClientProvider>
  )
}
