import { useTheme } from '../hooks/useTheme'
import { motion } from 'framer-motion'
import { Copy, ExternalLink, Send } from 'lucide-react'
import toast from 'react-hot-toast'
import { PROJECT, TOKEN, SOCIALS } from '../config'
import { ASSETS } from '../assets'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Tokenomics', href: '#tokenomics' },
  { label: 'How to Buy', href: '#how-to-buy' },
  { label: 'Staking', href: '#staking' },
  { label: 'DAO', href: '#dao' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Safety', href: '#safety' },
  { label: 'Community', href: '#community' },
  { label: 'FAQ', href: '#faq' },
]

export default function Footer() {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const copy = () => {
    navigator.clipboard.writeText(TOKEN.contractAddress)
    toast.success('Contract copied!', { icon: '📋' })
  }

  const year = new Date().getFullYear()

  return (
    <footer className={`border-t ${isLight ? "border-black/10 bg-[#EFE8DC]" : "border-dark-border bg-dark-card/30 backdrop-blur-sm"}`}>
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {/* Logo icon — no box, transparent PNG */}
              <img
                src={ASSETS.logoIcon}
                alt="MOKKI DAO"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
                style={{ filter: 'drop-shadow(0 2px 8px rgba(255,197,61,0.4))' }}
              />
              <div>
                <p className="font-display font-bold text-gold text-lg">{PROJECT.name}</p>
                <p className="text-xs text-cream/40">{PROJECT.ticker} · BSC Chain</p>
              </div>
            </div>
            <p className="text-sm text-cream/50 leading-relaxed max-w-xs">
              {PROJECT.tagline}
            </p>

            {/* Socials */}
            <div className="flex gap-3 mt-5">
              {SOCIALS.twitter && (
                <a
                  href={SOCIALS.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-dark-border flex items-center justify-center text-cream/50 hover:text-gold hover:border-gold/40 transition-all duration-200 hover:scale-110"
                  aria-label="Twitter / X"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              )}
              {SOCIALS.telegram && (
                <a
                  href={SOCIALS.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-dark-border flex items-center justify-center text-cream/50 hover:text-gold hover:border-gold/40 transition-all duration-200 hover:scale-110"
                  aria-label="Telegram"
                >
                  <Send className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <p className="font-display font-semibold text-sm text-cream/70 uppercase tracking-wider mb-4">Navigation</p>
            <div className="grid grid-cols-2 gap-y-2">
              {NAV_LINKS.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-cream/50 hover:text-gold transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Token info */}
          <div>
            <p className="font-display font-semibold text-sm text-cream/70 uppercase tracking-wider mb-4">Token Info</p>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-cream/40 text-xs mb-1">Contract Address</p>
                <button
                  onClick={copy}
                  className="flex items-center gap-2 bg-dark-bg/50 border border-dark-border rounded-lg px-2.5 py-2 w-full hover:border-gold/30 transition-colors text-left"
                >
                  <span className="font-mono text-xs text-cream/60 truncate">{TOKEN.contractAddress}</span>
                  <Copy className="w-3 h-3 text-gold flex-shrink-0" />
                </button>
              </div>
              <div className="flex gap-2 flex-wrap">
                <a href={TOKEN.bscScanUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-gold hover:text-orange transition-colors">
                  BscScan <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-cream/20">•</span>
                <a href={TOKEN.dexScreenerUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-gold hover:text-orange transition-colors">
                  DexScreener <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-cream/20">•</span>
                <a href={TOKEN.pancakeSwapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-gold hover:text-orange transition-colors">
                  PancakeSwap <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Risk disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-dark-border pt-8 mb-6"
        >
          <div className="p-4 rounded-xl bg-dark-bg/50 border border-dark-border text-xs text-cream/40 leading-relaxed">
            <strong className="text-cream/60">Risk Disclaimer:</strong> Cryptocurrency investments, including $MOKKI, are highly volatile and speculative. You can lose your entire investment. Nothing on this website constitutes financial, investment, legal, or tax advice. This is not an offer or solicitation to buy or sell securities. Always do your own research (DYOR) before investing. Past performance is not indicative of future results. Only invest what you can afford to lose.
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/30">
          <p>© {year} {PROJECT.name}. All rights reserved.</p>
          <p>Built on <span className="text-gold">BNB Smart Chain</span> · Powered by the community</p>
        </div>
      </div>
    </footer>
  )
}
