import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { PROJECT, TOKEN } from '../config'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Tokenomics', href: '#tokenomics' },
  { label: 'How to Buy', href: '#how-to-buy' },
  { label: 'Staking', href: '#staking' },
  { label: 'DAO', href: '#dao' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Community', href: '#community' },
]

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section tracking
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.replace('#', ''))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-40% 0px -40% 0px' }
    )
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleNav = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-dark-bg/90 dark:bg-dark-bg/90 backdrop-blur-xl border-b border-dark-border shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <a
              href="#hero"
              onClick={e => { e.preventDefault(); handleNav('#hero') }}
              className="flex items-center gap-2 group"
            >
              <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-gold/30 group-hover:ring-gold/70 transition-all duration-300">
                <img src="/assets/mokki-logo.png" alt="MOKKI DAO" className="w-full h-full object-contain bg-[#1a1025]" />
              </div>
              <span className="font-display font-bold text-lg text-gold group-hover:text-orange transition-colors">
                {PROJECT.name}
              </span>
            </a>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={e => { e.preventDefault(); handleNav(link.href) }}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                    ${active === link.href.replace('#', '')
                      ? 'text-gold bg-gold/10'
                      : 'text-cream/70 hover:text-cream hover:bg-white/5 dark:hover:bg-white/5'
                    }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggle}
                className="w-9 h-9 rounded-full flex items-center justify-center border border-dark-border hover:border-gold/50 bg-dark-card/50 hover:bg-gold/10 transition-all duration-200"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === 'dark'
                      ? <Sun className="w-4 h-4 text-gold" />
                      : <Moon className="w-4 h-4 text-orange" />
                    }
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              {/* Buy button */}
              <a
                href={TOKEN.pancakeSwapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex btn-gold text-xs px-4 py-2"
              >
                Buy {PROJECT.ticker}
              </a>

              {/* Mobile menu toggle */}
              <button
                className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center border border-dark-border bg-dark-card/50"
                onClick={() => setMobileOpen(o => !o)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-4 h-4 text-cream" /> : <Menu className="w-4 h-4 text-cream" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-40 bg-dark-bg/98 backdrop-blur-xl border-b border-dark-border lg:hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={e => { e.preventDefault(); handleNav(link.href) }}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                    ${active === link.href.replace('#', '')
                      ? 'text-gold bg-gold/10'
                      : 'text-cream/70 hover:text-cream hover:bg-white/5'
                    }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 border-t border-dark-border mt-2">
                <a
                  href={TOKEN.pancakeSwapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold w-full justify-center"
                >
                  Buy {PROJECT.ticker} on PancakeSwap
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
