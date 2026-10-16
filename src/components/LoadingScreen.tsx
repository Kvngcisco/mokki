import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ASSETS } from '../assets'

interface Props { onComplete: () => void }

export default function LoadingScreen({ onComplete }: Props) {
  const [phase, setPhase] = useState<'spin' | 'reveal' | 'done'>('spin')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reveal'), 1600)
    const t2 = setTimeout(() => { setPhase('done'); onComplete() }, 2600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-dark-bg">

          {/* Mascot — transparent, no box */}
          <motion.div
            animate={phase === 'spin'
              ? { rotate: [0, -6, 6, -4, 4, 0], scale: [1, 1.05, 1] }
              : { scale: [1, 1.18, 0.9, 1.2], opacity: [1, 1, 1, 0] }}
            transition={phase === 'spin'
              ? { duration: 1.5, ease: 'easeInOut', repeat: Infinity }
              : { duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            {/* Glow — no box, just blur */}
            <motion.div aria-hidden="true"
              animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.85, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse, rgba(255,197,61,0.55) 0%, transparent 70%)',
                filter: 'blur(24px)',
              }}
            />
            <img
              src={ASSETS.mascot}
              alt="MOKKI DAO"
              className="relative w-40 h-40 object-contain"
              style={{ filter: 'drop-shadow(0 0 16px rgba(255,197,61,0.65))' }}
            />
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: phase === 'spin' ? 1 : 0, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-5 font-display font-bold text-3xl"
          >
            <span className="text-gold">MOKKI</span>
            <span className="text-cream"> DAO</span>
          </motion.div>

          {/* Progress bar */}
          <motion.div className="mt-6 w-48 h-1 rounded-full bg-dark-border overflow-hidden">
            <motion.div className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #FFC53D, #F28C28)' }}
              initial={{ width: '0%' }}
              animate={{ width: phase === 'spin' ? '80%' : '100%' }}
              transition={{ duration: phase === 'spin' ? 1.4 : 0.3 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
