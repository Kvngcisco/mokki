import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Copy, ExternalLink, ShoppingCart, BarChart2, Send } from 'lucide-react'
import toast from 'react-hot-toast'
import { PROJECT, TOKEN, SOCIALS } from '../config'
import { ASSETS } from '../assets'

/* ─── Particles ──────────────────────────────────────────────────────────── */
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
    <div className="motion-safe-particles absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {items.map(p => (
        <motion.div key={p.id} className="absolute rounded-full"
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
    <section id="hero" className="hero-section relative overflow-hidden">

      {/* ── Background glows ───────────────────────────────────────────── */}
      <div aria-hidden="true" className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none opacity-[0.07]"
        style={{ background: 'radial-gradient(circle, #FFC53D 0%, transparent 70%)' }} />
      <div aria-hidden="true" className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full pointer-events-none blur-3xl opacity-[0.06]"
        style={{ background: '#3B6BFF' }} />

      <Particles />

      {/* ══════════════════════════════════════════════════════════════════
          MOBILE POSTER LAYOUT  (< 768px)
          Stack: [mascot-wrap (pos:relative)] then [content (neg-margin overlap)]
          At md+ this whole structure is overridden by the desktop flex row.
      ══════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full">

        {/* ── MASCOT BLOCK ── visible on mobile as top layer ─────────────
            On desktop (lg) this becomes the right column via CSS reorder   */}
        <div className="hero-mascot-outer">
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="hero-mascot-wrap relative flex items-end justify-center"
          >
            {/* Radial glow */}
            <motion.div aria-hidden="true"
              animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.75, 0.45] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 70% 60% at 55% 55%, rgba(255,197,61,0.38) 0%, rgba(242,140,40,0.16) 50%, transparent 75%)',
                filter: 'blur(28px)',
              }}
            />

            {/* Mascot */}
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

            {/* Floating badges — DESKTOP ONLY (hidden on mobile via CSS) */}
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.6 }}
              className="hero-badge badge-card absolute left-0 bottom-1/3 glass-card px-3 py-2 text-xs whitespace-nowrap">
              <div className="text-cream/50">Tax</div>
              <div className="font-bold text-lime text-sm">0 / 0</div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.8 }}
              className="hero-badge badge-card absolute right-0 top-1/4 glass-card px-3 py-2 text-xs whitespace-nowrap">
              <div className="text-cream/50">Ownership</div>
              <div className="font-bold text-gold text-sm">Renounced ✓</div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.0 }}
              className="hero-badge badge-card absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 glass-card px-3 py-2 text-xs whitespace-nowrap">
              <div className="text-cream/50">Supply</div>
              <div className="font-bold text-gold tabular-nums text-sm">1,000,000,000</div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── CONTENT BLOCK ─────────────────────────────────────────────── */}
        <div className="hero-content-outer">
          {/* Scrim: only visible on mobile, fades mascot belly into bg */}
          <div className="hero-scrim" aria-hidden="true" />

          <div className="hero-content-inner relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 text-center lg:text-left">

            {/* Live badge */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 mb-5">
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              <span className="text-sm text-gold font-semibold">Live on BNB Smart Chain</span>
            </motion.div>

            {/* Headline */}
            <h1 className="hero-headline font-display font-extrabold leading-tight mb-4">
              <span className="block">
                {['Built', 'for', 'the'].map((word, i) => (
                  <motion.span key={word + i}
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="inline-block mr-2 text-cream hero-headline-text-shadow">
                    {word}
                  </motion.span>
                ))}
              </span>
              <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                className="block"
                style={{ background: 'linear-gradient(135deg, #FFC53D, #F28C28)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Community
              </motion.span>
            </h1>

            {/* Description */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
              className="hero-desc text-cream/80 max-w-xl mb-7 leading-relaxed mx-auto lg:mx-0">
              {PROJECT.shortDescription}
            </motion.p>

            {/* ── CTA buttons ─── different layout mobile vs desktop ───── */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
              className="hero-buttons mb-6">
              {/* Buy — full width on mobile */}
              <a href={TOKEN.pancakeSwapUrl} target="_blank" rel="noopener noreferrer"
                className="btn-gold hero-btn-primary justify-center">
                <ShoppingCart className="w-4 h-4 flex-shrink-0" />
                Buy {PROJECT.ticker}
              </a>
              {/* Middle row: Chart + Telegram */}
              <div className="hero-btn-row">
                <a href={TOKEN.dexScreenerUrl} target="_blank" rel="noopener noreferrer" className="btn-outline flex-1 justify-center">
                  <BarChart2 className="w-4 h-4" />
                  Live Chart
                </a>
                <a href={SOCIALS.telegram ?? '#'} target="_blank" rel="noopener noreferrer" className="btn-outline flex-1 justify-center">
                  <Send className="w-4 h-4" />
                  Telegram
                </a>
              </div>
              {/* Follow on X — full width on mobile */}
              <a href={SOCIALS.twitter ?? '#'} target="_blank" rel="noopener noreferrer"
                className="btn-outline hero-btn-primary justify-center">
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Follow on X
              </a>
            </motion.div>

            {/* ── Chips row — MOBILE ONLY (replaces floating badges) ────── */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}
              className="hero-chips">
              <span className="hero-chip"><span className="hero-chip-label">Tax</span><span className="text-lime font-bold">0 / 0</span></span>
              <span className="hero-chip"><span className="hero-chip-label">Ownership</span><span className="text-gold font-bold">Renounced ✓</span></span>
              <span className="hero-chip"><span className="hero-chip-label">Supply</span><span className="text-gold font-bold tabular-nums">1,000,000,000</span></span>
            </motion.div>

            {/* Contract bar */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}
              className="flex flex-col sm:flex-row items-center gap-2 mt-5">
              <span className="text-xs text-cream/40 uppercase tracking-wider whitespace-nowrap">Contract:</span>
              <button onClick={copyContract} className="contract-bar flex-1 max-w-sm w-full" title="Click to copy">
                <span ref={contractRef} className="truncate text-xs">{TOKEN.contractAddress}</span>
                <Copy className="w-3.5 h-3.5 text-gold flex-shrink-0" />
              </button>
              <a href={TOKEN.bscScanUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-gold hover:text-orange transition-colors whitespace-nowrap">
                Verify on BscScan <ExternalLink className="w-3 h-3" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20" aria-hidden="true">
        <span className="text-xs text-cream/30 uppercase tracking-widest">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-cream/20 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-gold/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}
