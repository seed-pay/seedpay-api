import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

const url = () => {
  const url = new URL(process.env.DATABASE_URL!)
  url.searchParams.set('uselibpqcompat', 'true')
  return url.toString()
}

export default defineConfig({
  out: './drizzle',
  schema: './db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: { url: url() },
})
