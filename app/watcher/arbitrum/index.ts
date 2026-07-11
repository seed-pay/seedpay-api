import { createPublicClient, webSocket as ws } from 'viem'
import { arbitrum } from 'viem/chains'

import { ARB_CHAIN_ID } from '../../constants'
import { logger } from '../../logger'
import { PROCESSED_EVENT } from '../abi'
import { handleLog } from '../handler'

import type { Address } from 'viem'

const url = process.env.ARBITRUM_WS!
const address = process.env.SEED_ARB_ADDRESS! as Address
const delay = 5000

const client = createPublicClient({
  transport: ws(url, { reconnect: { delay, attempts: Infinity } }),
  chain: arbitrum,
})

let recoveryTimer: NodeJS.Timeout | undefined
let healthy = true

export const watchArb = (callbacks?: {
  onStatus?: (healthy: boolean) => void
}) => {
  const setStatus = (value: boolean) => {
    if (healthy === value) return
    healthy = value
    callbacks?.onStatus?.(value)
  }

  const waitRecovery = () => {
    if (recoveryTimer) return
    recoveryTimer = setInterval(async () => {
      try {
        await client.getBlockNumber()
        setStatus(true)
        logger.info('ARB watcher restarted')
        clearInterval(recoveryTimer)
        recoveryTimer = undefined
      } catch {
        logger.info('ARB watcher failed restart')
        setStatus(false)
      }
    }, delay)
  }

  client.watchContractEvent({
    address,
    abi: [PROCESSED_EVENT],
    onError(error) {
      logger.error({ err: error }, 'ARB watcher error')
      setStatus(false)
      waitRecovery()
    },
    onLogs: async (logs) => {
      setStatus(true)
      for (const log of logs) {
        await handleLog(ARB_CHAIN_ID, log)
      }
    },
  })

  logger.info(`ARB watcher at ${address}`)
}
