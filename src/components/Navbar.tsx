import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { PROJECT, TOKEN } from '../config'
import { ASSETS } from '../assets'

const NAV_LINKS = [
  { label: 'About',      href: '#about'      },
  { label: 'Tokenomics', href: '#tokenomics' },
  { label: 'How to Buy', href: '#how-to-buy' },
  { label: 'Launchpad',  href: '#launchpad'  },
  { label: 'Staking',    href: '#staking'    },
  { label: 'DAO',        href: '#dao'        },
  { label: 'Roadmap',    href: '#roadmap'    },
  { label: 'Community',  href: '#community'  },
  { label: 'FAQ',        href: '#faq'        },
]

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const [scrolled,    setScrolled]    = useState(false)
  const [active,      setActive]      = useState('')
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const isLight = theme === 'light'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    // Publish --nav-h for the mobile hero padding calc
    document.documentElement.style.setProperty('--nav-h', '56px')
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.documentElement.style.removeProperty('--nav-h')
    }
  }, [])

  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.replace('#', ''))
    const observer = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }) },
      { rootMargin: '-40% 0px -40% 0px' },
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  const handleNav = (href: string) => {
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`site-navbar fixed top-[var(--ticker-h,32px)] left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? (isLight ? 'bg-[#F5F0E8]/95 backdrop-blur-xl border-b border-black/10 shadow-md shadow-black/5' : 'bg-dark-bg/90 backdrop-blur-xl border-b border-dark-border shadow-lg shadow-black/20') : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">

            {/* Logo — icon only, no box/background */}
            <a href="#hero" onClick={e => { e.preventDefault(); handleNav('#hero') }}
              className="flex items-center gap-2.5 group" aria-label="MOKKI DAO home">
              <img
                src={ASSETS.logoIcon}
                alt="MOKKI DAO logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain transition-all duration-300 group-hover:scale-110"
                style={{ filter: 'drop-shadow(0 2px 8px rgba(255,197,61,0.4))' }}
              />
              <span className="font-display font-bold text-lg text-gold group-hover:text-orange transition-colors">
                {PROJECT.name}
              </span>
            </a>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(link => (
                <a key={link.href} href={link.href}
                  onClick={e => { e.preventDefault(); handleNav(link.href) }}
                  aria-current={active === link.href.replace('#', '') ? 'location' : undefined}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                    ${active === link.href.replace('#', '')
                      ? (isLight ? 'text-[#7A4800] bg-black/5' : 'text-gold bg-gold/10')
                      : (isLight ? 'text-[#26180c]/70 hover:text-[#26180c] hover:bg-black/5' : 'text-cream/70 hover:text-cream hover:bg-white/5')}`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <motion.button whileTap={{ scale: 0.9 }} onClick={toggle}
                className={`w-11 h-11 md:w-9 md:h-9 rounded-full flex items-center justify-center border transition-all duration-200 ${isLight ? 'border-black/15 bg-black/5 hover:bg-black/10' : 'border-dark-border hover:border-gold/50 bg-dark-card/50 hover:bg-gold/10'}`}
                aria-label="Toggle theme">
                <AnimatePresence mode="wait">
                  <motion.div key={theme}
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    {theme === 'dark' ? <Sun className="w-4 h-4 text-gold" /> : <Moon className="w-4 h-4 text-orange" />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              <a href={TOKEN.pancakeSwapUrl} target="_blank" rel="noopener noreferrer"
                className="hidden sm:flex btn-gold text-xs px-4 py-2">
                Buy {PROJECT.ticker}
              </a>

              <button className={`lg:hidden w-11 h-11 rounded-full flex items-center justify-center border ${isLight ? 'border-black/15 bg-black/5' : 'border-dark-border bg-dark-card/50'}`}
                onClick={() => setMobileOpen(o => !o)} aria-label="Toggle menu" aria-expanded={mobileOpen}>
                {mobileOpen ? <X className={isLight ? "w-4 h-4 text-[#26180c]" : "w-4 h-4 text-cream"} /> : <Menu className={isLight ? "w-4 h-4 text-[#26180c]" : "w-4 h-4 text-cream"} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.25 }}
            className={`mobile-menu-drawer fixed left-0 right-0 z-40 lg:hidden ${isLight ? 'bg-[#F5F0E8] border-b border-black/10' : 'bg-dark-bg/98 backdrop-blur-xl border-b border-dark-border'}`}
            style={{ top: 'calc(var(--ticker-h, 32px) + var(--nav-h, 56px) + env(safe-area-inset-top))' }}>
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map(link => (
                <a key={link.href} href={link.href}
                  onClick={e => { e.preventDefault(); handleNav(link.href) }}
                  aria-current={active === link.href.replace('#', '') ? 'location' : undefined}
                  className={`px-4 py-3 min-h-11 rounded-xl text-sm font-medium transition-all duration-200
                    ${active === link.href.replace('#', '') ? 'text-gold bg-gold/10' : 'text-cream/70 hover:text-cream hover:bg-white/5'}`}>
                  {link.label}
                </a>
              ))}
              <div className="pt-2 border-t border-dark-border mt-2">
                <a href={TOKEN.pancakeSwapUrl} target="_blank" rel="noopener noreferrer" className="btn-gold w-full justify-center">
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
