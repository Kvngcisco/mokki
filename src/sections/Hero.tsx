import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Copy, ExternalLink, ShoppingCart, BarChart2, Send } from 'lucide-react'
import toast from 'react-hot-toast'
import { PROJECT, TOKEN, SOCIALS } from '../config'
import { ASSETS } from '../assets'

/* ─── Floating coins / sparkles ──────────────────────────────────────────── */
function Particles() {
  const items = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: 4 + Math.random() * 9,
    x: Math.random() * 100,
    delay: Math.random() * 7,
    dur: 6 + Math.random() * 9,
    color: i % 3 === 0 ? '#FFC53D' : i % 3 === 1 ? '#F28C28' : '#3B6BFF',
    opacity: 0.35 + Math.random() * 0.45,
  }))

  return (
    /* hidden under prefers-reduced-motion via CSS class */
    <div className="motion-safe-particles absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {items.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, bottom: '-8%', background: p.color, opacity: p.opacity }}
          animate={{ y: [0, -(380 + Math.random() * 420)], x: [0, (Math.random() - 0.5) * 120], opacity: [0, p.opacity, 0], scale: [0, 1, 0.4] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

/* ─── Hero ────────────────────────────────────────────────────────────────── */
export default function Hero() {
  const contractRef = useRef<HTMLSpanElement>(null)

  const copyContract = () => {
    navigator.clipboard.writeText(TOKEN.contractAddress)
    toast.success('Contract address copied!', { icon: '📋' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden"
    >
      {/* ── Background glows ─────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none opacity-[0.07]"
        style={{ background: 'radial-gradient(circle, #FFC53D 0%, transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full pointer-events-none blur-3xl opacity-[0.06]"
        style={{ background: '#3B6BFF' }}
      />

      <Particles />

      {/* ── Content grid ─────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-4">

          {/* ── LEFT: text ────────────────────────────────────────────────── */}
          <div className="flex-1 text-center lg:text-left lg:max-w-[55%]">

            {/* Live badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              <span className="text-sm text-gold font-semibold">Live on BNB Smart Chain</span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-tight mb-4">
              <span className="block">
                {['Built', 'for', 'the'].map((word, i) => (
                  <motion.span
                    key={word + i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="inline-block mr-3 text-cream"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="block"
                style={{
                  background: 'linear-gradient(135deg, #FFC53D, #F28C28)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Community
              </motion.span>
            </h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-lg text-cream/70 max-w-xl mb-8 leading-relaxed"
            >
              {PROJECT.shortDescription}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="flex flex-wrap items-center gap-3 justify-center lg:justify-start mb-8"
            >
              <a href={TOKEN.pancakeSwapUrl} target="_blank" rel="noopener noreferrer" className="btn-gold">
                <ShoppingCart className="w-4 h-4" />
                Buy {PROJECT.ticker}
              </a>
              <a href={TOKEN.dexScreenerUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
                <BarChart2 className="w-4 h-4" />
                Live Chart
              </a>
              <a href={SOCIALS.telegram ?? '#'} target="_blank" rel="noopener noreferrer" className="btn-outline">
                <Send className="w-4 h-4" />
                Telegram
              </a>
              <a href={SOCIALS.twitter ?? '#'} target="_blank" rel="noopener noreferrer" className="btn-outline">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Follow on X
              </a>
            </motion.div>

            {/* Contract bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="flex flex-col sm:flex-row items-center gap-2"
            >
              <span className="text-xs text-cream/40 uppercase tracking-wider whitespace-nowrap">Contract:</span>
              <button onClick={copyContract} className="contract-bar flex-1 max-w-sm" title="Click to copy contract address">
                <span ref={contractRef} className="truncate text-xs">{TOKEN.contractAddress}</span>
                <Copy className="w-3.5 h-3.5 text-gold flex-shrink-0" />
              </button>
              <a href={TOKEN.bscScanUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-gold hover:text-orange transition-colors whitespace-nowrap">
                Verify on BscScan <ExternalLink className="w-3 h-3" />
              </a>
            </motion.div>
          </div>

          {/* ── RIGHT: mascot ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="hero-mascot-wrap relative flex-shrink-0 flex items-end justify-center"
          >
            {/* Radial glow — 70% of mascot width, no box */}
            <motion.div
              aria-hidden="true"
              animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.75, 0.45] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 70% 60% at 55% 55%, rgba(255,197,61,0.38) 0%, rgba(242,140,40,0.16) 50%, transparent 75%)',
                filter: 'blur(28px)',
              }}
            />

            {/* Mascot — transparent PNG, no wrapper box */}
            <motion.img
              src={ASSETS.mascot}
              alt="MOKKI DAO mascot — cheerful orange bull holding a cocktail"
              loading="eager"
              fetchPriority="high"
              className="hero-mascot relative"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                filter: [
                  'drop-shadow(0 0 2px rgba(255,197,61,0.7))',
                  'drop-shadow(0 20px 40px rgba(242,140,40,0.45))',
                  'saturate(1.1)',
                  'contrast(1.05)',
                ].join(' '),
              }}
            />

            {/* ── Floating stat badges — never cover the face ───────────── */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6 }}
              className="badge-card absolute left-0 bottom-1/3 glass-card px-3 py-2 text-xs whitespace-nowrap"
            >
              <div className="text-cream/50">Tax</div>
              <div className="font-bold text-lime text-sm">0 / 0</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8 }}
              className="badge-card absolute right-0 top-1/4 glass-card px-3 py-2 text-xs whitespace-nowrap"
            >
              <div className="text-cream/50">Ownership</div>
              <div className="font-bold text-gold text-sm">Renounced ✓</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0 }}
              className="badge-card absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 glass-card px-3 py-2 text-xs whitespace-nowrap"
            >
              <div className="text-cream/50">Supply</div>
              <div className="font-bold text-gold tabular-nums text-sm">1,000,000,000</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-xs text-cream/30 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-cream/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-gold/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}
