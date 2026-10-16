import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  onComplete: () => void
}

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
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-dark-bg"
        >
          {/* Mascot spin reveal */}
          <motion.div
            animate={phase === 'spin' ? {
              rotate: [0, -8, 8, -5, 5, 0],
              scale: [1, 1.06, 1],
            } : {
              scale: [1, 1.15, 0.9, 1.2],
              opacity: [1, 1, 1, 0],
            }}
            transition={phase === 'spin' ? {
              duration: 1.4,
              ease: 'easeInOut',
              repeat: Infinity,
            } : {
              duration: 0.8,
              ease: 'easeOut',
            }}
            className="relative"
          >
            {/* Gold glow behind mascot */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 blur-3xl pointer-events-none"
              style={{ background: 'radial-gradient(ellipse, rgba(255,197,61,0.5) 0%, transparent 70%)' }}
            />
            {/* Transparent mascot — no background needed */}
            <img
              src="/assets/mokki-mascot.png"
              alt="MOKKI"
              className="relative w-44 h-44 object-contain drop-shadow-2xl"
              style={{ filter: 'drop-shadow(0 0 30px rgba(255,197,61,0.6))' }}
            />
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: phase === 'spin' ? 1 : 0, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-4 font-display font-bold text-3xl"
          >
            <span className="text-gold">MOKKI</span>
            <span className="text-cream"> DAO</span>
          </motion.div>

          {/* Loading bar */}
          <motion.div className="mt-6 w-48 h-1 rounded-full bg-dark-border overflow-hidden">
            <motion.div
              className="h-full rounded-full"
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
