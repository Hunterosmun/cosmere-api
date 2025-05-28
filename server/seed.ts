import { db } from './db'
import * as schema from './schema'
import * as data from './data'

const planets = await db
  .insert(schema.planets)
  .values(data.planets())
  .returning()

const series = await db.insert(schema.series).values(data.series()).returning()

const books = await db
  .insert(schema.books)
  .values(data.books(planets, series))
  .returning()

/*
  People: 
    - Kaladin Stormblessed - Roshar
    - Shallan Davar - Roshar
    - Jasnah Kholin - Roshar
    - Szeth Son Naturo Son Valano - Roshar
    - Elhokar Kholin - Roshar
    - Dalinar Kholin - Roshar
    - Navani Kohlin - Roshar
    - Kelsier - Scadrial
    - Vin - Scadrial
    - Sazed - Scadrial
    - Raoden - Sel
    - Hoid - Partinel?

  Shards:
    - Harmony - Scadrial - Subshards: [Ruin, Preservation] - Sazed
    - Honor - Roshar
    - Odium - Roshar - Taravangian
    - Cultivation - Roshar
    - Ruin - Scadrial
    - Preservation - Scadrial
    - Dominion - Sel
    - Devotion - Sel
    - Endowment - Nalthis
    - Wimsy - Canticle
    - Ambition - Threnody

  Investiture uses:
    - Surges - Roshar
      - Gravitation - Stormlight
      - Illumination - Stormlight
    - Allomancy - Scadrial
      - Pushing - Steel
      - Pulling - Iron
    - Feruchemy - Scadrial
      - Health - Gold
      - Age - Atium
    - Hemalurgy - Sel
    - Awakening - Nalthis
*/
