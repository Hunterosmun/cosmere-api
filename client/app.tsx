import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'swagger-ui-react/swagger-ui.css'
import SwaggerUI from 'swagger-ui-react'

import { Explorer } from './explorer'

const client = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={client}>
      <SwaggerUI url="/openapi.json" />
      <h2 className="text-2xl font-bold my-4">Explore!</h2>
      <Explorer />
    </QueryClientProvider>
  )
}
