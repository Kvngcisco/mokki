import { useRef, useMemo } from 'react'
import {
  motion, useScroll, useTransform, useSpring, AnimatePresence,
} from 'framer-motion'
import { Copy, ExternalLink, ShoppingCart, BarChart2, Send, ChevronDown, CheckCircle } from 'lucide-react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import toast from 'react-hot-toast'
import { PROJECT, TOKEN, SOCIALS } from '../config'
import { ASSETS } from '../assets'
import { useMarketData } from '../hooks/useMarketData'
import { useMediaQuery, useReducedMotion } from '../hooks/useMediaQuery'

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function fmtPrice(n: number | null) {
  if (n === null) return null
  if (n < 0.000001) return `$${n.toExponential(4)}`
  if (n < 0.01) return `$${n.toFixed(8)}`
  return `$${n.toFixed(6)}`
}
function fmtNum(n: number | null, prefix = '$') {
  if (n === null) return null
  if (n >= 1e9) return `${prefix}${(n / 1e9).toFixed(2)}B`
  if (n >= 1e6) return `${prefix}${(n / 1e6).toFixed(2)}M`
  if (n >= 1e3) return `${prefix}${(n / 1e3).toFixed(2)}K`
  return `${prefix}${n.toFixed(2)}`
}

/* ─── Skeleton ────────────────────────────────────────────────────────────── */
function Skel({ w = 'w-16' }: { w?: string }) {
  return <span className={`inline-block h-5 rounded ${w} bg-white/10 animate-pulse`} />
}

/* ─── Stat card ───────────────────────────────────────────────────────────── */
function StatCard({
  label, value, loading, positive, delay,
}: {
  label: string; value: string | null; loading: boolean; positive?: boolean | null; delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: 20 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      className="mobile-stat-card"
      style={{ willChange: 'transform' }}
    >
      <p className="text-[10px] uppercase tracking-wider text-cream/40 mb-1">{label}</p>
      {loading
        ? <Skel />
        : <p className={`text-base font-bold font-display tabular-nums ${
            positive === true ? 'text-lime' : positive === false ? 'text-[#F4607A]' : 'text-cream'
          }`}>
            {value ?? <span className="text-cream/30 text-sm">—</span>}
          </p>
      }
    </motion.div>
  )
}

/* ─── Mobile particles ────────────────────────────────────────────────────── */
const PARTICLE_DATA = Array.from({ length: 7 }, (_, i) => ({
  id: i,
  size: 5 + (i * 3) % 9,
  x: 8 + i * 13,
  delay: i * 0.9,
  dur: 7 + i * 1.2,
  color: i % 2 === 0 ? '#FFC53D' : '#F28C28',
  opacity: 0.4 + (i % 3) * 0.12,
}))

function MobileParticles({ scrollY }: { scrollY: any }) {
  const y = useTransform(scrollY, [0, 1], ['0%', '-60%'])
  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ y, willChange: 'transform' }}
    >
      {PARTICLE_DATA.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size, height: p.size,
            left: `${p.x}%`, bottom: `${12 + p.id * 6}%`,
            background: p.color,
          }}
          animate={{ y: [0, -28, 0], opacity: [p.opacity * 0.6, p.opacity, p.opacity * 0.6] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </motion.div>
  )
}

/* ─── Desktop particles (unchanged) ─────────────────────────────────────── */
const DESKTOP_PARTICLE_DATA = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: 4 + Math.random() * 9,
  x: Math.random() * 100,
  delay: Math.random() * 7,
  dur: 6 + Math.random() * 9,
  color: i % 3 === 0 ? '#FFC53D' : i % 3 === 1 ? '#F28C28' : '#3B6BFF',
  opacity: 0.35 + Math.random() * 0.45,
}))

