import { useEffect } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { useMarketData } from '../hooks/useMarketData'
import { PROJECT } from '../config'

function fmt(n: number | null, prefix = '$') {
  if (n === null) return '—'
  if (n >= 1_000_000_000) return `${prefix}${(n / 1_000_000_000).toFixed(2)}B`
  if (n >= 1_000_000)     return `${prefix}${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000)         return `${prefix}${(n / 1_000).toFixed(2)}K`
  return `${prefix}${n.toFixed(2)}`
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

export default function MarqueeTicker() {
  const { data } = useMarketData()

  /* Publish --ticker-h so the hero can consume it */
  useEffect(() => {
    document.documentElement.style.setProperty('--ticker-h', '32px')
    return () => { document.documentElement.style.removeProperty('--ticker-h') }
  }, [])

  const items = [
    { label: `${PROJECT.ticker} Price`, value: fmtPrice(data.price) },
    { label: '24h',   value: <Change val={data.priceChange24h} /> },
    { label: '1h',    value: <Change val={data.priceChange1h} /> },
    { label: 'MCap',  value: fmt(data.marketCap) },
    { label: 'Vol',   value: fmt(data.volume24h) },
  ]
  const all = [...items, ...items] // one duplicate for a seamless loop with less repeated markup

  return (
    <div
      className="ticker-bar fixed top-0 left-0 right-0 z-[60] w-full overflow-hidden bg-dark-card/90 border-b border-dark-border/60 backdrop-blur-sm flex items-center"
      role="region"
      aria-label="Live MOKKI token market ticker"
      style={{ height: 'var(--ticker-h, 32px)' }}
    >
      <div className="ticker-inner flex w-max animate-marquee whitespace-nowrap motion-reduce:animate-none">
        {all.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-1.5 px-5 text-xs">
            <span className="text-cream/40 uppercase tracking-wider">{item.label}</span>
            <span className="font-semibold tabular-nums text-cream">{item.value}</span>
            <span className="text-dark-border ml-1.5 text-cream/20">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
