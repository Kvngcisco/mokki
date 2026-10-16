import { motion } from 'framer-motion'
import { CheckCircle, Circle, Clock } from 'lucide-react'
import { ROADMAP } from '../config'

const STATUS_CONFIG = {
  completed: {
    icon: CheckCircle,
    label: 'Completed',
    color: '#8BD450',
    bg: 'bg-lime/10 border-lime/30',
    text: 'text-lime',
  },
  'in-progress': {
    icon: Clock,
    label: 'In Progress',
    color: '#FFC53D',
    bg: 'bg-gold/10 border-gold/30',
    text: 'text-gold',
  },
  planned: {
    icon: Circle,
    label: 'Planned',
    color: '#3B6BFF',
    bg: 'bg-blue-glow/10 border-blue-glow/30',
    text: 'text-blue-400',
  },
}

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="tag mb-4 inline-flex">Our Journey</span>
          <h2 className="section-title">Roadmap</h2>
          <p className="text-cream/60 mt-3 max-w-xl mx-auto">
            From launch to a fully decentralized GameFi ecosystem — here's where we're headed.
          </p>
        </motion.div>

        <div className="relative pl-16">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-dark-border to-transparent" />

          <div className="space-y-8">
            {ROADMAP.map((phase, i) => {
              const cfg = STATUS_CONFIG[phase.status]
              return (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative"
                >
                  {/* Timeline dot — positioned in the left gutter */}
                  <div
                    className="absolute -left-16 top-4 w-12 h-12 rounded-full flex items-center justify-center border-2"
                    style={{
                      background: `${cfg.color}15`,
                      borderColor: cfg.color,
                      boxShadow: `0 0 20px ${cfg.color}40`,
                    }}
                  >
                    <cfg.icon className="w-5 h-5" style={{ color: cfg.color }} />
                  </div>

                  {/* Card */}
                  <div className="glass-card p-5">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <span className="text-xs font-bold text-cream/40 uppercase tracking-wider">{phase.phase}</span>
                        <h3 className="font-display font-bold text-base text-cream mt-0.5">{phase.title}</h3>
                      </div>
                      <span className={`tag border ${cfg.bg} ${cfg.text} text-xs flex-shrink-0`}>
                        {cfg.label}
                      </span>
                    </div>
                    <ul className="space-y-1.5">
                      {phase.items.map(item => (
                        <li key={item} className="flex items-start gap-2 text-sm text-cream/60">
                          <cfg.icon className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: cfg.color }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
