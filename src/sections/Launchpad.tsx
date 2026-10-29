import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, CircleHelp, Coins, Info, Layers3, Rocket, ShieldCheck, Sparkles } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

type Chain = 'BSC' | 'Solana'

const STEPS = ['Token details', 'Chain & settings', 'Review']
const inputBase = 'w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20'

export default function Launchpad() {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const [step, setStep] = useState(0)
  const [chain, setChain] = useState<Chain>('BSC')
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [decimals, setDecimals] = useState('18')
  const [supply, setSupply] = useState('1000000000')
  const [taxEnabled, setTaxEnabled] = useState(false)
  const [buyTax, setBuyTax] = useState('0')
  const [sellTax, setSellTax] = useState('0')
  const [liquidity, setLiquidity] = useState('')
  const [toast, setToast] = useState(false)

  const fieldClass = `${inputBase} ${isLight ? 'border-black/15 bg-white text-[#26180c] placeholder:text-[#26180c]/35' : 'border-dark-border bg-dark-bg/60 text-cream placeholder:text-cream/30'}`
  const muted = isLight ? 'text-[#26180c]/65' : 'text-cream/60'
  const heading = isLight ? 'text-[#26180c]' : 'text-cream'

  const nextStep = () => setStep(current => Math.min(current + 1, STEPS.length - 1))
  const previousStep = () => setStep(current => Math.max(current - 1, 0))
  const showComingSoon = () => {
    setToast(true)
    window.setTimeout(() => setToast(false), 4200)
  }

  return (
    <section id="launchpad" className="scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-10 overflow-hidden rounded-3xl border border-gold/25 bg-gradient-to-br from-gold/10 via-orange/5 to-transparent p-6 sm:p-9 lg:p-11"
        >
          <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-gold/10 blur-3xl" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-gold">
                <Sparkles className="h-3.5 w-3.5" /> MOKKI Launchpad
              </div>
              <h2 className="section-title text-4xl sm:text-5xl">Launch your own token</h2>
              <p className={`mt-4 max-w-xl text-sm leading-relaxed sm:text-base ${muted}`}>
                Shape your token, choose your chain, and preview the launch setup. BSC and Solana support are planned.
              </p>
              <div className="mt-5 flex flex-wrap gap-2" aria-label="Supported chains, planned">
                <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${isLight ? 'border-black/10 bg-white/70 text-[#26180c]' : 'border-white/10 bg-white/5 text-cream'}`}>
                  <span className="h-2 w-2 rounded-full bg-gold" /> BNB Smart Chain
                </span>
                <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${isLight ? 'border-black/10 bg-white/70 text-[#26180c]' : 'border-white/10 bg-white/5 text-cream'}`}>
                  <span className="h-2 w-2 rounded-full bg-[#8BD450]" /> Solana
                </span>
              </div>
            </div>
            <div className="shrink-0 rounded-2xl border border-orange/30 bg-orange/10 px-5 py-4 text-center sm:min-w-48">
              <span className="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-orange">
                <span className="h-2 w-2 animate-pulse rounded-full bg-orange" /> Coming soon
              </span>
              <p className={`mt-1 text-xs ${muted}`}>UI preview only. No tokens are deployed.</p>
            </div>
          </div>
        </motion.div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.8fr)]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="glass-card overflow-hidden"
          >
            <div className={`border-b px-5 py-5 sm:px-7 ${isLight ? 'border-black/10' : 'border-dark-border'}`}>
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-widest ${muted}`}>Create a token</p>
                  <h3 className={`mt-1 font-display text-xl font-bold ${heading}`}>Launch configuration</h3>
                </div>
                <span className="rounded-full border border-orange/30 bg-orange/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-orange">Preview mode</span>
              </div>
              <div className="grid grid-cols-3 gap-2" aria-label={`Step ${step + 1} of 3`}>
                {STEPS.map((label, index) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setStep(index)}
                    className={`group flex items-center gap-2 text-left ${index < step ? 'cursor-pointer' : ''}`}
                    aria-current={step === index ? 'step' : undefined}
                  >
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${index === step ? 'bg-gold text-[#17120a]' : index < step ? 'bg-lime/20 text-lime' : isLight ? 'bg-black/5 text-[#26180c]/45' : 'bg-white/5 text-cream/40'}`}>
                      {index < step ? <Check className="h-3.5 w-3.5" /> : `0${index + 1}`}
                    </span>
                    <span className={`hidden text-xs font-semibold sm:block ${index === step ? heading : muted}`}>{label}</span>
                    {index < STEPS.length - 1 && <span className={`ml-auto hidden h-px flex-1 sm:block ${isLight ? 'bg-black/10' : 'bg-white/10'}`} />}
                  </button>
                ))}
              </div>
            </div>

            <div className="min-h-[340px] px-5 py-6 sm:px-7 sm:py-7">
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.18 }}>
                  {step === 0 && (
                    <div>
                      <h4 className={`font-display text-lg font-bold ${heading}`}>Token details</h4>
                      <p className={`mb-5 mt-1 text-sm ${muted}`}>Start with the basics. You can preview these details before launch.</p>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className={`text-xs font-semibold ${muted}`}>Token name
                          <input className={`${fieldClass} mt-2`} placeholder="e.g. MOKKI Moon" value={name} onChange={event => setName(event.target.value)} />
                        </label>
                        <label className={`text-xs font-semibold ${muted}`}>Token symbol
                          <input className={`${fieldClass} mt-2 uppercase`} placeholder="e.g. MOKKI" maxLength={10} value={symbol} onChange={event => setSymbol(event.target.value.toUpperCase())} />
                        </label>
                        <label className={`text-xs font-semibold ${muted}`}>Decimals
                          <input className={`${fieldClass} mt-2`} type="number" min="0" max="18" value={decimals} onChange={event => setDecimals(event.target.value)} />
                        </label>
                        <label className={`text-xs font-semibold ${muted}`}>Total supply
                          <input className={`${fieldClass} mt-2`} type="number" min="1" inputMode="numeric" value={supply} onChange={event => setSupply(event.target.value)} />
                        </label>
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div>
                      <h4 className={`font-display text-lg font-bold ${heading}`}>Chain & settings</h4>
                      <p className={`mb-5 mt-1 text-sm ${muted}`}>Choose a planned network and set optional launch parameters.</p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {(['BSC', 'Solana'] as Chain[]).map(option => (
                          <button key={option} type="button" onClick={() => setChain(option)} className={`rounded-2xl border p-4 text-left transition ${chain === option ? 'border-gold/60 bg-gold/10 ring-1 ring-gold/30' : isLight ? 'border-black/10 bg-white/50 hover:border-gold/40' : 'border-dark-border bg-dark-bg/30 hover:border-gold/30'}`}>
                            <span className="flex items-center justify-between">
                              <span className={`font-display font-bold ${heading}`}>{option === 'BSC' ? 'BNB Smart Chain' : 'Solana'}</span>
                              <span className={`h-4 w-4 rounded-full border-2 ${chain === option ? 'border-gold bg-gold shadow-[inset_0_0_0_3px] shadow-dark-bg' : isLight ? 'border-black/20' : 'border-white/20'}`} />
                            </span>
                            <span className={`mt-1 block text-xs ${muted}`}>{option === 'BSC' ? 'BEP-20 token' : 'SPL token'} · planned</span>
                          </button>
                        ))}
                      </div>
                      <div className={`mt-5 flex items-start gap-2 rounded-xl border p-3 text-xs ${isLight ? 'border-gold/25 bg-gold/5 text-[#5b3b0c]' : 'border-gold/20 bg-gold/5 text-cream/70'}`}>
                        <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> Chain selection is a visual preview only. No wallet connection or transaction is available.
                      </div>
                      <div className="mt-5 flex items-center justify-between gap-3">
                        <div>
                          <p className={`text-sm font-semibold ${heading}`}>Set buy and sell tax</p>
                          <p className={`text-xs ${muted}`}>Optional, shown for preview only</p>
                        </div>
                        <button type="button" role="switch" aria-checked={taxEnabled} onClick={() => setTaxEnabled(value => !value)} className={`relative h-6 w-11 rounded-full transition ${taxEnabled ? 'bg-gold' : isLight ? 'bg-black/15' : 'bg-white/15'}`}>
                          <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${taxEnabled ? 'left-6' : 'left-1'}`} />
                        </button>
                      </div>
                      {taxEnabled && <div className="mt-4 grid gap-4 sm:grid-cols-3">
                        <label className={`text-xs font-semibold ${muted}`}>Buy tax (%)<input className={`${fieldClass} mt-2`} type="number" min="0" max="25" value={buyTax} onChange={event => setBuyTax(event.target.value)} /></label>
                        <label className={`text-xs font-semibold ${muted}`}>Sell tax (%)<input className={`${fieldClass} mt-2`} type="number" min="0" max="25" value={sellTax} onChange={event => setSellTax(event.target.value)} /></label>
                        <label className={`text-xs font-semibold ${muted}`}>Liquidity amount<input className={`${fieldClass} mt-2`} type="number" min="0" placeholder={chain === 'BSC' ? 'BNB' : 'SOL'} value={liquidity} onChange={event => setLiquidity(event.target.value)} /></label>
                      </div>}
                      {!taxEnabled && <label className={`mt-4 block text-xs font-semibold ${muted}`}>Liquidity amount <span className="font-normal">({chain === 'BSC' ? 'BNB' : 'SOL'})</span>
                        <input className={`${fieldClass} mt-2`} type="number" min="0" placeholder="Enter amount for preview" value={liquidity} onChange={event => setLiquidity(event.target.value)} />
                      </label>}
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <h4 className={`font-display text-lg font-bold ${heading}`}>Review your setup</h4>
                      <p className={`mb-5 mt-1 text-sm ${muted}`}>Check the preview below. Deploy is disabled as a real feature.</p>
                      <div className={`overflow-hidden rounded-2xl border ${isLight ? 'border-black/10' : 'border-white/10'}`}>
                        {[
                          ['Token name', name || 'Not set'], ['Symbol', symbol ? `$${symbol}` : 'Not set'], ['Decimals', decimals || 'Not set'], ['Total supply', supply || 'Not set'], ['Network', chain === 'BSC' ? 'BNB Smart Chain' : 'Solana'], ['Buy / sell tax', taxEnabled ? `${buyTax || 0}% / ${sellTax || 0}%` : 'Not enabled'], ['Liquidity preview', liquidity ? `${liquidity} ${chain === 'BSC' ? 'BNB' : 'SOL'}` : 'Not set'],
                        ].map(([label, value], index) => (
                          <div key={label} className={`flex items-center justify-between gap-3 px-4 py-3 text-sm ${index % 2 === 0 ? isLight ? 'bg-black/[0.025]' : 'bg-white/[0.025]' : ''}`}>
                            <span className={muted}>{label}</span><span className={`text-right font-semibold ${heading}`}>{value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex items-start gap-2 rounded-xl border border-orange/25 bg-orange/5 p-3 text-xs text-orange">
                        <Info className="mt-0.5 h-4 w-4 shrink-0" /> This is a non-functional preview. Clicking below will not deploy a token or request a wallet.
                      </div>
                      <button type="button" onClick={showComingSoon} className="btn-gold mt-5 w-full justify-center" aria-label="Deploy token, launchpad coming soon">
                        <Rocket className="h-4 w-4" /> Deploy Token <span className="rounded-full bg-black/10 px-2 py-0.5 text-[10px] font-extrabold uppercase">Coming soon</span>
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className={`flex items-center justify-between border-t px-5 py-4 sm:px-7 ${isLight ? 'border-black/10' : 'border-dark-border'}`}>
              <button type="button" onClick={previousStep} disabled={step === 0} className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-35 ${heading} ${isLight ? 'hover:bg-black/5' : 'hover:bg-white/5'}`}>
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              {step < 2 && <button type="button" onClick={nextStep} className="btn-gold px-5 py-2.5 text-xs">Continue <ArrowRight className="h-4 w-4" /></button>}
              {step === 2 && <span className={`text-xs ${muted}`}>Step 3 of 3</span>}
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="space-y-5"
          >
            <div className="glass-card p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold"><Coins className="h-5 w-5" /></div>
                <div><h3 className={`font-display font-bold ${heading}`}>Simple launch pricing</h3><p className={`text-xs ${muted}`}>Details announced at launch</p></div>
              </div>
              <div className={`rounded-xl border p-4 ${isLight ? 'border-gold/25 bg-gold/5' : 'border-gold/20 bg-gold/5'}`}>
                <p className={`text-xs font-semibold uppercase tracking-wider ${muted}`}>Deployment fee</p>
                <p className="mt-1 font-display text-2xl font-extrabold text-gold">Coming soon</p>
                <p className={`mt-1 text-xs leading-relaxed ${muted}`}>No fee is charged in this preview. Final pricing will be shown before any launch.</p>
              </div>
              <div className="mt-4 space-y-3">
                {[[ShieldCheck, 'Guided token setup'], [Layers3, 'BSC and Solana options'], [Sparkles, 'Settings preview before launch']].map(([Icon, text]) => {
                  const BenefitIcon = Icon as typeof ShieldCheck
                  return <div key={text as string} className={`flex items-center gap-2.5 text-sm ${muted}`}><BenefitIcon className="h-4 w-4 shrink-0 text-lime" />{text as string}</div>
                })}
              </div>
            </div>

            <div className="glass-card p-5 sm:p-6">
              <h3 className={`mb-4 flex items-center gap-2 font-display font-bold ${heading}`}><CircleHelp className="h-4 w-4 text-gold" /> Quick answers</h3>
              <div className="space-y-4">
                <div><p className={`text-sm font-semibold ${heading}`}>Can I deploy a token now?</p><p className={`mt-1 text-xs leading-relaxed ${muted}`}>Not yet. This page is a UI preview only and does not connect to wallets or deploy contracts.</p></div>
                <div><p className={`text-sm font-semibold ${heading}`}>Which chains are planned?</p><p className={`mt-1 text-xs leading-relaxed ${muted}`}>BNB Smart Chain and Solana are shown as planned options. Availability will be confirmed when the launchpad is ready.</p></div>
                <div><p className={`text-sm font-semibold ${heading}`}>What happens to my entries?</p><p className={`mt-1 text-xs leading-relaxed ${muted}`}>The form only updates this local preview. It does not submit or store your configuration.</p></div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>

      <AnimatePresence>
        {toast && <motion.div role="status" aria-live="polite" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} className={`fixed bottom-5 left-1/2 z-[70] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center gap-3 rounded-2xl border px-4 py-3 shadow-2xl ${isLight ? 'border-gold/30 bg-white text-[#26180c]' : 'border-gold/30 bg-dark-card text-cream'}`}>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold"><Check className="h-4 w-4" /></span>
          <span className="text-sm font-semibold">Launchpad coming soon. Join the Telegram for early access.</span>
        </motion.div>}
      </AnimatePresence>
    </section>
  )
}
