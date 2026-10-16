import { motion } from 'framer-motion'
import { Wallet, ArrowDownUp, Plus, CheckCircle, ExternalLink } from 'lucide-react'
import { TOKEN, PROJECT } from '../config'

const STEPS = [
  {
    number: '01',
    icon: Wallet,
    title: 'Get a Web3 Wallet',
    desc: 'Download MetaMask or Trust Wallet. Create a new wallet and securely back up your seed phrase. Never share it with anyone.',
    links: [
      { label: 'Get MetaMask', href: 'https://metamask.io', icon: ExternalLink },
      { label: 'Get Trust Wallet', href: 'https://trustwallet.com', icon: ExternalLink },
    ],
    color: '#FFC53D',
  },
  {
    number: '02',
    icon: CheckCircle,
    title: 'Add BNB Smart Chain',
    desc: 'Add BSC network to your wallet. Chain ID: 56 · RPC: https://bsc-dataseed.binance.org · Symbol: BNB.',
    links: [
      { label: 'Add BSC via Chainlist', href: 'https://chainlist.org/chain/56', icon: ExternalLink },
    ],
    color: '#F28C28',
  },
  {
    number: '03',
    icon: ArrowDownUp,
    title: 'Get BNB',
    desc: 'Buy BNB on any major exchange (Binance, Coinbase) and withdraw to your wallet on BNB Smart Chain (BEP-20).',
    links: [],
    color: '#3B6BFF',
  },
  {
    number: '04',
    icon: Plus,
    title: 'Swap for $MOKKI',
    desc: 'Go to PancakeSwap, connect your wallet, and swap BNB for $MOKKI using the official contract address. Set slippage to 5% if needed.',
    links: [
      { label: 'Buy on PancakeSwap', href: TOKEN.pancakeSwapUrl, icon: ExternalLink },
    ],
    color: '#8BD450',
  },
]

export default function HowToBuy() {
  return (
    <section id="how-to-buy" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="tag mb-4 inline-flex">Getting Started</span>
          <h2 className="section-title">How to Buy {PROJECT.ticker}</h2>
          <p className="text-cream/60 mt-3 max-w-xl mx-auto">
            Get your $MOKKI in four simple steps. Takes less than 5 minutes.
          </p>
        </motion.div>

        {/* Contract warning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 p-4 rounded-2xl border border-gold/30 bg-gold/5 flex flex-col sm:flex-row items-start sm:items-center gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-4 h-4 text-gold" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gold mb-0.5">Always verify the contract address</p>
            <p className="text-xs text-cream/60">
              Official CA: <span className="font-mono text-cream">{TOKEN.contractAddress}</span>
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="glass-card p-6 group"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${step.color}18`, border: `1px solid ${step.color}44` }}
                >
                  <step.icon className="w-5 h-5" style={{ color: step.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold tabular-nums" style={{ color: step.color }}>
                      {step.number}
                    </span>
                    <h3 className="font-display font-bold text-base text-cream">{step.title}</h3>
                  </div>
                  <p className="text-sm text-cream/60 leading-relaxed mb-3">{step.desc}</p>
                  {step.links.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {step.links.map(link => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 hover:scale-105"
                          style={{
                            borderColor: `${step.color}44`,
                            color: step.color,
                          }}
                        >
                          {link.label}
                          <link.icon className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add to wallet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <div className="glass-card inline-flex flex-col sm:flex-row items-center gap-4 px-6 py-4">
            <img src="/assets/mokki-mascot.png" alt="MOKKI" className="w-12 h-12 object-contain" />
            <div className="text-sm text-left">
              <p className="font-semibold text-cream">Add {PROJECT.ticker} to your wallet</p>
              <p className="text-cream/50 text-xs">Import the token using the contract address above</p>
            </div>
            <a
              href={TOKEN.bscScanUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-xs px-4 py-2 whitespace-nowrap"
            >
              View Contract
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
