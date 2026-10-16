import { motion } from 'framer-motion'
import { Vote, Users, Shield, Zap, ExternalLink } from 'lucide-react'
import { DAO as DAOConfig, PROJECT } from '../config'
import { ASSETS } from '../assets'

const FEATURES = [
  {
    icon: Vote,
    title: 'On-Chain Voting',
    desc: 'Every $MOKKI holder gets a vote proportional to their holdings. Propose and vote on key decisions.',
    color: '#FFC53D',
  },
  {
    icon: Users,
    title: 'Community Proposals',
    desc: 'Any holder can submit proposals for treasury spending, partnerships, new features, and more.',
    color: '#F28C28',
  },
  {
    icon: Shield,
    title: 'Transparent Treasury',
    desc: 'All treasury movements are on-chain and visible to every community member.',
    color: '#3B6BFF',
  },
  {
    icon: Zap,
    title: 'Rapid Execution',
    desc: 'Approved proposals are executed swiftly, keeping the ecosystem agile and community-led.',
    color: '#8BD450',
  },
]

export default function DAO() {
  return (
    <section id="dao" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="tag mb-4 inline-flex">Governance</span>
          <h2 className="section-title">DAO & Governance</h2>
          <p className="text-cream/60 mt-3 max-w-2xl mx-auto">
            {DAOConfig.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="glass-card p-6 group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{ background: `${feat.color}18`, border: `1px solid ${feat.color}44` }}
              >
                <feat.icon className="w-5 h-5" style={{ color: feat.color }} />
              </div>
              <h3 className="font-display font-bold text-base text-cream mb-2">{feat.title}</h3>
              <p className="text-sm text-cream/60 leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Snapshot card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="gradient-border-card"
        >
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
              <Vote className="w-7 h-7 text-gold" />
            </div>
            <h3 className="font-display font-bold text-2xl text-cream mb-3">
              {DAOConfig.snapshotUrl ? 'Vote on Snapshot' : 'Governance Portal'}
            </h3>
            <p className="text-cream/60 max-w-md mx-auto mb-6 text-sm">
              {DAOConfig.snapshotUrl
                ? 'Go to our Snapshot space to view active proposals and cast your vote.'
                : 'Our full governance portal is launching in Phase 2. Stay tuned to our channels for announcements.'
              }
            </p>
            {DAOConfig.snapshotUrl ? (
              <a
                href={DAOConfig.snapshotUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex"
              >
                Open Snapshot <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold/30 text-gold/60 text-sm cursor-default">
                <span className="w-2 h-2 rounded-full bg-gold/40 animate-pulse" />
                Coming in Phase 2
              </div>
            )}
          </div>
        </motion.div>

        {/* Mascot accent */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-10"
        >
          <img
            src={ASSETS.mascot}
            alt={`${PROJECT.name} mascot`}
            loading="lazy"
            className="w-20 object-contain opacity-70"
            style={{ filter: 'drop-shadow(0 4px 12px rgba(255,197,61,0.4))' }}
          />
        </motion.div>
      </div>
    </section>
  )
}
