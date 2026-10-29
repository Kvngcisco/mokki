import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion'
import {
  Copy,
  ExternalLink,
  ShoppingCart,
  BarChart2,
  Send,
  ChevronDown,
  CheckCircle,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { PROJECT, TOKEN, SOCIALS } from '../config'
import { ASSETS } from '../assets'
import { useMarketData } from '../hooks/useMarketData'
import { useMediaQuery, useReducedMotion } from '../hooks/useMediaQuery'
import { useTheme } from '../hooks/useTheme'

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
  return (
    <span
      className={`inline-block h-5 rounded ${w}`}
      style={{
        background:
          'linear-gradient(90deg, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
      }}
    />
  )
}

/* ─── Stat card ───────────────────────────────────────────────────────────── */
interface StatCardProps {
  label: string
  value: string | null
  loading: boolean
  positive?: boolean | null
  delay: number
  scrollRotate?: any
}

function StatCard({ label, value, loading, positive, delay, scrollRotate, isLight, noPair }: StatCardProps & { isLight: boolean; noPair: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: 20 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{
        rotateX: scrollRotate,
        willChange: 'transform',
      }}
      className="mobile-stat-card"
    >
        <p className="text-[10px] uppercase tracking-wider mb-1 hero-stat-label">
        {label}
      </p>
      {loading ? (
        <Skel />
      ) : (
        <p
          className="text-base font-bold font-display tabular-nums"
          style={{ color: positive === true ? '#8BD450' : positive === false ? '#F4607A' : isLight ? '#26180c' : 'var(--cream, #FFF6E5)' }}
        >
          {value ?? <span style={{ color: isLight ? '#5c4938' : 'var(--cream, #FFF6E5)', opacity: 0.8, fontSize: '0.75rem' }}>{noPair ? 'chart not live yet' : '—'}</span>}
        </p>
      )}
    </motion.div>
  )
}

/* ─── Mobile particles ────────────────────────────────────────────────────── */
type ParticleDatum = {
  id: number
  size: number
  x: number
  delay: number
  dur: number
  color: string
  opacity: number
  emoji: string
}

const PARTICLE_DATA: ParticleDatum[] = [
  { id: 0, size: 8,  x: 8,  delay: 0,   dur: 8,   color: '#FFC53D', opacity: 0.55, emoji: '✦' },
  { id: 1, size: 5,  x: 21, delay: 1.2, dur: 9.5, color: '#F28C28', opacity: 0.4,  emoji: '✦' },
  { id: 2, size: 12, x: 78, delay: 0.6, dur: 10,  color: '#FFC53D', opacity: 0.5,  emoji: '✦' },
  { id: 3, size: 6,  x: 88, delay: 2.1, dur: 8.5, color: '#F28C28', opacity: 0.45, emoji: '✦' },
  { id: 4, size: 9,  x: 55, delay: 1.7, dur: 11,  color: '#FFC53D', opacity: 0.35, emoji: '✦' },
  { id: 5, size: 5,  x: 38, delay: 0.3, dur: 7.5, color: '#F28C28', opacity: 0.5,  emoji: '✦' },
  { id: 6, size: 7,  x: 66, delay: 2.8, dur: 9,   color: '#FFC53D', opacity: 0.4,  emoji: '✦' },
  { id: 7, size: 4,  x: 93, delay: 1.0, dur: 12,  color: '#F28C28', opacity: 0.55, emoji: '✦' },
]

