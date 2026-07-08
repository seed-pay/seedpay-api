import { stringify } from 'uuid'
import { hexToBytes } from 'viem'

import { db, processed } from '../../db'
import { ARB_CHAIN_ID } from '../constants'

import type { GetLogsReturnType } from 'viem'
import type { PROCESSED_EVENT } from '../abi'

type Log = GetLogsReturnType<typeof PROCESSED_EVENT>[0]

export const handleLog = async (log: Log) => {
  const data = {
    id: stringify(hexToBytes(log.args.id!)),
    token: log.args.token!,
    recipient: log.args.recipient!,
    affiliate: log.args.affiliate!,
    intentAmount: log.args.intentAmount!,
    recipientAmount: log.args.recipientAmount!,
    protocolAmount: log.args.protocolAmount!,
    affiliateAmount: log.args.affiliateAmount!,
    srcChainId: log.args.srcChainId!,
    srcAddress: null,
    status: log.args.status!,

    timestamp: log.blockTimestamp!,
    blockNumber: log.blockNumber!,
    blockHash: log.blockHash!,
  } as const

  await db
    .insert(processed)
    .values({
      chainId: ARB_CHAIN_ID,
      address: log.address,
      transactionHash: log.transactionHash,
      logIndex: log.logIndex,
      ...data,
    })
    .onConflictDoUpdate({
      target: [
        processed.chainId,
        processed.address,
        processed.transactionHash,
        processed.logIndex,
      ],
      set: data,
    })
}
