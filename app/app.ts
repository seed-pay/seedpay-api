import 'dotenv/config'

import { structuredLogger } from '@hono/structured-logger'
import { requestId } from 'hono/request-id'
import { Hono } from 'hono/tiny'

import { transactions, watcher } from './api'
import { logger } from './logger'

const app = new Hono()

app.use(requestId())
app.use(
  structuredLogger({
    createLogger: (c) => logger.child({ requestId: c.var.requestId }),
  })
)

app.route('/txs', transactions)
app.route('/watcher', watcher)

export default app
