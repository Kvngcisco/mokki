import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Copy, ExternalLink, ShoppingCart, BarChart2, Send } from 'lucide-react'
import toast from 'react-hot-toast'
import { PROJECT, TOKEN, SOCIALS } from '../config'

const WORDS = PROJECT.tagline.split(' ')

function Particles() {
  const count = 18
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => {
        const size = 4 + Math.random() * 8
        const x = Math.random() * 100
        const delay = Math.random() * 6
        const dur = 6 + Math.random() * 8
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${x}%`,
              bottom: '-10%',
              background: i % 3 === 0 ? '#FFC53D' : i % 3 === 1 ? '#F28C28' : '#3B6BFF',
              opacity: 0.4 + Math.random() * 0.4,
            }}
            animate={{
              y: [0, -(400 + Math.random() * 400)],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0, 0.7, 0],
              scale: [0, 1, 0.5],
            }}
            transition={{
              duration: dur,
              delay,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        )
      })}
    </div>
  )
}

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
      {/* Background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FFC53D 0%, transparent 70%)' }} />
      <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full opacity-8 blur-3xl pointer-events-none"
        style={{ background: '#3B6BFF' }} />

      <Particles />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* Left: Text content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              <span className="text-sm text-gold font-semibold">Live on BNB Smart Chain</span>
            </motion.div>

            {/* Heading word-by-word */}
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

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="flex flex-wrap items-center gap-3 justify-center lg:justify-start mb-8"
            >
              <a
                href={TOKEN.pancakeSwapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                <ShoppingCart className="w-4 h-4" />
                Buy {PROJECT.ticker}
              </a>
              <a
                href={TOKEN.dexScreenerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <BarChart2 className="w-4 h-4" />
                Live Chart
              </a>
              <a
                href={SOCIALS.telegram ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <Send className="w-4 h-4" />
                Telegram
              </a>
              <a
                href={SOCIALS.twitter ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
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
              <button
                onClick={copyContract}
                className="contract-bar flex-1 max-w-sm"
                title="Click to copy contract address"
              >
                <span ref={contractRef} className="truncate text-xs">
                  {TOKEN.contractAddress}
                </span>
                <Copy className="w-3.5 h-3.5 text-gold flex-shrink-0" />
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

          {/* Right: Mascot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
            className="relative flex-shrink-0"
          >
            {/* Glow ring behind mascot */}
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, #FFC53D55, #F28C2833, transparent)' }}
            />
            {/* Mascot image — floating */}
            <motion.img
              src="/assets/mokki-logo.png"
              alt="MOKKI DAO mascot"
              className="relative w-64 sm:w-80 lg:w-[360px] drop-shadow-2xl"
              animate={{ y: [0, -18, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ filter: 'drop-shadow(0 20px 40px rgba(255, 197, 61, 0.3))' }}
            />

            {/* Floating stat chips */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 }}
              className="absolute -left-4 top-1/3 glass-card px-3 py-2 text-xs whitespace-nowrap"
            >
              <div className="text-cream/50">Tax</div>
              <div className="font-bold text-lime">0 / 0</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.7 }}
              className="absolute -right-4 top-1/4 glass-card px-3 py-2 text-xs whitespace-nowrap"
            >
              <div className="text-cream/50">Ownership</div>
              <div className="font-bold text-gold">Renounced ✓</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9 }}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 glass-card px-3 py-2 text-xs whitespace-nowrap"
            >
              <div className="text-cream/50">Supply</div>
              <div className="font-bold text-gold tabular-nums">1,000,000,000</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
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
