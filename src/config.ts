// ============================================================
// MOKKI DAO — Single Source of Truth
// Update this file to change any project data.
// ============================================================

export const PROJECT = {
  name: 'MOKKI DAO',
  ticker: '$MOKKI',
  tagline: 'Built entirely for the community, driven by true decentralization and shared DAO governance.',
  shortDescription:
    'MOKKI DAO is a 100% community-owned, decentralized Web3 ecosystem designed to drive community governance, utility, and GameFi innovation on the BNB Smart Chain.',
  longDescription:
    'MOKKI DAO puts real power in the hands of its holders. Through on-chain governance, community-run initiatives, and an expanding suite of GameFi utilities, $MOKKI is building the future of decentralized communities — one vote, one game, one milestone at a time.',
  domain: 'mokkidao.com', // TODO: confirm domain
  launchDate: 'Token is live on PancakeSwap', // TODO: exact launch date
  chain: 'BNB Smart Chain (BSC)',
  chainId: 56,
}

export const TOKEN = {
  contractAddress: '0x26B9fe87c94ce0535b7B5f4f4Dda03480Fa98B39',
  decimals: 18,
  totalSupply: '1,000,000,000',
  totalSupplyRaw: 1_000_000_000,
  circulatingSupply: null, // TODO: confirm circulating supply
  buyTax: 0,
  sellTax: 0,
  ownershipRenounced: true,
  launchPlatform: 'PancakeSwap',
  tradingPairAddress: null, // TODO: add main MOKKI/BNB or MOKKI/BUSD pair address
  pancakeSwapUrl:
    'https://pancakeswap.finance/swap?outputCurrency=0x26B9fe87c94ce0535b7B5f4f4Dda03480Fa98B39',
  dexScreenerUrl:
    'https://dexscreener.com/bsc/0x6c92527806525a9fb605301e2922d5500108f4d9',
  bscScanUrl:
    'https://bscscan.com/token/0x26B9fe87c94ce0535b7B5f4f4Dda03480Fa98B39',
}

// TODO: Fill in real tokenomics allocations
export const TOKENOMICS = {
  allocations: [
    { label: 'Liquidity', percentage: 40, color: '#FFC53D' },
    { label: 'Community', percentage: 30, color: '#F28C28' },
    { label: 'Marketing', percentage: 20, color: '#3B6BFF' },
    { label: 'Treasury', percentage: 10, color: '#8BD450' },
  ],
  liquidityLock: {
    locked: null, // TODO: true/false
    platform: null, // TODO: e.g. 'PinkLock'
    unlockDate: null, // TODO: unlock date
    proofUrl: null, // TODO: lock proof URL
  },
  burnDetails: null, // TODO: burn mechanism details
}

export const TRUST = {
  auditUrl: null, // TODO: audit report URL
  auditor: null, // TODO: auditor name
  isDoxxed: false,
  transparencyStatement:
    'The MOKKI DAO team operates anonymously to maintain decentralization. The project is fully community-driven with renounced ownership and no mint function.',
  scannerLinks: [
    {
      name: 'BscScan',
      url: 'https://bscscan.com/token/0x26B9fe87c94ce0535b7B5f4f4Dda03480Fa98B39',
      icon: 'scan',
    },
    {
      name: 'DexScreener',
      url: 'https://dexscreener.com/bsc/0x6c92527806525a9fb605301e2922d5500108f4d9',
      icon: 'bar-chart-2',
    },
    {
      name: 'Token Sniffer',
      url: 'https://tokensniffer.com/token/bsc/0x26B9fe87c94ce0535b7B5f4f4Dda03480Fa98B39',
      icon: 'shield',
    },
  ],
}

// TODO: Fill in roadmap milestones
export const ROADMAP = [
  {
    phase: 'Phase 1',
    title: 'Launch & Community',
    status: 'completed' as const,
    items: [
      'Token deployment on BSC',
      'PancakeSwap listing',
      'Community building (X, Telegram)',
      'Website launch',
      'Ownership renounced',
    ],
  },
  {
    phase: 'Phase 2',
    title: 'Growth & Utility',
    status: 'in-progress' as const,
    items: [
      'DAO governance portal',
      'Staking contract deployment',
      'CEX listing applications',
      'Marketing campaigns',
      'Audit & trust building',
    ],
  },
  {
    phase: 'Phase 3',
    title: 'GameFi & Ecosystem',
    status: 'planned' as const,
    items: [
      'GameFi platform launch',
      'NFT collection',
      'Cross-chain bridge exploration',
      'Community governance voting',
      'Strategic partnerships',
    ],
  },
  {
    phase: 'Phase 4',
    title: 'DAO Maturity',
    status: 'planned' as const,
    items: [
      'Full on-chain governance',
      'Revenue sharing for holders',
      'Ecosystem grants program',
      'Global community expansion',
    ],
  },
]

export const SOCIALS = {
  twitter: 'https://x.com/mokkicoin',
  telegram: 'https://t.me/mokkidaocoin',
  discord: null,
  tiktok: null,
  youtube: null,
  github: null,
}

export const STAKING = {
  enabled: false, // Set to true when contract is deployed
  contractAddress: null, // TODO: staking contract address
  rewardToken: '$MOKKI',
  lockPeriods: [
    { days: 30, apr: 25 },
    { days: 90, apr: 60 },
    { days: 180, apr: 120 },
  ],
  minStake: 10_000,
}

export const DAO = {
  snapshotUrl: null, // TODO: Snapshot.org space URL
  description:
    'MOKKI DAO governance allows every $MOKKI holder to propose and vote on key decisions — from treasury spending to ecosystem partnerships. Your tokens are your votes.',
}

export const FAQ = [
  {
    q: 'What is MOKKI DAO?',
    a: 'MOKKI DAO is a 100% community-owned, decentralized Web3 ecosystem on BNB Smart Chain, focused on community governance, utility, and GameFi innovation.',
  },
  {
    q: 'What is the contract address?',
    a: '0x26B9fe87c94ce0535b7B5f4f4Dda03480Fa98B39 — always verify on BscScan before buying.',
  },
  {
    q: 'Is there a buy/sell tax?',
    a: '$MOKKI has a 0/0 tax — no fees on buys or sells.',
  },
  {
    q: 'Is ownership renounced?',
    a: 'Yes. Ownership of the $MOKKI contract has been fully renounced, meaning no one can change the contract.',
  },
  {
    q: 'How do I buy $MOKKI?',
    a: 'Connect your wallet to PancakeSwap, switch to BNB Smart Chain, and swap BNB for $MOKKI using the official contract address.',
  },
  {
    q: 'When is staking launching?',
    a: 'Staking is in development and will be announced through our official Telegram and X channels.',
  },
  {
    q: 'How does DAO governance work?',
    a: 'Holders will be able to vote on proposals proportional to their $MOKKI balance. Governance tools are coming in Phase 2.',
  },
  {
    q: 'Are the developers doxxed?',
    a: 'The team is anonymous to maintain decentralization. The contract is renounced and verifiable on BscScan.',
  },
]

export const DEXSCREENER_API = `https://api.dexscreener.com/latest/dex/tokens/${TOKEN.contractAddress}`
export const DEXSCREENER_PAIR_API = `https://api.dexscreener.com/latest/dex/pairs/bsc/0x6c92527806525a9fb605301e2922d5500108f4d9`