function DesktopParticles() {
  return (
    <div className="motion-safe-particles absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {DESKTOP_PARTICLE_DATA.map(p => (
        <motion.div key={p.id} className="absolute rounded-full"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, bottom: '-8%', background: p.color, opacity: p.opacity }}
          animate={{ y: [0, -(380 + p.dur * 30)], x: [0, (p.id % 2 === 0 ? 1 : -1) * 60], opacity: [0, p.opacity, 0], scale: [0, 1, 0.4] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   MOBILE HERO  (< 768px)
══════════════════════════════════════════════════════════════════════════ */
function MobileHero() {
  const reducedMotion = useReducedMotion()
  const { data, loading } = useMarketData()
  const sectionRef = useRef<HTMLElement>(null)
  const copyRef = useRef<HTMLSpanElement>(null)

  /* Scroll-linked 3D */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const rawRotateX   = useTransform(scrollYProgress, [0, 1], [0, 14])
  const rawTranslateZ = useTransform(scrollYProgress, [0, 1], [0, -120])
  const rawTranslateY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const rawScale     = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const rawOpacity   = useTransform(scrollYProgress, [0, 1], [1, 0.3])

  const springCfg = { stiffness: 90, damping: 20 }
  const rotateX   = useSpring(reducedMotion ? 0 : rawRotateX,   springCfg)
  const translateZ = useSpring(reducedMotion ? 0 : rawTranslateZ, springCfg)
  const translateY = useSpring(reducedMotion ? 0 : rawTranslateY, springCfg)
  const scale      = useSpring(reducedMotion ? 1 : rawScale,     springCfg)
  const opacity    = useSpring(reducedMotion ? 1 : rawOpacity,   springCfg)

  /* Headline layer — slightly shallower depth */
  const hlTranslateZ = useTransform(scrollYProgress, [0, 1], [0, -60])
  const hlSpring     = useSpring(reducedMotion ? 0 : hlTranslateZ, springCfg)

  /* Glow parallax */
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])
  const glowSpring = useSpring(glowY, springCfg)

  /* Particle parallax */
  const particleY = useTransform(scrollYProgress, [0, 1], ['0%', '-60%'])

  const copyContract = () => {
    navigator.clipboard.writeText(TOKEN.contractAddress)
    toast.success('Contract copied!', { icon: '📋' })
  }

  /* Staggered entrance variants */
  const enterVariants = {
    hidden: { opacity: 0, y: 24, rotateX: reducedMotion ? 0 : 20 },
    visible: (i: number) => ({
      opacity: 1, y: 0, rotateX: 0,
      transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    }),
  }

  const stats = [
    { label: 'Price',     value: fmtPrice(data.price),    positive: null as boolean | null },
    { label: '24h',       value: data.priceChange24h !== null ? `${data.priceChange24h >= 0 ? '+' : ''}${data.priceChange24h.toFixed(2)}%` : null,
      positive: data.priceChange24h !== null ? data.priceChange24h >= 0 : null },
    { label: 'Market Cap', value: fmtNum(data.marketCap), positive: null },
    { label: 'Liquidity', value: fmtNum(data.liquidity),  positive: null },
  ]

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative overflow-hidden"
      style={{
        minHeight: 'calc(100svh - var(--ticker-h, 32px) - var(--nav-h, 56px))',
        paddingTop: 'calc(var(--ticker-h, 32px) + var(--nav-h, 56px) + env(safe-area-inset-top, 0px) + 24px)',
        paddingBottom: '60px',
        background: '#0B0B14',
        overflowX: 'hidden',
      }}
    >
      {/* ── Animated grid / dot pattern ───────────────────────────────── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,197,61,0.07) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      {/* ── Background glows (parallax) ───────────────────────────────── */}
      <motion.div aria-hidden="true" className="absolute pointer-events-none"
        style={{
          top: '5%', left: '50%', x: '-50%',
          width: 340, height: 340,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,197,61,0.18) 0%, transparent 70%)',
          filter: 'blur(40px)',
          y: glowSpring,
          willChange: 'transform',
        }}
      />
      <div aria-hidden="true" className="absolute bottom-1/4 right-1/4 w-48 h-48 pointer-events-none"
        style={{
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,107,255,0.12) 0%, transparent 70%)',
          filter: 'blur(32px)',
        }}
      />

      {/* Particles */}
      {!reducedMotion && <MobileParticles scrollY={particleY} />}

      {/* ── 3D scroll wrapper ─────────────────────────────────────────── */}
      <motion.div
        style={{
          perspective: 1000,
          transformStyle: 'preserve-3d' as const,
          rotateX, translateZ, translateY, scale, opacity,
          transformOrigin: 'center top',
          willChange: 'transform, opacity',
        }}
        className="relative z-10 flex flex-col items-center px-4 text-center"
      >
        {/* ── Pill ──────────────────────────────────────────────────── */}
        <motion.div custom={0} variants={enterVariants} initial="hidden" animate="visible"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 mb-6">
          <span className="w-2 h-2 rounded-full bg-lime animate-pulse flex-shrink-0" />
          <span className="text-xs text-gold font-semibold tracking-wide">Live on BNB Smart Chain</span>
        </motion.div>

        {/* ── Headline (shallower 3D layer) ─────────────────────────── */}
        <motion.div style={{ translateZ: hlSpring, willChange: 'transform' }}>
          <motion.h1 custom={1} variants={enterVariants} initial="hidden" animate="visible"
            className="font-display font-extrabold leading-[1.1] mb-4"
            style={{
              fontSize: 'clamp(2.4rem, 10vw, 3rem)',
              letterSpacing: '-0.02em',
            }}>
            <span className="block text-cream" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.7)' }}>
              Built for the
            </span>
            <span className="block" style={{
              background: 'linear-gradient(135deg, #FFC53D, #F28C28)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 12px rgba(255,197,61,0.45))',
            }}>
              Community
            </span>
          </motion.h1>
        </motion.div>

        {/* ── Subtext ───────────────────────────────────────────────── */}
        <motion.p custom={2} variants={enterVariants} initial="hidden" animate="visible"
          className="mb-7 text-cream/70"
          style={{ fontSize: 16, lineHeight: 1.6, maxWidth: '34ch' }}>
          {PROJECT.shortDescription}
        </motion.p>

        {/* ── Buttons ───────────────────────────────────────────────── */}
        <motion.div custom={3} variants={enterVariants} initial="hidden" animate="visible"
          className="w-full max-w-sm flex flex-col gap-3 mb-7">
          {/* Buy — full width */}
          <a href={TOKEN.pancakeSwapUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full rounded-full font-display font-bold text-sm text-[#0B0B14]"
            style={{
              height: 52,
              background: 'linear-gradient(135deg, #FFC53D, #F28C28)',
              boxShadow: '0 4px 24px rgba(255,197,61,0.35)',
            }}>
            <ShoppingCart className="w-4 h-4" />
            Buy {PROJECT.ticker}
          </a>

          {/* Live Chart + Telegram — 2-col grid */}
          <div className="grid grid-cols-2 gap-3">
            <a href={TOKEN.dexScreenerUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-full font-display font-bold text-xs text-gold border border-gold/40 hover:bg-gold/10 transition-colors"
              style={{ height: 48 }}>
              <BarChart2 className="w-3.5 h-3.5" /> Live Chart
            </a>
            <a href={SOCIALS.telegram ?? '#'} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-full font-display font-bold text-xs text-gold border border-gold/40 hover:bg-gold/10 transition-colors"
              style={{ height: 48 }}>
              <Send className="w-3.5 h-3.5" /> Telegram
            </a>
          </div>

          {/* Follow on X — full width */}
          <a href={SOCIALS.twitter ?? '#'} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full rounded-full font-display font-bold text-xs text-gold border border-gold/40 hover:bg-gold/10 transition-colors"
            style={{ height: 48 }}>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            Follow on X
          </a>
        </motion.div>

        {/* ── Live stats 2×2 glass grid ─────────────────────────────── */}
        <motion.div custom={4} variants={enterVariants} initial="hidden" animate="visible"
          className="w-full max-w-sm grid grid-cols-2 gap-2.5 mb-6">
          {stats.map((s, i) => (
            <StatCard key={s.label} label={s.label} value={s.value} loading={loading}
              positive={s.positive} delay={0.5 + i * 0.04} />
          ))}
        </motion.div>

        {/* ── Trust chips ───────────────────────────────────────────── */}
        <motion.div custom={5} variants={enterVariants} initial="hidden" animate="visible"
          className="flex flex-wrap justify-center gap-2 mb-6">
          {[
            'Ownership renounced',
            '0 / 0 tax',
            'No mint function',
          ].map(label => (
            <span key={label}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: 'rgba(139,212,80,0.08)',
                border: '1px solid rgba(139,212,80,0.3)',
                color: '#8BD450',
              }}>
              <CheckCircle className="w-3 h-3 flex-shrink-0" />
              {label}
            </span>
          ))}
        </motion.div>

        {/* ── Contract card ─────────────────────────────────────────── */}
        <motion.div custom={6} variants={enterVariants} initial="hidden" animate="visible"
          className="w-full max-w-sm rounded-2xl p-4 mb-2"
          style={{
            background: 'rgba(20,20,31,0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,197,61,0.2)',
          }}>
          <p className="text-[10px] uppercase tracking-widest text-cream/40 mb-2">Contract</p>
          <button
            onClick={copyContract}
            className="flex items-center justify-between w-full gap-2 mb-3"
            title="Copy contract address"
          >
            <span ref={copyRef} className="font-mono text-xs text-cream/70 truncate">
              {TOKEN.contractAddress.slice(0, 6)}…{TOKEN.contractAddress.slice(-4)}
            </span>
            <span className="flex items-center gap-1 text-xs text-gold font-semibold flex-shrink-0">
              <Copy className="w-3 h-3" /> Copy
            </span>
          </button>
          <a href={TOKEN.bscScanUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 text-xs text-gold hover:text-orange transition-colors">
            <ExternalLink className="w-3 h-3" /> Verify on BscScan
          </a>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20"
        aria-hidden="true"
      >
        <span className="text-[10px] text-cream/30 uppercase tracking-widest">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
          <ChevronDown className="w-5 h-5 text-cream/30" />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   DESKTOP HERO  (≥ 768px) — unchanged
══════════════════════════════════════════════════════════════════════════ */
function DesktopHero() {
  const contractRef = useRef<HTMLSpanElement>(null)
  const copyContract = () => {
    navigator.clipboard.writeText(TOKEN.contractAddress)
    toast.success('Contract address copied!', { icon: '📋' })
  }

  return (
    <section id="hero" className="hero-section relative overflow-hidden">
      <div aria-hidden="true" className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none opacity-[0.07]"
        style={{ background: 'radial-gradient(circle, #FFC53D 0%, transparent 70%)' }} />
      <div aria-hidden="true" className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full pointer-events-none blur-3xl opacity-[0.06]"
        style={{ background: '#3B6BFF' }} />

      <DesktopParticles />

      <div className="relative z-10 w-full">
        {/* Mascot column */}
        <div className="hero-mascot-outer">
          <motion.div initial={{ opacity: 0, scale: 0.82 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="hero-mascot-wrap relative flex items-end justify-center">
            <motion.div aria-hidden="true"
              animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.75, 0.45] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 70% 60% at 55% 55%, rgba(255,197,61,0.38) 0%, rgba(242,140,40,0.16) 50%, transparent 75%)',
                filter: 'blur(28px)',
              }} />
            <motion.img src={ASSETS.mascot}
              alt="MOKKI DAO mascot — cheerful orange bull holding a cocktail"
              loading="eager" fetchPriority="high" className="hero-mascot relative"
              animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ filter: 'drop-shadow(0 0 2px rgba(255,197,61,0.7)) drop-shadow(0 20px 40px rgba(242,140,40,0.45)) saturate(1.1) contrast(1.05)' }} />
            {/* Floating badges */}
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

        {/* Text column */}
        <div className="hero-content-outer">
          <div className="hero-scrim" aria-hidden="true" />
          <div className="hero-content-inner relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 mb-5">
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              <span className="text-sm text-gold font-semibold">Live on BNB Smart Chain</span>
            </motion.div>
            <h1 className="hero-headline font-display font-extrabold leading-tight mb-4">
              <span className="block">
                {['Built', 'for', 'the'].map((word, i) => (
                  <motion.span key={word + i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }} className="inline-block mr-2 text-cream hero-headline-text-shadow">
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
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
              className="hero-desc text-cream/80 max-w-xl mb-7 leading-relaxed mx-auto lg:mx-0">
              {PROJECT.shortDescription}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
              className="hero-buttons mb-6">
              <a href={TOKEN.pancakeSwapUrl} target="_blank" rel="noopener noreferrer" className="btn-gold hero-btn-primary justify-center">
                <ShoppingCart className="w-4 h-4 flex-shrink-0" /> Buy {PROJECT.ticker}
              </a>
              <div className="hero-btn-row">
                <a href={TOKEN.dexScreenerUrl} target="_blank" rel="noopener noreferrer" className="btn-outline flex-1 justify-center">
                  <BarChart2 className="w-4 h-4" /> Live Chart
                </a>
                <a href={SOCIALS.telegram ?? '#'} target="_blank" rel="noopener noreferrer" className="btn-outline flex-1 justify-center">
                  <Send className="w-4 h-4" /> Telegram
                </a>
              </div>
              <a href={SOCIALS.twitter ?? '#'} target="_blank" rel="noopener noreferrer" className="btn-outline hero-btn-primary justify-center">
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Follow on X
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}
              className="hero-chips">
              <span className="hero-chip"><span className="hero-chip-label">Tax</span><span className="text-lime font-bold">0 / 0</span></span>
              <span className="hero-chip"><span className="hero-chip-label">Ownership</span><span className="text-gold font-bold">Renounced ✓</span></span>
              <span className="hero-chip"><span className="hero-chip-label">Supply</span><span className="text-gold font-bold tabular-nums">1,000,000,000</span></span>
            </motion.div>
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

/* ══════════════════════════════════════════════════════════════════════════
   ROOT EXPORT — renders the right hero based on screen width
══════════════════════════════════════════════════════════════════════════ */
export default function Hero() {
  const isMobile = useMediaQuery('(max-width: 767px)')
  return isMobile ? <MobileHero /> : <DesktopHero />
}
