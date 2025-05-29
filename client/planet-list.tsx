import { useQuery } from '@tanstack/react-query'
import { trpc } from './trpc'

export function PlanetList() {
  const query = useQuery(trpc.listPlanets.queryOptions())

  if (query.isLoading) return <div>Loading...</div>
  if (query.error) return <div>Error: {query.error.message}</div>

  return (
    <div>
      {query.data?.map((planet) => <li key={planet.id}>{planet.name}</li>)}
    </div>
  )
}
