import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, LoaderCircle, ShieldCheck, Wallet, X } from 'lucide-react'

type Chain = 'BSC' | 'Solana'
type WalletModalProps = {
  open: boolean
  connectingWallet: string
  chain: Chain
  isLight: boolean
  heading: string
  muted: string
  onClose: () => void
  onChoose: (provider: string) => void
}

const wallets = [
  { name: 'MetaMask', symbol: 'M', tone: 'bg-orange/10 text-orange' },
  { name: 'WalletConnect', symbol: 'W', tone: 'bg-sky-500/10 text-sky-500' },
  { name: 'Trust', symbol: 'T', tone: 'bg-blue-500/10 text-blue-500' },
  { name: 'Phantom', symbol: 'P', tone: 'bg-violet-500/10 text-violet-500' },
]

export default function WalletModal({ open, connectingWallet, chain, isLight, heading, muted, onClose, onChoose }: WalletModalProps) {
  return <AnimatePresence>{open && <motion.div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={event => { if (event.target === event.currentTarget && !connectingWallet) onClose() }}>
    <motion.div role="dialog" aria-modal="true" aria-labelledby="wallet-modal-title" initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.98 }} transition={{ duration: 0.18 }} className={`w-full max-w-md rounded-t-3xl border p-5 shadow-2xl sm:rounded-3xl sm:p-6 ${isLight ? 'border-black/10 bg-[#fffdf8]' : 'border-white/10 bg-dark-card'}`}>
      <div className="mb-5 flex items-start justify-between gap-4"><div><p className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold"><Wallet className="h-3 w-3" /> Wallet preview</p><h3 id="wallet-modal-title" className={`font-display text-xl font-extrabold ${heading}`}>{connectingWallet ? 'Connecting…' : 'Connect a wallet'}</h3><p className={`mt-1 text-xs ${muted}`}>{connectingWallet ? `Simulating ${connectingWallet} connection` : `Choose a wallet to preview ${chain === 'BSC' ? 'BNB Smart Chain' : 'Solana'} connection`}</p></div><button type="button" disabled={!!connectingWallet} onClick={onClose} aria-label="Close wallet options" className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition disabled:opacity-40 ${isLight ? 'text-[#26180c]/60 hover:bg-black/5' : 'text-cream/60 hover:bg-white/5'}`}><X className="h-4 w-4" /></button></div>
      {connectingWallet ? <div className="flex min-h-56 flex-col items-center justify-center text-center"><span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold"><LoaderCircle className="h-7 w-7 animate-spin" /></span><p className={`mt-4 text-sm font-semibold ${heading}`}>Connecting to {connectingWallet}</p><p className={`mt-1 text-xs ${muted}`}>This is only a simulated preview.</p></div> : <div className="grid gap-2 sm:grid-cols-2">{wallets.map(wallet => <button key={wallet.name} type="button" onClick={() => onChoose(wallet.name)} className={`flex min-h-14 items-center gap-3 rounded-2xl border px-4 text-left transition hover:border-gold/40 hover:bg-gold/5 focus:outline-none focus:ring-2 focus:ring-gold/40 ${isLight ? 'border-black/10 bg-white' : 'border-white/10 bg-white/[0.02]'}`}><span className={`flex h-9 w-9 items-center justify-center rounded-xl font-display font-extrabold ${wallet.tone}`}>{wallet.symbol}</span><span className={`text-sm font-semibold ${heading}`}>{wallet.name}</span><ArrowRight className={`ml-auto h-4 w-4 ${muted}`} /></button>)}</div>}
      <div className={`mt-5 flex items-center justify-center gap-2 border-t pt-4 text-[10px] ${isLight ? 'border-black/10 text-[#26180c]/45' : 'border-white/10 text-cream/40'}`}><ShieldCheck className="h-3.5 w-3.5" />Demo preview only. No wallet access or transactions.</div>
    </motion.div>
  </motion.div>}</AnimatePresence>
}
