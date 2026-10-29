import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, CheckCircle, XCircle, ExternalLink } from 'lucide-react'
import toast from 'react-hot-toast'
import { TOKEN, TOKENOMICS, PROJECT } from '../config'

// Simple SVG donut chart — no external dependency needed
function DonutChart({ data }: { data: typeof TOKENOMICS.allocations }) {
  const [hovered, setHovered] = useState<string | null>(null)
  const total = data.reduce((s, d) => s + d.percentage, 0)
  const cx = 80, cy = 80, r = 60, gap = 3
  let startAngle = -90

  const slices = data.map(item => {
    const angle = (item.percentage / total) * 360
    const endAngle = startAngle + angle - gap
    const toRad = (d: number) => (d * Math.PI) / 180
    const x1 = cx + r * Math.cos(toRad(startAngle))
    const y1 = cy + r * Math.sin(toRad(startAngle))
    const x2 = cx + r * Math.cos(toRad(endAngle))
    const y2 = cy + r * Math.sin(toRad(endAngle))
    const large = angle - gap > 180 ? 1 : 0
    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`
    const slice = { ...item, path, startAngle }
    startAngle += angle
    return slice
  })

  const active = hovered ? data.find(d => d.label === hovered) : null

  return (
    <div className="flex flex-col items-center">
      <svg className="tokenomics-chart" width="160" height="160" viewBox="0 0 160 160" role="img" aria-label="Token allocation chart">
        {slices.map(slice => (
          <path
            key={slice.label}
            d={slice.path}
            fill={slice.color}
            opacity={hovered && hovered !== slice.label ? 0.4 : 1}
            className="cursor-pointer transition-opacity duration-200"
            onMouseEnter={() => setHovered(slice.label)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}
        {/* Inner circle (donut hole) */}
        <circle cx={cx} cy={cy} r={r * 0.55} fill="var(--theme-card, #14141F)" />
        {/* Center text */}
        <text x={cx} y={cy - 6} textAnchor="middle" className="fill-gold font-bold" fontSize="14" fontFamily="Baloo 2, cursive" fill="#FFC53D">
          {active ? `${active.percentage}%` : '1B'}
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize="9" fill="#B9A58B">
          {active ? active.label : 'Total Supply'}
        </text>
      </svg>
    </div>
  )
}

export default function Tokenomics() {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(TOKEN.contractAddress)
    setCopied(true)
    toast.success('Copied!', { icon: '📋' })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="tokenomics" className="py-20 px-4 scroll-mt-28">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="tag mb-4 inline-flex">Tokenomics</span>
          <h2 className="section-title">Token Distribution</h2>
          <p className="text-cream/60 mt-3 max-w-xl mx-auto">
            Fair, transparent, and community-first tokenomics built for long-term sustainability.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-10 text-center"
        >
          <span className="tag inline-flex mb-4">Token Distribution</span>
          <p className="text-lg font-display font-bold text-gold">
            Official breakdown coming soon
          </p>
          <p className="text-sm text-cream/50 mt-2">
            Community-first tokenomics. Full allocation details will be published here.
          </p>
        </motion.div>

        {/* Token details */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            {/* Key stats */}
            <div className="glass-card p-5">
              <h3 className="font-display font-bold text-lg mb-4 text-gold">Token Details</h3>
              <div className="space-y-3">
                {[
                  { label: 'Token Name', value: PROJECT.name },
                  { label: 'Ticker', value: PROJECT.ticker },
                  { label: 'Network', value: 'BNB Smart Chain' },
                  { label: 'Total Supply', value: `${TOKEN.totalSupply} ${PROJECT.ticker}` },
                  { label: 'Decimals', value: String(TOKEN.decimals) },
                  { label: 'Buy Tax', value: `${TOKEN.buyTax}%` },
                  { label: 'Sell Tax', value: `${TOKEN.sellTax}%` },
                  { label: 'Launch Platform', value: TOKEN.launchPlatform },
                ].map(row => (
                  <div key={row.label} className="flex items-center justify-between border-b border-dark-border pb-2 last:border-0 last:pb-0">
                    <span className="text-sm text-cream/50">{row.label}</span>
                    <span className="text-sm font-semibold text-cream">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust indicators */}
            <div className="glass-card p-5">
              <h3 className="font-display font-bold text-lg mb-4 text-gold">Contract Checklist</h3>
              <div className="space-y-3">
                {[
                  { label: 'Ownership Renounced', ok: TOKEN.ownershipRenounced },
                  { label: '0% Buy Tax', ok: TOKEN.buyTax === 0 },
                  { label: '0% Sell Tax', ok: TOKEN.sellTax === 0 },
                  { label: 'No Mint Function', ok: true },
                  { label: 'Open Source (BscScan)', ok: true },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2">
                    {item.ok
                      ? <CheckCircle className="w-4 h-4 text-lime flex-shrink-0" />
                      : <XCircle className="w-4 h-4 text-pink flex-shrink-0" />
                    }
                    <span className="text-sm text-cream/70">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contract address */}
            <div className="glass-card p-4">
              <p className="text-xs text-cream/40 uppercase tracking-wider mb-2">Contract Address</p>
              <button
                onClick={copy}
                className="w-full flex items-center gap-2 bg-dark-bg/50 border border-dark-border rounded-xl px-3 py-2.5 hover:border-gold/40 transition-colors"
              >
                <span className="font-mono text-xs text-cream/60 truncate flex-1 text-left">
                  {TOKEN.contractAddress}
                </span>
                <Copy className={`w-3.5 h-3.5 flex-shrink-0 ${copied ? 'text-lime' : 'text-gold'}`} />
              </button>
              <a
                href={TOKEN.bscScanUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center gap-1.5 text-xs text-gold hover:text-orange transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                View on BscScan
              </a>
            </div>
          </motion.div>
      </div>
    </section>
  )
}
