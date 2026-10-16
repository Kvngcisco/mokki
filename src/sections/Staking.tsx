import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Coins, TrendingUp, Clock, Info } from 'lucide-react'
import { STAKING, PROJECT } from '../config'

export default function Staking() {
  const [amount, setAmount] = useState('')
  const [selectedPeriod, setSelectedPeriod] = useState(STAKING.lockPeriods[0])

  const estimated = amount && !isNaN(Number(amount))
    ? ((Number(amount) * selectedPeriod.apr) / 100 * (selectedPeriod.days / 365)).toFixed(2)
    : null

  return (
    <section id="staking" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="tag mb-4 inline-flex">Earn Rewards</span>
          <h2 className="section-title">Staking & Rewards</h2>
          <p className="text-cream/60 mt-3 max-w-xl mx-auto">
            Stake your {PROJECT.ticker} and earn rewards. Lock longer, earn more.
          </p>
        </motion.div>

        {/* Coming soon banner */}
        {!STAKING.enabled && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-8 p-4 rounded-2xl border border-gold/40 bg-gold/5 flex items-center gap-3"
          >
            <Info className="w-5 h-5 text-gold flex-shrink-0" />
            <div>
              <p className="font-semibold text-gold text-sm">Staking Coming Soon</p>
              <p className="text-cream/60 text-xs mt-0.5">
                The staking contract is under development. Numbers below are illustrative only.
              </p>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Staking form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 flex flex-col gap-5"
          >
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-gold" />
              <h3 className="font-display font-bold text-lg text-cream">Stake {PROJECT.ticker}</h3>
            </div>

            {/* Amount input */}
            <div>
              <label className="text-xs text-cream/40 uppercase tracking-wider mb-2 block">Amount</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="0.00"
                  disabled={!STAKING.enabled}
                  className="flex-1 bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-cream font-mono text-sm focus:outline-none focus:border-gold/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  disabled={!STAKING.enabled}
                  className="px-3 py-2 rounded-xl border border-gold/40 text-gold text-xs font-bold hover:bg-gold/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setAmount('10000')}
                >
                  MAX
                </button>
              </div>
              <p className="text-xs text-cream/30 mt-1">Min: {STAKING.minStake.toLocaleString()} {PROJECT.ticker}</p>
            </div>

            {/* Lock period */}
            <div>
              <label className="text-xs text-cream/40 uppercase tracking-wider mb-2 block">Lock Period</label>
              <div className="grid grid-cols-3 gap-2">
                {STAKING.lockPeriods.map(p => (
                  <button
                    key={p.days}
                    disabled={!STAKING.enabled}
                    onClick={() => setSelectedPeriod(p)}
                    className={`py-2.5 rounded-xl border text-sm font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                      ${selectedPeriod.days === p.days
                        ? 'border-gold bg-gold/15 text-gold'
                        : 'border-dark-border text-cream/60 hover:border-gold/40'
                      }`}
                  >
                    <div>{p.days}d</div>
                    <div className="text-xs text-lime">{p.apr}% APR</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Estimated rewards */}
            {estimated && (
              <div className="p-3 rounded-xl bg-lime/5 border border-lime/20">
                <p className="text-xs text-cream/40 mb-1">Estimated Rewards</p>
                <p className="font-display font-bold text-lime text-xl tabular-nums">
                  ~{parseFloat(estimated).toLocaleString()} {PROJECT.ticker}
                </p>
                <p className="text-xs text-cream/30">Illustrative only — actual rewards may vary</p>
              </div>
            )}

            {/* Stake button */}
            <button
              disabled={!STAKING.enabled}
              className="btn-gold w-full justify-center opacity-60 cursor-not-allowed"
            >
              <Lock className="w-4 h-4" />
              {STAKING.enabled ? 'Stake' : 'Coming Soon'}
            </button>
          </motion.div>

          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            {[
              {
                icon: TrendingUp,
                title: 'APR Tiers',
                content: STAKING.lockPeriods.map(p => (
                  <div key={p.days} className="flex justify-between text-sm py-1.5 border-b border-dark-border last:border-0">
                    <span className="text-cream/60">{p.days} days</span>
                    <span className="font-bold text-lime tabular-nums">{p.apr}% APR</span>
                  </div>
                )),
              },
              {
                icon: Coins,
                title: 'Your Stats',
                content: (
                  <div className="space-y-3 text-sm">
                    {[
                      { label: 'Staked Balance', value: 'Connect wallet' },
                      { label: 'Claimable Rewards', value: 'Connect wallet' },
                      { label: 'Reward Token', value: STAKING.rewardToken },
                    ].map(item => (
                      <div key={item.label} className="flex justify-between py-1.5 border-b border-dark-border last:border-0">
                        <span className="text-cream/60">{item.label}</span>
                        <span className="text-cream/40 text-xs">{item.value}</span>
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                icon: Clock,
                title: 'How it Works',
                content: (
                  <ul className="space-y-2 text-sm text-cream/60">
                    <li>• Stake {PROJECT.ticker} to earn rewards</li>
                    <li>• Choose a lock period for higher APR</li>
                    <li>• Rewards accumulate in real-time</li>
                    <li>• Claim at any time; unstake after lock</li>
                  </ul>
                ),
              },
            ].map(card => (
              <div key={card.title} className="glass-card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <card.icon className="w-4 h-4 text-gold" />
                  <h4 className="font-display font-bold text-sm text-cream">{card.title}</h4>
                </div>
                {card.content}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
