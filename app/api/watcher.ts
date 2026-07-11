import { Hono } from 'hono/tiny'
import { watchArb } from '../watcher'

let live = true

watchArb({
  onStatus: (healthy) => {
    live = healthy
  },
})

const watcher = new Hono()

watcher.get('/health', (c) =>
  c.json({ status: live ? 'ok' : 'error' }, live ? 200 : 503)
)

export { watcher }
