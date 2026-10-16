import { TrendingUp, TrendingDown } from 'lucide-react'
import { useMarketData } from '../hooks/useMarketData'
import { PROJECT } from '../config'

function fmt(n: number | null, prefix = '$', decimals = 2) {
  if (n === null) return '—'
  if (n >= 1_000_000_000) return `${prefix}${(n / 1_000_000_000).toFixed(2)}B`
  if (n >= 1_000_000) return `${prefix}${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `${prefix}${(n / 1_000).toFixed(2)}K`
  return `${prefix}${n.toFixed(decimals)}`
}

function fmtPrice(n: number | null) {
  if (n === null) return '—'
  if (n < 0.000001) return `$${n.toExponential(3)}`
  if (n < 0.01) return `$${n.toFixed(8)}`
  return `$${n.toFixed(4)}`
}

function Change({ val }: { val: number | null }) {
  if (val === null) return <span className="text-cream/40">—</span>
  const pos = val >= 0
  return (
    <span className={`flex items-center gap-0.5 ${pos ? 'text-lime' : 'text-pink'}`}>
      {pos ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
      {pos ? '+' : ''}{val.toFixed(2)}%
    </span>
  )
}

const ITEMS = (data: ReturnType<typeof useMarketData>['data']) => [
  { label: `${PROJECT.ticker} Price`, value: fmtPrice(data.price) },
  { label: '24h Change', value: <Change val={data.priceChange24h} /> },
  { label: '1h Change', value: <Change val={data.priceChange1h} /> },
  { label: 'Market Cap', value: fmt(data.marketCap) },
  { label: 'FDV', value: fmt(data.fdv) },
  { label: '24h Volume', value: fmt(data.volume24h) },
  { label: 'Liquidity', value: fmt(data.liquidity) },
  { label: '24h Buys', value: data.buys24h !== null ? <span className="text-lime">{data.buys24h}</span> : '—' },
  { label: '24h Sells', value: data.sells24h !== null ? <span className="text-pink">{data.sells24h}</span> : '—' },
]

export default function MarqueeTicker() {
  const { data } = useMarketData()
  const items = ITEMS(data)
  // Duplicate for seamless loop
  const all = [...items, ...items]

  return (
    <div className="w-full overflow-hidden bg-dark-card/80 border-y border-dark-border backdrop-blur-sm">
      <div className="flex animate-marquee whitespace-nowrap py-2.5">
        {all.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-6 text-sm">
            <span className="text-cream/40 text-xs uppercase tracking-wider">{item.label}</span>
            <span className="font-semibold tabular-nums text-cream">{item.value}</span>
            <span className="text-dark-border ml-2">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
