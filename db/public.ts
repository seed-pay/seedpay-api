import {
  bigint,
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  uuid,
} from 'drizzle-orm/pg-core'

export const processed = pgTable(
  'processed',
  {
    chainId: integer().notNull(),
    address: text().notNull(),
    transactionHash: text().notNull(),
    logIndex: integer().notNull(),

    id: uuid().notNull(),
    token: text().notNull(),
    recipient: text().notNull(),
    affiliate: text().notNull(),
    intentAmount: bigint({ mode: 'bigint' }).notNull(),
    recipientAmount: bigint({ mode: 'bigint' }).notNull(),
    protocolAmount: bigint({ mode: 'bigint' }).notNull(),
    affiliateAmount: bigint({ mode: 'bigint' }).notNull(),
    srcChainId: integer(),
    srcAddress: text(),
    status: integer().notNull(),

    timestamp: bigint({ mode: 'bigint' }).notNull(),
    blockNumber: bigint({ mode: 'bigint' }).notNull(),
    blockHash: text().notNull(),
  },
  (x) => [
    primaryKey({
      columns: [x.chainId, x.transactionHash, x.logIndex, x.address],
    }),
    index('processed_events_id_idx').on(x.id),
    index('processed_events_recipient_idx').on(x.recipient),
    index('processed_events_affiliate_idx').on(x.affiliate),
    index('processed_events_status_idx').on(x.status),
  ]
)
