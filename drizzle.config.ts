import { defineConfig } from 'drizzle-kit'
import { DB_FILE_NAME } from './server/config'

export default defineConfig({
  out: './drizzle',
  schema: './server/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: DB_FILE_NAME,
  },
})
