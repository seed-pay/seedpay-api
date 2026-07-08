import { createPublicClient, webSocket } from 'viem'
import { arbitrum } from 'viem/chains'

import { PROCESSED_EVENT } from '../abi'
import { handleLog } from './handler'

import type { Address } from 'viem'

const url = process.env.ARBITRUM_WS!
const address = process.env.SEED_ARB_ADDRESS! as Address

export const start = () => {
  const client = createPublicClient({
    transport: webSocket(url),
    chain: arbitrum,
  })

  client.watchContractEvent({
    address,
    abi: [PROCESSED_EVENT],
    onLogs: (logs) => {
      for (const log of logs) {
        handleLog(log)
      }
    },
    onError: (error) => console.error(error),
  })
  console.log(`Listening Arbitrum ${address}`)
}
