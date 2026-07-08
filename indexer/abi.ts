export const PROCESSED_EVENT = {
  type: 'event',
  name: 'Processed',
  inputs: [
    { indexed: true, name: 'id', type: 'bytes16' },
    { indexed: true, name: 'token', type: 'address' },
    { indexed: true, name: 'recipient', type: 'address' },
    { indexed: false, name: 'affiliate', type: 'address' },
    { indexed: false, name: 'intentAmount', type: 'uint256' },
    { indexed: false, name: 'recipientAmount', type: 'uint256' },
    { indexed: false, name: 'protocolAmount', type: 'uint256' },
    { indexed: false, name: 'affiliateAmount', type: 'uint256' },
    { indexed: false, name: 'srcChainId', type: 'uint32' },
    { indexed: false, name: 'srcAddress', type: 'bytes' },
    { indexed: false, name: 'status', type: 'uint8' },
  ],
} as const
