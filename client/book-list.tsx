import { useQuery } from '@tanstack/react-query'
import { trpc } from './trpc'

export function BookList() {
  const query = useQuery(trpc.listBooks.queryOptions())

  if (query.isLoading) return <div>Loading...</div>
  if (query.error) return <div>Error: {query.error.message}</div>

  return (
    <div>
      {query.data?.map((book) => (
        <li key={book.id}>
          {book.name} - {book.series?.name} - {book.releaseDate}
        </li>
      ))}
    </div>
  )
}
