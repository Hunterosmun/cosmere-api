import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './trpc'
import { BookList } from './book-list'
import { PlanetList } from './planet-list'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1 className="font-bold">Books</h1>
      <BookList />
      <h1 className="pt-4 font-bold">Planets</h1>
      <PlanetList />
    </QueryClientProvider>
  )
}
