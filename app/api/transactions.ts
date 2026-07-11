import { Hono } from 'hono/tiny'
import { createPublicClient, http } from 'viem'
import { arbitrum } from 'viem/chains'

import { ARB_CHAIN_ID } from '../constants'
import { PROCESSED_EVENT } from '../watcher/abi'
import { handleLog } from '../watcher/handler'

import type { Address, Hash } from 'viem'

const address = process.env.SEED_ARB_ADDRESS! as Address
const event = PROCESSED_EVENT

const rpc = createPublicClient({ chain: arbitrum, transport: http() })

const transactions = new Hono()

export const jsonSafe = (data: unknown) =>
  JSON.parse(
    JSON.stringify(data, (_key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    )
  )

transactions.get(`/${ARB_CHAIN_ID}/:tx`, async (c) => {
  const processed = []
  const hash = c.req.param('tx') as Hash
  const { blockNumber } = await rpc.getTransaction({ hash })
  const { timestamp } = await rpc.getBlock({ blockNumber })

  const logs = await rpc.getLogs({
    fromBlock: blockNumber,
    toBlock: blockNumber,
    address,
    event,
  })

  for (const log of logs) {
    if (log.transactionHash !== hash) continue
    const data = await handleLog(ARB_CHAIN_ID, log, timestamp)
    processed.push(data)
  }

  return c.json(jsonSafe(processed))
})

export { transactions }
