import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, RefreshCw, Clock, AlertCircle, BarChart2 } from 'lucide-react'
import { useMarketData } from '../hooks/useMarketData'
import { TOKEN } from '../config'

function fmt(n: number | null, prefix = '$') {
  if (n === null) return null
  if (n >= 1_000_000_000) return `${prefix}${(n / 1_000_000_000).toFixed(2)}B`
  if (n >= 1_000_000) return `${prefix}${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `${prefix}${(n / 1_000).toFixed(2)}K`
  return `${prefix}${n.toFixed(2)}`
}

function fmtPrice(n: number | null) {
  if (n === null) return null
  if (n < 0.000001) return `$${n.toExponential(4)}`
  if (n < 0.01) return `$${n.toFixed(8)}`
  return `$${n.toFixed(6)}`
}

function Skeleton() {
  return <div className="skeleton h-6 w-20 rounded" />
}

function StatItem({
  label,
  value,
  subValue,
  positive,
  loading,
}: {
  label: string
  value: string | null
  subValue?: string | null
  positive?: boolean | null
  loading: boolean
}) {
  return (
    <div className="stat-card">
      <p className="text-xs text-cream/40 uppercase tracking-wider">{label}</p>
      {loading ? (
        <Skeleton />
      ) : (
        <p className={`text-xl font-bold font-display tabular-nums ${
          positive === true ? 'text-lime' :
          positive === false ? 'text-pink' :
          'text-cream'
        }`}>
          {value ?? <span className="text-cream/30 text-sm">Not available</span>}
        </p>
      )}
      {subValue && !loading && (
        <p className="text-xs text-cream/40 tabular-nums">{subValue}</p>
      )}
    </div>
  )
}

function ChangeCard({ label, val, loading }: { label: string; val: number | null; loading: boolean }) {
  const pos = val !== null && val >= 0
  return (
    <div className="stat-card">
      <p className="text-xs text-cream/40 uppercase tracking-wider">{label}</p>
      {loading ? (
        <Skeleton />
      ) : val === null ? (
        <p className="text-cream/30 text-sm">—</p>
      ) : (
        <div className={`flex items-center gap-1 text-xl font-bold font-display tabular-nums ${pos ? 'text-lime' : 'text-pink'}`}>
          {pos ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
          {pos ? '+' : ''}{val.toFixed(2)}%
        </div>
      )}
    </div>
  )
}

/* ── Lazy chart: only mounts the iframe after the user clicks or
   the container has been visible for 2 s (whichever comes first) ────────── */
function LazyChart() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [iframeReady, setIframeReady] = useState(false)
  const loadTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Auto-load after 2 s of visibility
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    let timer: ReturnType<typeof setTimeout>

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!loadTimer.current) loadTimer.current = setTimeout(() => setLoaded(true), 2000)
        } else {
          if (loadTimer.current) { clearTimeout(loadTimer.current); loadTimer.current = null }
        }
      },
      { threshold: 0.2 },
    )
    obs.observe(el)
    return () => { obs.disconnect(); if (loadTimer.current) clearTimeout(loadTimer.current) }
  }, [])

  const src = `https://dexscreener.com/bsc/${TOKEN.contractAddress}?embed=1&theme=dark&trades=0&info=0`

  return (
    <div
      ref={containerRef}
      className="lazy-chart-frame relative w-full rounded-2xl overflow-hidden border border-dark-border"
      style={{ height: 'clamp(300px, 38vw, 420px)' }}
    >
      {/* Placeholder shown until iframe is requested */}
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-dark-card/60 backdrop-blur-sm">
          <BarChart2 className="w-10 h-10 text-gold/40" />
          <p className="text-sm text-cream/50">Live chart</p>
          <button
            onClick={() => setLoaded(true)}
            className="btn-gold text-xs px-5 py-2"
          >
            Load Chart
          </button>
        </div>
      )}

      {/* Spinner while iframe is loading */}
      {loaded && !iframeReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-dark-card/60 backdrop-blur-sm pointer-events-none">
          <RefreshCw className="w-6 h-6 text-gold animate-spin" />
        </div>
      )}

      {/* Iframe — only inserted into the DOM once loaded is true */}
      {loaded && (
        <iframe
          src={src}
          title="MOKKI DAO Live Chart"
          className="w-full h-full"
          loading="lazy"
          allowFullScreen
          style={{ border: 'none', display: 'block' }}
          onLoad={() => setIframeReady(true)}
        />
      )}
    </div>
  )
}

