export * from './public'

import { drizzle } from 'drizzle-orm/node-postgres'

const url = () => {
  const url = new URL(process.env.DATABASE_URL!)
  url.searchParams.set('uselibpqcompat', 'true')
  return url.toString()
}

export const db = drizzle(url())
