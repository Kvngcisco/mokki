import { motion } from 'framer-motion'
import { ExternalLink, Send } from 'lucide-react'
import { SOCIALS, PROJECT } from '../config'

const SOCIALS_LIST = [
  {
    name: 'Telegram',
    handle: '@mokkidaocoin',
    desc: 'Join the main community chat. Get alpha, updates, and connect with holders.',
    href: SOCIALS.telegram,
    color: '#229ED9',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
  },
  {
    name: 'X (Twitter)',
    handle: '@mokkicoin',
    desc: 'Follow for announcements, memes, partnerships, and real-time updates.',
    href: SOCIALS.twitter,
    color: '#1DA1F2',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
]

export default function Community() {
  return (
    <section id="community" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="tag mb-4 inline-flex">Join Us</span>
          <h2 className="section-title">Community</h2>
          <p className="text-cream/60 mt-3 max-w-xl mx-auto">
            The {PROJECT.name} community is the heart of everything. Come build with us.
          </p>
        </motion.div>

        {/* Mascot + CTA row */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="gradient-border-card mb-10"
        >
          <div className="p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <motion.img
              src="/assets/mokki-mascot.png"
              alt="MOKKI mascot"
              className="w-36 flex-shrink-0 mascot-blend"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ filter: 'drop-shadow(0 8px 20px rgba(255, 197, 61, 0.35))' }}
            />
            <div className="flex-1">
              <h3 className="font-display font-bold text-2xl text-cream mb-2">
                Be part of the MOKKI movement
              </h3>
              <p className="text-cream/60 mb-4 text-sm">
                Join thousands of holders, contribute ideas, vote on proposals, and shape the future of MOKKI DAO together.
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <a
                  href={SOCIALS.telegram ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                >
                  <Send className="w-4 h-4" />
                  Join Telegram
                </a>
                <a
                  href={SOCIALS.twitter ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  Follow on X
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Social cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SOCIALS_LIST.map((s, i) => (
            s.href && (
              <motion.a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="glass-card p-5 flex items-start gap-4 group no-underline"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${s.color}18`, border: `1px solid ${s.color}44`, color: s.color }}
                >
                  {s.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-base text-cream">{s.name}</h3>
                    <ExternalLink className="w-3.5 h-3.5 text-cream/30 group-hover:text-gold transition-colors" />
                  </div>
                  <p className="text-xs text-cream/40 mb-2" style={{ color: s.color }}>{s.handle}</p>
                  <p className="text-sm text-cream/60 leading-relaxed">{s.desc}</p>
                </div>
              </motion.a>
            )
          ))}
        </div>
      </div>
    </section>
  )
}
