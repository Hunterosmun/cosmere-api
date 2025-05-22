import { db } from './db'
import * as schema from './schema'

await db.delete(schema.planets)

const planetNames = ['Scadrial', 'Roshar', 'Sel', 'Nalthis', 'Taldain']

await Promise.all(
  planetNames.map((name) => db.insert(schema.planets).values({ name }))
)
