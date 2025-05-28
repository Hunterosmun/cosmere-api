import * as schema from './schema'

export const planets = () => [
  { name: 'Scadrial' },
  { name: 'Roshar' },
  { name: 'Sel' },
  { name: 'Nalthis' },
  { name: 'Taldain' },
  { name: 'Threnody' },
  { name: 'Canticle' },
]

export const series = () => [
  { name: 'Mistborn' },
  { name: 'Stormlight Archive' },
]

export const books = (
  planets: (typeof schema.planets.$inferInsert)[],
  series: (typeof schema.series.$inferInsert)[]
) => [
  {
    name: 'The Final Empire',
    releaseDate: new Date('2006-07-17'),
    seriesId: series.find((s) => s.name === 'Mistborn')?.id,
    primaryPlanetId: planets.find((p) => p.name === 'Scadrial')?.id,
  },
  {
    name: 'The Well of Ascension',
    releaseDate: new Date('2007-08-21'),
    seriesId: series.find((s) => s.name === 'Mistborn')?.id,
    primaryPlanetId: planets.find((p) => p.name === 'Scadrial')?.id,
  },
  {
    name: 'The Hero of Ages',
    releaseDate: new Date('2008-10-14'),
    seriesId: series.find((s) => s.name === 'Mistborn')?.id,
    primaryPlanetId: planets.find((p) => p.name === 'Scadrial')?.id,
  },
  {
    name: 'The Way of Kings',
    releaseDate: new Date('2010-08-31'),
    seriesId: series.find((s) => s.name === 'Stormlight Archive')?.id,
    primaryPlanetId: planets.find((p) => p.name === 'Roshar')?.id,
  },
  {
    name: 'Words of Radiance',
    releaseDate: new Date('2014-03-04'),
    seriesId: series.find((s) => s.name === 'Stormlight Archive')?.id,
    primaryPlanetId: planets.find((p) => p.name === 'Roshar')?.id,
  },
  {
    name: 'Oathbringer',
    releaseDate: new Date('2017-11-14'),
    seriesId: series.find((s) => s.name === 'Stormlight Archive')?.id,
    primaryPlanetId: planets.find((p) => p.name === 'Roshar')?.id,
  },
  {
    name: 'Rhythm of War',
    releaseDate: new Date('2020-11-17'),
    seriesId: series.find((s) => s.name === 'Stormlight Archive')?.id,
    primaryPlanetId: planets.find((p) => p.name === 'Roshar')?.id,
  },
  {
    name: 'Wind and Truth',
    releaseDate: new Date('2024-12-06'),
    seriesId: series.find((s) => s.name === 'Stormlight Archive')?.id,
    primaryPlanetId: planets.find((p) => p.name === 'Roshar')?.id,
  },
]