function MobileParticles({ scrollFraction }: { scrollFraction: any }) {
  // scrollFraction is a MotionValue 0→1; particles move at 0.6x speed
  const y = useTransform(scrollFraction, [0, 1], ['0%', '-60%'])
  const ySpring = useSpring(y, { stiffness: 90, damping: 20 })

  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ y: ySpring, willChange: 'transform' }}
    >
      {PARTICLE_DATA.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            bottom: `${10 + p.id * 7}%`,
            background: `radial-gradient(circle, ${p.color} 0%, ${p.color}66 100%)`,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}55`,
          }}
          animate={{
            y: [0, -32, 0],
            opacity: [p.opacity * 0.55, p.opacity, p.opacity * 0.55],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </motion.div>
  )
}

/* ─── Desktop particles (unchanged) ─────────────────────────────────────── */
const DESKTOP_PARTICLE_DATA = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: 4 + ((i * 7 + 3) % 9),
  x: (i * 17 + 5) % 100,
  delay: (i * 1.3) % 7,
  dur: 6 + (i % 9),
  color: i % 3 === 0 ? '#FFC53D' : i % 3 === 1 ? '#F28C28' : '#3B6BFF',
  opacity: 0.35 + (i % 4) * 0.1,
}))

function DesktopParticles() {
  return (
    <div className="motion-safe-particles absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {DESKTOP_PARTICLE_DATA.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            bottom: '-8%',
            background: p.color,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -(380 + p.dur * 30)],
            x: [0, (p.id % 2 === 0 ? 1 : -1) * 60],
            opacity: [0, p.opacity, 0],
            scale: [0, 1, 0.4],
          }}
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
  const introVideoRef = useRef<HTMLVideoElement>(null)
  const [introVideoReady, setIntroVideoReady] = useState(true)
  const { data, loading, noPair } = useMarketData()
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const sectionRef = useRef<HTMLElement>(null)

  /* ── Scroll-linked 3D ──────────────────────────────────────────────── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const springCfg = { stiffness: 90, damping: 20 }

  // Main content block
  const rawRotateX    = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [0, 14])
  const rawTranslateZ = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [0, -120])
  const rawTranslateY = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [0, -40])
  const rawScale      = useTransform(scrollYProgress, [0, 1], reducedMotion ? [1, 1] : [1, 0.92])
  const rawOpacity    = useTransform(scrollYProgress, [0, 1], reducedMotion ? [1, 1] : [1, 0.3])

  const rotateX    = useSpring(rawRotateX,    springCfg)
  const translateZ = useSpring(rawTranslateZ, springCfg)
  const translateY = useSpring(rawTranslateY, springCfg)
  const scale      = useSpring(rawScale,      springCfg)
  const opacity    = useSpring(rawOpacity,    springCfg)

  // Headline — shallower depth layer
  const rawHlZ  = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [0, -60])
  const hlZ     = useSpring(rawHlZ, springCfg)

  // Glow — parallax at 0.4x
  const rawGlowY = useTransform(scrollYProgress, [0, 1], ['0%', reducedMotion ? '0%' : '-40%'])
  const glowY    = useSpring(rawGlowY, springCfg)

  // Stat card staggered rotateX (per card, small delay baked into initial animation)
  const rawCardRX = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [0, 10])
  const cardRX    = useSpring(rawCardRX, springCfg)

  useEffect(() => {
    const video = introVideoRef.current
    if (!video) return
    const onVideoError = () => setIntroVideoReady(false)
    video.addEventListener('error', onVideoError)
    video.play().catch(() => {
      // The poster remains visible if browser autoplay policy blocks playback.
    })
    return () => video.removeEventListener('error', onVideoError)
  }, [])

  const copyContract = () => {
    navigator.clipboard.writeText(TOKEN.contractAddress)
    toast.success('Contract copied!', { icon: '📋' })
  }

  /* ── Staggered entrance variants ──────────────────────────────────── */
  const enter = {
    hidden: { opacity: 0, y: 28, rotateX: reducedMotion ? 0 : 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  }

  const stats = [
    {
      label: 'Price',
      value: fmtPrice(data.price),
      positive: null as boolean | null,
    },
    {
      label: '24h',
      value:
        data.priceChange24h !== null
          ? `${data.priceChange24h >= 0 ? '+' : ''}${data.priceChange24h.toFixed(2)}%`
          : null,
      positive: data.priceChange24h !== null ? data.priceChange24h >= 0 : null,
    },
    {
      label: 'Market Cap',
      value: fmtNum(data.marketCap),
      positive: null,
    },
    {
      label: 'Liquidity',
      value: fmtNum(data.liquidity),
      positive: null,
    },
  ]

  const shortAddr = `${TOKEN.contractAddress.slice(0, 6)}…${TOKEN.contractAddress.slice(-4)}`

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative overflow-x-hidden"
      style={{
        minHeight: 'calc(100svh - var(--ticker-h, 32px) - var(--nav-h, 56px))',
        paddingTop: 'calc(var(--ticker-h, 32px) + var(--nav-h, 56px) + env(safe-area-inset-top, 0px) + 24px)',
        paddingBottom: '72px',
        background: isLight ? '#F5F0E8' : '#0B0B14',
      }}
    >
      {/* ── Dot / grid pattern ───────────────────────────────────────── */}
      {introVideoReady && (
        <div className="mobile-hero-video-frame" aria-hidden="true">
          <video
            ref={introVideoRef}
            className="mobile-hero-intro-video"
            src="/assets/mokki-intro.mp4"
            poster={ASSETS.mascot}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onError={() => setIntroVideoReady(false)}
          />
        </div>
      )}
      {!introVideoReady && (
        <img className="mobile-hero-video-fallback" src={ASSETS.mascot} alt="MOKKI DAO mascot" />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: isLight
            ? 'radial-gradient(circle, rgba(180,100,0,0.12) 1px, transparent 1px)'
            : 'radial-gradient(circle, rgba(255,197,61,0.08) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      {/* ── Gold glow — parallax ─────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          top: '4%',
          left: '50%',
          x: '-50%',
          width: 360,
          height: 360,
          borderRadius: '50%',
          background: isLight
            ? 'radial-gradient(circle, rgba(255,197,61,0.22) 0%, rgba(242,140,40,0.08) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255,197,61,0.20) 0%, rgba(242,140,40,0.08) 50%, transparent 70%)',
          filter: 'blur(48px)',
          y: glowY,
          willChange: 'transform',
        }}
      />

      {/* ── Blue glow ────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          bottom: '22%',
          right: '10%',
          width: 220,
          height: 220,
          borderRadius: '50%',
          background: isLight
            ? 'radial-gradient(circle, rgba(180,100,0,0.08) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(59,107,255,0.14) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* ── Particles ────────────────────────────────────────────────── */}
      {!reducedMotion && (
        <MobileParticles scrollFraction={scrollYProgress} />
      )}

      {/* ══ 3-D scroll wrapper ═══════════════════════════════════════════ */}
      <motion.div
        style={{
          perspective: 1000,
          transformStyle: 'preserve-3d' as const,
          rotateX,
          translateZ,
          translateY,
          scale,
          opacity,
          transformOrigin: 'center top',
          willChange: 'transform, opacity',
        }}
        className="relative z-10 flex flex-col items-center px-5 text-center"
      >
        {/* ── Live pill ────────────────────────────────────────────── */}
        <motion.div
          custom={0}
          variants={enter}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
          style={{
            background: isLight ? 'rgba(180,100,0,0.08)' : 'rgba(255,197,61,0.10)',
            border: isLight ? '1px solid rgba(180,100,0,0.28)' : '1px solid rgba(255,197,61,0.35)',
          }}
        >
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: '#8BD450', animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite' }}
          />
          <span className="text-xs font-semibold tracking-wide" style={{ color: isLight ? '#7A4800' : '#FFC53D' }}>
            Live on BNB Smart Chain
          </span>
        </motion.div>

        {/* ── Headline — shallower 3-D layer ───────────────────────── */}
        <motion.div
          style={{ translateZ: hlZ, willChange: 'transform' }}
        >
          <motion.h1
            custom={1}
            variants={enter}
            initial="hidden"
            animate="visible"
            className="font-display font-extrabold mb-4"
            style={{
              fontSize: 'clamp(2.4rem, 10vw, 3rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            <span
              className="block hero-kicker"
              style={{
                color: isLight ? '#1A1008' : '#FFF6E5',
                textShadow: isLight
                  ? '0 1px 4px rgba(255,255,255,0.6)'
                  : '0 2px 20px rgba(0,0,0,0.6)',
              }}
            >
              Built for the
            </span>
            <span
              className={`block mobile-hero-community hero-headline-meme ${isLight ? 'gradient-text-light' : 'gradient-text-dark'}`}
            >
              Community
            </span>
          </motion.h1>
        </motion.div>

        {/* ── Subtext ──────────────────────────────────────────────── */}
        <motion.p
          custom={2}
          variants={enter}
          initial="hidden"
          animate="visible"
          className="mb-7"
          style={{
            fontSize: 16,
            lineHeight: 1.6,
            maxWidth: '34ch',
            color: isLight ? 'rgba(26,16,8,0.68)' : 'rgba(255,246,229,0.72)',
          }}
        >
          {PROJECT.shortDescription}
        </motion.p>

        {/* ── Buttons ──────────────────────────────────────────────── */}
        <motion.div
          custom={3}
          variants={enter}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col mb-7"
          style={{ maxWidth: 360, gap: 12 }}
        >
          {/* Buy $MOKKI — full width */}
          <a
            href={TOKEN.pancakeSwapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full rounded-full font-display font-bold text-sm"
            style={{
              height: 52,
              background: 'linear-gradient(135deg, #FFC53D 0%, #F28C28 100%)',
              color: '#1A0800',
              boxShadow: isLight
                ? '0 4px 20px rgba(180,100,0,0.28)'
                : '0 4px 28px rgba(255,197,61,0.4)',
              textDecoration: 'none',
            }}
          >
            <ShoppingCart className="w-4 h-4 flex-shrink-0" />
            Buy {PROJECT.ticker}
          </a>

          {/* Live Chart + Telegram — 2-col */}
          <div className="grid grid-cols-2" style={{ gap: 12 }}>
            <a
              href={TOKEN.dexScreenerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-full font-display font-bold text-xs transition-colors"
              style={{
                height: 48,
                color: isLight ? '#7A4800' : '#FFC53D',
                border: isLight
                  ? '1px solid rgba(180,100,0,0.40)'
                  : '1px solid rgba(255,197,61,0.40)',
                textDecoration: 'none',
                background: isLight ? 'rgba(255,255,255,0.70)' : 'transparent',
              }}
            >
              <BarChart2 className="w-3.5 h-3.5 flex-shrink-0" />
              Live Chart
            </a>
            <a
              href={SOCIALS.telegram ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-full font-display font-bold text-xs transition-colors"
              style={{
                height: 48,
                color: isLight ? '#7A4800' : '#FFC53D',
                border: isLight
                  ? '1px solid rgba(180,100,0,0.40)'
                  : '1px solid rgba(255,197,61,0.40)',
                textDecoration: 'none',
                background: isLight ? 'rgba(255,255,255,0.70)' : 'transparent',
              }}
            >
              <Send className="w-3.5 h-3.5 flex-shrink-0" />
              Telegram
            </a>
          </div>

          {/* Follow on X — full width */}
          <a
            href={SOCIALS.twitter ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full rounded-full font-display font-bold text-xs transition-colors"
            style={{
              height: 48,
              color: isLight ? '#7A4800' : '#FFC53D',
              border: isLight
                ? '1px solid rgba(180,100,0,0.40)'
                : '1px solid rgba(255,197,61,0.40)',
              textDecoration: 'none',
              background: isLight ? 'rgba(255,255,255,0.70)' : 'transparent',
            }}
          >
            <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Follow on X
          </a>
        </motion.div>

        {/* ── Live stats 2×2 glass grid ─────────────────────────────── */}
        <motion.div
          custom={4}
          variants={enter}
          initial="hidden"
          animate="visible"
          className="w-full grid grid-cols-2 mb-6"
          style={{ maxWidth: 360, gap: 10 }}
        >
          {stats.map((s, i) => (
            <StatCard
              key={s.label}
              label={s.label}
              value={s.value}
              loading={loading}
              positive={s.positive}
              delay={0.5 + i * 0.04}
              scrollRotate={cardRX}
              isLight={isLight}
              noPair={noPair}
            />
          ))}
        </motion.div>

        {/* ── Trust chips ───────────────────────────────────────────── */}
        <motion.div
          custom={5}
          variants={enter}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center mb-6"
          style={{ gap: 8 }}
        >
          {['Ownership renounced', '0 / 0 tax', 'No mint function'].map(label => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full text-xs font-semibold"
              style={{
                padding: '6px 12px',
                background: isLight ? 'rgba(30,120,0,0.07)' : 'rgba(139,212,80,0.08)',
                border: isLight ? '1px solid rgba(30,120,0,0.28)' : '1px solid rgba(139,212,80,0.3)',
                color: isLight ? '#1E6400' : '#8BD450',
              }}
            >
              <CheckCircle className="w-3 h-3 flex-shrink-0" />
              {label}
            </span>
          ))}
        </motion.div>

        {/* ── Contract card ─────────────────────────────────────────── */}
        <motion.div
          custom={6}
          variants={enter}
          initial="hidden"
          animate="visible"
          className="w-full rounded-2xl p-4"
          style={{
            maxWidth: 360,
            background: isLight ? 'rgba(255,255,255,0.92)' : 'rgba(16,16,26,0.88)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: isLight
              ? '1px solid rgba(196,120,10,0.25)'
              : '1px solid rgba(255,197,61,0.22)',
            boxShadow: isLight ? '0 2px 20px rgba(160,90,0,0.08)' : 'none',
          }}
        >
          <p
            className="uppercase tracking-widest mb-2"
            style={{ fontSize: 10, color: isLight ? 'rgba(26,16,8,0.42)' : 'rgba(255,246,229,0.38)' }}
          >
            Contract
          </p>
          <button
            onClick={copyContract}
            className="flex items-center justify-between w-full gap-2 mb-3 group"
            title="Copy contract address"
            aria-label="Copy contract address"
          >
            <span
              className="font-mono truncate"
              style={{ fontSize: 13, color: isLight ? '#3A2008' : 'rgba(255,246,229,0.72)' }}
            >
              {shortAddr}
            </span>
            <span
              className="flex items-center gap-1 flex-shrink-0 font-semibold group-hover:opacity-80 transition-opacity"
              style={{ fontSize: 12, color: isLight ? '#7A4800' : '#FFC53D' }}
            >
              <Copy className="w-3.5 h-3.5" />
              Copy
            </span>
          </button>
          <a
            href={TOKEN.bscScanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 transition-colors hover:opacity-80"
            style={{ fontSize: 12, color: isLight ? '#7A4800' : '#FFC53D', textDecoration: 'none' }}
          >
            <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
            Verify on BscScan
          </a>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
        style={{ gap: 4 }}
        aria-hidden="true"
      >
        <span
          className="uppercase tracking-widest"
          style={{ fontSize: 10, color: isLight ? 'rgba(26,16,8,0.35)' : 'rgba(255,246,229,0.3)' }}
        >
          Scroll
        </span>
        <motion.div
          animate={reducedMotion ? {} : { y: [0, 7, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown
            className="w-5 h-5"
            style={{ color: isLight ? 'rgba(26,16,8,0.30)' : 'rgba(255,246,229,0.3)' }}
          />
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
  const [introVideoReady, setIntroVideoReady] = useState(true)
  const reducedMotion = useReducedMotion()
  const introVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = introVideoRef.current
    if (!video) return
    const onVideoError = () => setIntroVideoReady(false)
    video.addEventListener('error', onVideoError)
    video.play().catch(() => {
      // Keep the poster visible if autoplay is restricted by the browser.
    })
    return () => video.removeEventListener('error', onVideoError)
  }, [])
  const copyContract = () => {
    navigator.clipboard.writeText(TOKEN.contractAddress)
    toast.success('Contract address copied!', { icon: '📋' })
  }

  return (
    <section id="hero" className="hero-section relative overflow-hidden" style={{ background: 'radial-gradient(ellipse at 72% 43%, rgba(242,140,40,0.16) 0%, transparent 35%), radial-gradient(ellipse at 18% 74%, rgba(139,212,80,0.09) 0%, transparent 40%)' }}>
      <>
        <span aria-hidden="true" className="hero-side-note">NO SUIT. ALL MOKKI.</span>
        <span aria-hidden="true" className="hero-side-stamp">SINCE THE COMMUNITY SAID SO</span>
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

      <DesktopParticles />

      <div className="relative z-10 w-full">
        {/* Mascot column */}
        <div className={`hero-mascot-outer ${introVideoReady ? 'has-intro-video' : ''}`}>
          {introVideoReady && (
            <motion.div
              className="hero-video-frame"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <video
                ref={introVideoRef}
                className="hero-intro-video"
                src="/assets/mokki-intro.mp4"
                poster={ASSETS.mascot}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label="MOKKI DAO intro"
                onError={() => setIntroVideoReady(false)}
              />
              <span className="hero-video-stamp" aria-hidden="true">MOKKI CAM · 001</span>
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="hero-mascot-wrap relative flex items-end justify-center"
          >
            <motion.div
              aria-hidden="true"
              animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.75, 0.45] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 70% 60% at 55% 55%, rgba(255,197,61,0.38) 0%, rgba(242,140,40,0.16) 50%, transparent 75%)',
                filter: 'blur(28px)',
              }}
            />
        <motion.img
          src={ASSETS.mascot}
          alt="MOKKI DAO mascot, cheerful orange bull holding a cocktail"
          loading="eager"
          fetchPriority="high"
          className="hero-mascot relative hero-mascot-float"
          style={{ filter: 'drop-shadow(0 0 2px rgba(255,197,61,0.7)) drop-shadow(0 20px 40px rgba(242,140,40,0.45)) saturate(1.1) contrast(1.05)' }}
        />
            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6 }}
              className="hero-badge badge-card absolute left-0 bottom-1/3 glass-card px-3 py-2 text-xs whitespace-nowrap"
            >
              <div className="text-cream/50">Tax</div>
              <div className="font-bold text-lime text-sm">0 / 0</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8 }}
              className="hero-badge badge-card absolute right-0 top-1/4 glass-card px-3 py-2 text-xs whitespace-nowrap"
            >
              <div className="text-cream/50">Ownership</div>
              <div className="font-bold text-gold text-sm">Renounced ✓</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0 }}
              className="hero-badge badge-card absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 glass-card px-3 py-2 text-xs whitespace-nowrap"
            >
              <div className="text-cream/50">Supply</div>
              <div className="font-bold text-gold tabular-nums text-sm">1,000,000,000</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Text column */}
        <div className="hero-content-outer">
          <div className="hero-scrim" aria-hidden="true" />
          <div className="hero-content-inner relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 mb-5"
            >
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              <span className="text-sm text-gold font-semibold">Live on BNB Smart Chain</span>
            </motion.div>
            <h1 className="hero-headline font-display font-extrabold leading-tight mb-4">
              <span className="block">
                {['Built', 'for', 'the'].map((word, i) => (
                  <motion.span
                    key={word + i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="inline-block mr-2 text-cream hero-headline-text-shadow"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="block hero-headline-meme gradient-text-dark"
              >
                Community
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="hero-desc text-cream/80 max-w-xl mb-7 leading-relaxed mx-auto lg:mx-0"
            >
              {PROJECT.shortDescription}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="hero-buttons mb-6"
            >
              <a
                href={TOKEN.pancakeSwapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold hero-btn-primary justify-center"
              >
                <ShoppingCart className="w-4 h-4 flex-shrink-0" /> Buy {PROJECT.ticker}
              </a>
              <div className="hero-btn-row">
                <a
                  href={TOKEN.dexScreenerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline flex-1 justify-center"
                >
                  <BarChart2 className="w-4 h-4" /> Live Chart
                </a>
                <a
                  href={SOCIALS.telegram ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline flex-1 justify-center"
                >
                  <Send className="w-4 h-4" /> Telegram
                </a>
              </div>
              <a
                href={SOCIALS.twitter ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline hero-btn-primary justify-center"
              >
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Follow on X
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="hero-chips"
            >
              <span className="hero-chip">
                <span className="hero-chip-label">Tax</span>
                <span className="text-lime font-bold">0 / 0</span>
              </span>
              <span className="hero-chip">
                <span className="hero-chip-label">Ownership</span>
                <span className="text-gold font-bold">Renounced ✓</span>
              </span>
              <span className="hero-chip">
                <span className="hero-chip-label">Supply</span>
                <span className="text-gold font-bold tabular-nums">1,000,000,000</span>
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="flex flex-col sm:flex-row items-center gap-2 mt-5"
            >
              <span className="text-xs text-cream/40 uppercase tracking-wider whitespace-nowrap">
                Contract:
              </span>
              <a
                href={TOKEN.bscScanUrl}
                className="contract-bar flex-1 max-w-sm w-full"
                title="View on BscScan"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="truncate text-xs">{TOKEN.contractAddress}</span>
                <ExternalLink className="w-3.5 h-3.5 text-gold flex-shrink-0" />
              </a>
              <button
                type="button"
                onClick={copyContract}
                className="contract-bar min-h-11 justify-center"
                title="Copy contract address"
                aria-label="Copy contract address"
              >
                <Copy className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span className="text-xs">Copy CA</span>
              </button>
              <a
                href={TOKEN.bscScanUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-gold hover:text-orange transition-colors whitespace-nowrap"
              >
                Verify on BscScan <ExternalLink className="w-3 h-3" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
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
      </>
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
