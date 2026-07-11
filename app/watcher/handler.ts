import { stringify } from 'uuid'
import { hexToBytes } from 'viem'

import { db, processed } from '../../db'

import type { GetLogsReturnType } from 'viem'
import type { PROCESSED_EVENT } from './abi'

type Log = GetLogsReturnType<typeof PROCESSED_EVENT>[0]

export const handleLog = async (
  chainId: number,
  log: Log,
  timestamp?: bigint
) => {
  const miliseconds = Number(timestamp ? timestamp : log.blockTimestamp!) * 1000
  const data = {
    id: stringify(hexToBytes(log.args.id!)),
    token: log.args.token!,
    recipient: log.args.recipient!,
    affiliate: log.args.affiliate!,
    intentAmount: String(log.args.intentAmount!),
    recipientAmount: String(log.args.recipientAmount!),
    protocolAmount: String(log.args.protocolAmount!),
    affiliateAmount: String(log.args.affiliateAmount!),
    srcChainId: log.args.srcChainId!,
    status: log.args.status!,
    srcAddress: null,

    timestamp: new Date(miliseconds),
    blockNumber: String(log.blockNumber!),
    blockHash: log.blockHash!,
  } as const

  const [row] = await db
    .insert(processed)
    .values({
      chainId,
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
    .returning()

  return row
}
