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
          {/* Coin spin */}
          <motion.div
            animate={phase === 'spin' ? {
              rotateY: [0, 360],
              scale: [1, 1.1, 1],
            } : {
              scale: [1, 1.2, 0.9, 1.15],
              opacity: [1, 1, 1, 0],
            }}
            transition={phase === 'spin' ? {
              duration: 1.2,
              ease: 'easeInOut',
              repeat: Infinity,
            } : {
              duration: 0.8,
              ease: 'easeOut',
            }}
            className="relative"
          >
            {/* Gold glow */}
            <div className="absolute inset-0 rounded-full bg-gold/30 blur-2xl scale-150" />
            <div className="relative w-28 h-28 rounded-full overflow-hidden ring-4 ring-gold/60 shadow-[0_0_60px_rgba(255,197,61,0.5)]">
              <img src="/assets/mokki-logo.png" alt="MOKKI" className="w-full h-full object-contain bg-[#1a1025]" />
            </div>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: phase === 'spin' ? 1 : 0, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 font-display font-bold text-3xl"
          >
            <span className="text-gold">MOKKI</span>
            <span className="text-cream"> DAO</span>
          </motion.div>

          {/* Loading bar */}
          <motion.div className="mt-8 w-48 h-1 rounded-full bg-dark-border overflow-hidden">
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
