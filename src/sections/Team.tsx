import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'
import { TRUST, PROJECT } from '../config'
import { ASSETS } from '../assets'

export default function Team() {
  return (
    <section id="team" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="tag mb-4 inline-flex">The Builders</span>
          <h2 className="section-title">Team</h2>
        </motion.div>

        {/* Transparency statement card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="gradient-border-card"
        >
          <div className="p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-20 h-20 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
              <Shield className="w-9 h-9 text-gold" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-cream mb-3">
                Anonymous & Decentralized
              </h3>
              <p className="text-cream/60 leading-relaxed text-sm max-w-xl">
                {TRUST.transparencyStatement}
              </p>
              <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
                {[
                  { label: 'Ownership Renounced', ok: true },
                  { label: '0/0 Tax', ok: true },
                  { label: 'No Mint Function', ok: true },
                ].map(item => (
                  <span key={item.label} className="tag text-xs">
                    ✓ {item.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mascot row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-10"
        >
          <div className="text-center">
            <motion.img
              src={ASSETS.mascot}
              alt={`${PROJECT.name} mascot`}
              loading="lazy"
              className="w-28 mx-auto mb-3 object-contain"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ filter: 'drop-shadow(0 8px 20px rgba(255,197,61,0.4))' }}
            />
            <p className="text-cream/40 text-sm">The community IS the team.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