export default function MarketStats() {
  const { data, loading, error, isStale, refresh } = useMarketData()

  const lastUpdatedStr = data.lastUpdated
    ? data.lastUpdated.toLocaleTimeString()
    : null

  return (
    <motion.section
      id="market-stats"
      className="py-16 px-4 scroll-mt-28"
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: 'center bottom' }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h2 className="section-title text-3xl md:text-4xl">Live Market</h2>
            <p className="text-cream/50 text-sm mt-1">Data from DexScreener · refreshes every 30s</p>
          </div>
          <div className="flex items-center gap-3">
            {isStale && (
              <span className="flex items-center gap-1.5 text-xs text-gold bg-gold/10 border border-gold/20 rounded-full px-3 py-1">
                <AlertCircle className="w-3.5 h-3.5" />
                Stale data
              </span>
            )}
            {lastUpdatedStr && (
              <span className="flex items-center gap-1.5 text-xs text-cream/40">
                <Clock className="w-3.5 h-3.5" />
                {lastUpdatedStr}
              </span>
            )}
            <button
              onClick={refresh}
              className="w-8 h-8 rounded-full border border-dark-border flex items-center justify-center hover:border-gold/40 hover:bg-gold/10 transition-all duration-200"
              aria-label="Refresh market data"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-cream/50 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </motion.div>

        {error && !data.price && (
          <div className="mb-6 p-4 rounded-xl bg-pink/10 border border-pink/20 flex items-center gap-3 text-sm text-cream/70">
            <AlertCircle className="w-4 h-4 text-pink flex-shrink-0" />
            Unable to fetch live data. Retrying automatically.
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
        >
          <StatItem label="Price" value={fmtPrice(data.price)} loading={loading} />
          <ChangeCard label="1h Change" val={data.priceChange1h} loading={loading} />
          <ChangeCard label="24h Change" val={data.priceChange24h} loading={loading} />
          <StatItem label="Market Cap" value={fmt(data.marketCap)} loading={loading} />
          <StatItem label="FDV" value={fmt(data.fdv)} loading={loading} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3"
        >
          <StatItem label="24h Volume" value={fmt(data.volume24h)} loading={loading} />
          <StatItem label="Liquidity" value={fmt(data.liquidity)} loading={loading} />
          <div className="stat-card">
            <p className="text-xs text-cream/40 uppercase tracking-wider">24h Buys / Sells</p>
            {loading ? <Skeleton /> : (
              <p className="text-xl font-bold font-display tabular-nums">
                <span className="text-lime">{data.buys24h ?? '—'}</span>
                <span className="text-cream/30 mx-1">/</span>
                <span className="text-pink">{data.sells24h ?? '—'}</span>
              </p>
            )}
          </div>
          <div className="stat-card">
            <p className="text-xs text-cream/40 uppercase tracking-wider">Total Supply</p>
            <p className="text-xl font-bold font-display tabular-nums text-gold">1,000,000,000</p>
            <p className="text-xs text-cream/40">$MOKKI</p>
          </div>
        </motion.div>

        {/* DexScreener chart — lazy loaded */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6"
        >
          <LazyChart />
        </motion.div>
        <div className="text-center mt-3">
          <a
            href={TOKEN.dexScreenerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gold hover:text-orange transition-colors"
          >
            Open full chart on DexScreener →
          </a>
        </div>
      </div>
    </motion.section>
  )
}
