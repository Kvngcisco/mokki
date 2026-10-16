import { motion } from 'framer-motion'
import { Users, Hammer, TrendingUp, Eye } from 'lucide-react'
import { PROJECT } from '../config'
import { ASSETS } from '../assets'

const CARDS = [
  {
    icon: Users,
    title: 'Community First',
    desc: 'Every decision is made by and for the community. $MOKKI holders guide the project through decentralized governance.',
    color: '#FFC53D',
  },
  {
    icon: Hammer,
    title: 'Building Together',
    desc: 'A growing team of contributors — developers, designers, and community leaders — building on BSC.',
    color: '#F28C28',
  },
  {
    icon: TrendingUp,
    title: 'Sustainable Growth',
    desc: 'Tokenomics built for longevity: 0/0 tax, renounced ownership, and transparent liquidity management.',
    color: '#3B6BFF',
  },
  {
    icon: Eye,
    title: 'Clear Vision',
    desc: 'From GameFi to DAO governance and beyond — MOKKI DAO has a clear roadmap into the Web3 future.',
    color: '#8BD450',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function About() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Mascot — transparent PNG, no wrapper box */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0 relative flex items-center justify-center"
          >
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 65% 55% at 50% 55%, rgba(255,197,61,0.28) 0%, transparent 70%)',
                filter: 'blur(24px)',
              }}
            />
            <img
              src={ASSETS.mascot}
              alt="MOKKI DAO mascot"
              loading="lazy"
              className="relative w-56 sm:w-72 lg:w-80 object-contain"
              style={{ filter: 'drop-shadow(0 12px 28px rgba(242,140,40,0.38)) saturate(1.05)' }}
            />
          </motion.div>

          {/* Text side */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="tag mb-4 inline-flex">About the Project</span>
              <h2 className="section-title mb-6">What is {PROJECT.name}?</h2>
              <p className="text-cream/70 text-lg leading-relaxed mb-4">
                {PROJECT.shortDescription}
              </p>
              <p className="text-cream/60 leading-relaxed">
                {PROJECT.longDescription}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Value cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16"
        >
          {CARDS.map(card => (
            <motion.div
              key={card.title}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -4 }}
              className="glass-card p-6 group cursor-default"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{ background: `${card.color}18`, border: `1px solid ${card.color}44` }}
              >
                <card.icon className="w-6 h-6" style={{ color: card.color }} />
              </div>
              <h3 className="font-display font-bold text-lg mb-2 text-cream">{card.title}</h3>
              <p className="text-cream/60 text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
