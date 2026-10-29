import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, CircleHelp, Coins, Hexagon, Info, Layers3, Rocket, ShieldCheck, Sparkles, WalletCards, Zap } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

type Chain = 'BSC' | 'Solana'
const STEPS = ['Token details', 'Chain & settings', 'Review']
const inputBase = 'w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20'

function CountUp({ value, suffix = '', decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0)
  const reduceMotion = useReducedMotion()
  useEffect(() => {
    if (reduceMotion) { setCount(value); return }
    let frame = 0
    const frames = 42
    const timer = window.setInterval(() => {
      frame += 1
      const eased = 1 - Math.pow(1 - Math.min(frame / frames, 1), 3)
      setCount(value * eased)
      if (frame >= frames) window.clearInterval(timer)
    }, 24)
    return () => window.clearInterval(timer)
  }, [value, reduceMotion])
  return <>{count.toFixed(decimals)}{suffix}</>
}

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
  const [attempted, setAttempted] = useState(false)
  const [toast, setToast] = useState(false)
  const [logoPreview, setLogoPreview] = useState('')
  const [logoError, setLogoError] = useState('')
  const logoInputRef = useRef<HTMLInputElement>(null)
  const logoObjectUrlRef = useRef<string | null>(null)

  useEffect(() => () => {
    if (logoObjectUrlRef.current) URL.revokeObjectURL(logoObjectUrlRef.current)
  }, [])

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (file.size > 1024 * 1024) {
      setLogoError('That file is over 1 MB. Choose a smaller image.')
      return
    }
    const validMime = ['image/png', 'image/jpeg', 'image/svg+xml'].includes(file.type)
    const validExt = /\.(png|jpe?g|svg)$/i.test(file.name)
    if (!validMime && !validExt) {
      setLogoError('Choose a PNG, JPG, or SVG image.')
      return
    }
    if (logoObjectUrlRef.current) URL.revokeObjectURL(logoObjectUrlRef.current)
    const objectUrl = URL.createObjectURL(file)
    logoObjectUrlRef.current = objectUrl
    setLogoPreview(objectUrl)
    setLogoError('')
  }

  const removeLogo = () => {
    if (logoObjectUrlRef.current) URL.revokeObjectURL(logoObjectUrlRef.current)
    logoObjectUrlRef.current = null
    setLogoPreview('')
    setLogoError('')
    if (logoInputRef.current) logoInputRef.current.value = ''
  }

  const fieldClass = `${inputBase} ${isLight ? 'border-black/15 bg-white text-[#26180c] placeholder:text-[#26180c]/35' : 'border-dark-border bg-dark-bg/60 text-cream placeholder:text-cream/30'}`
  const muted = isLight ? 'text-[#26180c]/65' : 'text-cream/60'
  const heading = isLight ? 'text-[#26180c]' : 'text-cream'
  const symbolIsValid = /^[a-zA-Z0-9]{2,10}$/.test(symbol.trim())
  const detailsAreValid = name.trim().length > 0 && symbolIsValid && Number.isInteger(Number(decimals)) && Number(decimals) >= 0 && Number(decimals) <= 18 && Number(supply) > 0
  const taxIsValid = !taxEnabled || ([buyTax, sellTax].every(value => Number(value) >= 0 && Number(value) <= 25))
  const estimatedCost = chain === 'BSC' ? '0.08 BNB' : '2.2 SOL'
  const errorClass = 'mt-1.5 block text-xs font-medium text-red-500'

  const nextStep = () => {
    setAttempted(true)
    if (step === 0 && !detailsAreValid) return
    if (step === 1 && !taxIsValid) return
    setAttempted(false)
    setStep(current => Math.min(current + 1, STEPS.length - 1))
  }
  const goToStep = (index: number) => {
    if (index < step) { setAttempted(false); setStep(index); return }
    if (index === 1 && detailsAreValid) { setAttempted(false); setStep(1) }
    if (index === 2 && detailsAreValid && taxIsValid) { setAttempted(false); setStep(2) }
  }
  const previousStep = () => { setAttempted(false); setStep(current => Math.max(current - 1, 0)) }
  const showComingSoon = () => {
    setToast(true)
    window.setTimeout(() => setToast(false), 4200)
  }

  return (
    <section id="launchpad" className="scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative mb-8 overflow-hidden rounded-3xl border border-gold/25 bg-gradient-to-br from-gold/10 via-orange/5 to-transparent p-6 sm:p-9 lg:p-11">
          <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-lime/10 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-gold"><Sparkles className="h-3.5 w-3.5" /> MOKKI Launchpad <span className="rounded-full bg-orange/15 px-2 py-0.5 text-[10px] text-orange">Coming soon</span></div>
              <h2 className="section-title text-4xl leading-[1.04] sm:text-6xl lg:text-7xl">Launch your own<br className="hidden sm:block" /> token. <span className="bg-gradient-to-r from-lime to-gold bg-clip-text text-transparent">Your way.</span></h2>
              <p className={`mt-5 max-w-2xl text-sm leading-relaxed sm:text-base ${muted}`}>A considered, guided token launch experience for BNB Smart Chain and Solana. Configure, review, and understand your setup before you go live.</p>
            </div>
            <motion.div whileHover={{ y: -4, rotate: 1 }} className={`relative flex min-h-44 min-w-52 flex-col justify-between overflow-hidden rounded-3xl border p-5 shadow-xl ${isLight ? 'border-gold/25 bg-white/75 shadow-amber-950/5' : 'border-white/10 bg-dark-card/70 shadow-black/20'} backdrop-blur-xl`}>
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full border border-gold/20" /><div className="absolute -right-1 -top-1 h-16 w-16 rounded-full border border-lime/20" />
              <div className="flex items-center justify-between"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-orange text-[#201409]"><Rocket className="h-5 w-5" /></div><span className="flex items-center gap-1.5 rounded-full border border-orange/30 bg-orange/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-orange"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange" /> Preview</span></div>
              <div><p className={`font-display text-lg font-extrabold ${heading}`}>Built for launch day</p><p className={`mt-1 text-xs leading-relaxed ${muted}`}>A polished walkthrough. No wallet or contract calls.</p></div>
            </motion.div>
          </div>
          <div className="relative mt-8 grid grid-cols-3 gap-2 sm:gap-3">
            {[{ value: 128, suffix: '+', label: 'tokens launched', icon: Coins }, { value: 2.4, suffix: 'M', label: 'volume facilitated', icon: Layers3, decimals: 1 }, { value: 90, suffix: ' sec', label: 'avg. setup time', icon: Zap }].map((stat, index) => <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className={`rounded-2xl border p-3 sm:p-4 ${isLight ? 'border-black/10 bg-white/65' : 'border-white/10 bg-black/10'}`}>
              <stat.icon className="mb-2 h-4 w-4 text-gold" /><p className={`font-display text-lg font-extrabold tabular-nums sm:text-2xl ${heading}`}><CountUp value={stat.value} suffix={stat.suffix} decimals={stat.decimals ?? 0} /></p><p className={`mt-0.5 text-[10px] leading-tight sm:text-xs ${muted}`}>{stat.label}</p>
            </motion.div>)}
          </div>
          <p className={`relative mt-2 text-right text-[10px] ${muted}`}>Illustrative demo metrics, not live platform data</p>
        </motion.div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.8fr)]">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="glass-card overflow-hidden shadow-2xl shadow-black/5">
            <div className={`border-b px-5 py-5 sm:px-7 ${isLight ? 'border-black/10' : 'border-dark-border'}`}>
              <div className="mb-6 flex items-center justify-between gap-3">
                <div><p className={`text-xs font-semibold uppercase tracking-widest ${muted}`}>Create a token</p><h3 className={`mt-1 font-display text-xl font-bold ${heading}`}>Launch configuration</h3></div>
                <span className="rounded-full border border-orange/30 bg-orange/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-orange">UI demo</span>
              </div>
              <div className="relative grid grid-cols-3 gap-2" aria-label={`Step ${step + 1} of 3`}>
                <div className={`absolute left-[12%] right-[12%] top-3.5 h-0.5 ${isLight ? 'bg-black/10' : 'bg-white/10'}`}><motion.div className="h-full origin-left bg-gradient-to-r from-gold to-lime" animate={{ scaleX: step / 2 }} transition={{ duration: 0.35 }} /></div>
                {STEPS.map((label, index) => <button key={label} type="button" onClick={() => goToStep(index)} className="relative z-10 flex flex-col items-center gap-2" aria-current={step === index ? 'step' : undefined}>
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ring-4 ${index < step ? 'bg-lime text-[#14200a] ring-lime/10' : index === step ? 'bg-gold text-[#17120a] ring-gold/15' : isLight ? 'bg-[#eee9df] text-[#26180c]/45 ring-white' : 'bg-[#222230] text-cream/40 ring-dark-card'}`}>{index < step ? <Check className="h-3.5 w-3.5" /> : `0${index + 1}`}</span>
                  <span className={`text-[10px] font-semibold sm:text-xs ${index === step ? heading : muted}`}>{label}</span>
                </button>)}
              </div>
            </div>

            <div className="min-h-[360px] px-5 py-6 sm:px-7 sm:py-7">
              <AnimatePresence mode="wait"><motion.div key={step} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.18 }}>
                {step === 0 && <div>
                  <div className="mb-5 flex items-center justify-between gap-4"><div><h4 className={`font-display text-lg font-bold ${heading}`}>Token details</h4><p className={`mt-1 text-sm ${muted}`}>The essentials that define your token.</p></div><motion.div key={logoPreview || symbol.slice(0, 1) || '?'} initial={{ scale: 0.75, rotate: -12 }} animate={{ scale: 1, rotate: 0 }} className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/25 to-orange/15 font-display text-2xl font-black text-gold shadow-lg shadow-gold/10">{logoPreview ? <img src={logoPreview} alt="Token logo preview" className="h-full w-full object-cover" /> : (symbol.trim().charAt(0) || '?')}</motion.div></div>
                  <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
                    <label className={`text-xs font-semibold ${muted}`}>Token name<input className={`${fieldClass} mt-2`} placeholder="e.g. MOKKI Moon" value={name} onChange={event => setName(event.target.value)} />{attempted && !name.trim() && <span className={errorClass}>Add a name for your token.</span>}</label>
                    <label className={`text-xs font-semibold ${muted}`}>Token symbol<input className={`${fieldClass} mt-2 uppercase`} placeholder="e.g. MOKKI" maxLength={10} value={symbol} onChange={event => setSymbol(event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))} />{attempted && !symbolIsValid ? <span className={errorClass}>Symbol must be 2-10 chars (letters or numbers).</span> : <span className={`mt-1.5 block text-[11px] ${muted}`}>2-10 characters. Preview: ${symbol || 'TOKEN'}</span>}</label>
                    <label className={`text-xs font-semibold ${muted}`}>Decimals<input className={`${fieldClass} mt-2`} type="number" min="0" max="18" value={decimals} onChange={event => setDecimals(event.target.value)} />{attempted && (!Number.isInteger(Number(decimals)) || Number(decimals) < 0 || Number(decimals) > 18) && <span className={errorClass}>Enter a whole number from 0 to 18.</span>}</label>
                    <label className={`text-xs font-semibold ${muted}`}>Total supply<input className={`${fieldClass} mt-2`} type="number" min="1" inputMode="numeric" value={supply} onChange={event => setSupply(event.target.value)} />{attempted && !(Number(supply) > 0) && <span className={errorClass}>Supply must be greater than zero.</span>}</label>
                  </div>
                  <div className={`mt-5 rounded-2xl border p-4 sm:flex sm:items-center sm:gap-4 ${isLight ? 'border-black/10 bg-white/50' : 'border-white/10 bg-white/[0.02]'}`}>
                    <div className={`mb-4 flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-gold/35 bg-gradient-to-br from-gold/20 to-orange/10 font-display text-2xl font-black text-gold sm:mb-0 ${logoPreview ? '' : 'shadow-lg shadow-gold/10'}`}>
                      {logoPreview ? <img src={logoPreview} alt="Selected token logo preview" className="h-full w-full object-cover" /> : (symbol.trim().charAt(0) || '?')}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-bold ${heading}`}>Project logo <span className={`font-normal ${muted}`}>(optional)</span></p>
                      <p className={`mt-1 text-xs leading-relaxed ${muted}`}>PNG, JPG, or SVG. Max 1 MB. Preview stays on this device and is never uploaded.</p>
                      {logoError && <p role="alert" className={errorClass}>{logoError}</p>}
                      <input ref={logoInputRef} type="file" accept="image/png,image/jpeg,image/svg+xml,.png,.jpg,.jpeg,.svg" onChange={handleLogoChange} className="sr-only" aria-label="Choose a project logo" />
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button type="button" onClick={() => logoInputRef.current?.click()} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-xs font-bold text-gold transition hover:bg-gold/10 focus:outline-none focus:ring-2 focus:ring-gold/40">
                          {logoPreview ? 'Replace logo' : 'Choose logo'} <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                        {logoPreview && <button type="button" onClick={removeLogo} className={`inline-flex min-h-10 items-center rounded-full border px-4 py-2 text-xs font-semibold transition ${isLight ? 'border-black/15 text-[#26180c]/70 hover:bg-black/5' : 'border-white/15 text-cream/70 hover:bg-white/5'}`}>Remove</button>}
                      </div>
                    </div>
                  </div>
                </div>}

                {step === 1 && <div>
                  <h4 className={`font-display text-lg font-bold ${heading}`}>Choose your chain</h4><p className={`mb-5 mt-1 text-sm ${muted}`}>Select a network and tailor the launch preview.</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {([{ id: 'BSC' as Chain, title: 'BNB Smart Chain', standard: 'BEP-20 standard', icon: Hexagon, color: '#F3BA2F', mark: 'B' }, { id: 'Solana' as Chain, title: 'Solana', standard: 'SPL token standard', icon: Zap, color: '#8BD450', mark: 'S' }]).map(option => <motion.button key={option.id} type="button" whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }} onClick={() => setChain(option.id)} className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition ${chain === option.id ? 'border-gold/60 bg-gold/10 ring-1 ring-gold/30' : isLight ? 'border-black/10 bg-white/50 hover:border-gold/40' : 'border-dark-border bg-dark-bg/30 hover:border-gold/30'}`}>
                      <div className="absolute -right-4 -top-5 h-20 w-20 rounded-full opacity-10 blur-xl transition group-hover:opacity-30" style={{ backgroundColor: option.color }} /><div className="relative flex items-center justify-between"><span className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl border" style={{ color: option.color, backgroundColor: `${option.color}15`, borderColor: `${option.color}40` }}><option.icon className="h-5 w-5" /></span><span><span className={`block font-display font-bold ${heading}`}>{option.title}</span><span className={`mt-0.5 block text-xs ${muted}`}>{option.standard}</span></span></span><span className={`rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-wider ${isLight ? 'bg-orange/10 text-orange' : 'bg-orange/15 text-orange'}`}>Coming soon</span></div>
                      <span className={`relative mt-4 flex items-center gap-1.5 text-[11px] font-semibold ${chain === option.id ? 'text-gold' : muted}`}><span className={`h-1.5 w-1.5 rounded-full ${chain === option.id ? 'bg-lime' : 'bg-current opacity-40'}`} />{chain === option.id ? 'Selected for preview' : 'Select chain'}</span>
                    </motion.button>)}
                  </div>
                  <div className={`mt-5 flex items-start gap-2 rounded-xl border p-3 text-xs ${isLight ? 'border-gold/25 bg-gold/5 text-[#5b3b0c]' : 'border-gold/20 bg-gold/5 text-cream/70'}`}><Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" />Chain selection is a local visual preview. No wallet connection or transaction is available.</div>
                  <div className={`mt-5 flex items-center justify-between gap-3 rounded-xl border p-3 ${isLight ? 'border-black/10 bg-white/45' : 'border-white/10 bg-white/[0.02]'}`}><div><p className={`text-sm font-semibold ${heading}`}>Configure launch tax</p><p className={`text-xs ${muted}`}>Optional, preview only</p></div><button type="button" role="switch" aria-checked={taxEnabled} onClick={() => setTaxEnabled(value => !value)} className={`relative h-6 w-11 shrink-0 rounded-full transition ${taxEnabled ? 'bg-gold' : isLight ? 'bg-black/15' : 'bg-white/15'}`}><span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all ${taxEnabled ? 'left-6' : 'left-1'}`} /></button></div>
                  {taxEnabled && <div className="mt-4 grid gap-4 sm:grid-cols-3"><label className={`text-xs font-semibold ${muted}`}>Buy tax (%)<input className={`${fieldClass} mt-2`} type="number" min="0" max="25" value={buyTax} onChange={event => setBuyTax(event.target.value)} />{attempted && (Number(buyTax) < 0 || Number(buyTax) > 25) && <span className={errorClass}>Use a value from 0 to 25%.</span>}</label><label className={`text-xs font-semibold ${muted}`}>Sell tax (%)<input className={`${fieldClass} mt-2`} type="number" min="0" max="25" value={sellTax} onChange={event => setSellTax(event.target.value)} />{attempted && (Number(sellTax) < 0 || Number(sellTax) > 25) && <span className={errorClass}>Use a value from 0 to 25%.</span>}</label><label className={`text-xs font-semibold ${muted}`}>Liquidity amount<span className="mt-1 block font-normal">{chain === 'BSC' ? 'BNB' : 'SOL'} · optional</span><input className={`${fieldClass} mt-2`} type="number" min="0" placeholder="Enter amount" value={liquidity} onChange={event => setLiquidity(event.target.value)} /></label></div>}
                  {!taxEnabled && <label className={`mt-4 block text-xs font-semibold ${muted}`}>Liquidity amount <span className="font-normal">({chain === 'BSC' ? 'BNB' : 'SOL'}, optional)</span><input className={`${fieldClass} mt-2`} type="number" min="0" placeholder="Enter amount for preview" value={liquidity} onChange={event => setLiquidity(event.target.value)} /></label>}
                </div>}

                {step === 2 && <div>
                  <div className="mb-5 flex items-center gap-3"><motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/20 to-orange/10 font-display text-xl font-black text-gold">{logoPreview ? <img src={logoPreview} alt="Token logo preview" className="h-full w-full object-cover" /> : (symbol.trim().charAt(0) || '?')}</motion.div><div><h4 className={`font-display text-lg font-bold ${heading}`}>{name || 'Your token'} <span className="text-gold">{symbol ? `$${symbol}` : ''}</span></h4><p className={`mt-0.5 text-xs ${muted}`}>Review your local configuration preview</p></div></div>
                  <div className={`overflow-hidden rounded-2xl border ${isLight ? 'border-black/10' : 'border-white/10'}`}>
                    {[["Token name", name || 'Not set'], ['Symbol', symbol ? `$${symbol}` : 'Not set'], ['Decimals', decimals || 'Not set'], ['Total supply', supply ? Number(supply).toLocaleString() : 'Not set'], ['Network', chain === 'BSC' ? 'BNB Smart Chain · BEP-20' : 'Solana · SPL'], ['Buy / sell tax', taxEnabled ? `${buyTax || 0}% / ${sellTax || 0}%` : 'Not enabled'], ['Liquidity preview', liquidity ? `${liquidity} ${chain === 'BSC' ? 'BNB' : 'SOL'}` : 'Not set']].map(([label, value], index) => <div key={label} className={`flex items-center justify-between gap-3 px-4 py-3 text-sm ${index % 2 === 0 ? isLight ? 'bg-black/[0.025]' : 'bg-white/[0.025]' : ''}`}><span className={muted}>{label}</span><span className={`text-right font-semibold ${heading}`}>{value}</span></div>)}
                  </div>
                  <div className={`mt-4 flex items-start gap-2 rounded-xl border p-3 text-xs ${isLight ? 'border-orange/25 bg-orange/5 text-[#783e15]' : 'border-orange/25 bg-orange/5 text-orange/90'}`}><Info className="mt-0.5 h-4 w-4 shrink-0" />Non-functional preview only. No token will be deployed and no wallet will be requested.</div>
                  <button type="button" onClick={showComingSoon} className="btn-gold mt-5 w-full justify-center" aria-label="Deploy token, launchpad coming soon"><Rocket className="h-4 w-4" /> Deploy Token <span className="rounded-full bg-black/10 px-2 py-0.5 text-[10px] font-extrabold uppercase">Coming soon</span></button>
                </div>}
              </motion.div></AnimatePresence>
            </div>
            <div className={`flex items-center justify-between border-t px-5 py-4 sm:px-7 ${isLight ? 'border-black/10' : 'border-dark-border'}`}><button type="button" onClick={previousStep} disabled={step === 0} className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-35 ${heading} ${isLight ? 'hover:bg-black/5' : 'hover:bg-white/5'}`}><ArrowLeft className="h-4 w-4" />Back</button>{step < 2 ? <button type="button" onClick={nextStep} className="btn-gold px-5 py-2.5 text-xs">{step === 0 ? 'Continue to chain' : 'Review launch'}<ArrowRight className="h-4 w-4" /></button> : <span className={`text-xs ${muted}`}>Step 3 of 3</span>}</div>
          </motion.div>

          <motion.aside initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.16 }} className="space-y-5">
            <motion.div whileHover={{ y: -3 }} className="glass-card p-5 sm:p-6"><div className="mb-4 flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold"><Coins className="h-5 w-5" /></div><div><h3 className={`font-display font-bold ${heading}`}>Deployment estimate</h3><p className={`text-xs ${muted}`}>Illustrative network gas only</p></div></div>
              <div className={`rounded-xl border p-4 ${isLight ? 'border-gold/25 bg-gold/5' : 'border-gold/20 bg-gold/5'}`}><div className="flex items-center justify-between"><p className={`text-xs font-semibold uppercase tracking-wider ${muted}`}>{chain === 'BSC' ? 'BNB Smart Chain' : 'Solana'}</p><span className="rounded-full bg-gold/10 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-gold">Estimate</span></div><p className="mt-1 font-display text-3xl font-extrabold text-gold">~{estimatedCost}</p><p className={`mt-1 text-xs leading-relaxed ${muted}`}>Static UI estimate, not a quote. Actual network costs can change; liquidity is separate.</p></div>
              <div className={`mt-3 flex items-center justify-between rounded-xl px-3 py-2.5 text-xs ${isLight ? 'bg-black/[0.03]' : 'bg-white/[0.03]'}`}><span className={muted}>Selected network</span><span className={`font-semibold ${heading}`}>{chain === 'BSC' ? 'BNB Smart Chain' : 'Solana'}</span></div>
            </motion.div>

            <div className="glass-card p-5 sm:p-6"><div className="mb-4 flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime/10 text-lime"><ShieldCheck className="h-5 w-5" /></div><div><h3 className={`font-display font-bold ${heading}`}>Launch-ready checklist</h3><p className={`text-xs ${muted}`}>Planned deployment package</p></div></div><div className="space-y-3">{[['Verified contract', 'Source verification flow'], ['LP lock ready', 'Liquidity lock configuration'], ['Ownership renounced', 'Ownership control option']].map(([title, description]) => <div key={title} className={`flex items-start gap-3 rounded-xl border p-3 ${isLight ? 'border-black/10 bg-white/40' : 'border-white/10 bg-white/[0.02]'}`}><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime/15 text-lime"><Check className="h-3 w-3" /></span><span><span className={`block text-sm font-semibold ${heading}`}>{title}</span><span className={`mt-0.5 block text-[11px] ${muted}`}>{description}</span></span><span className="ml-auto rounded-full bg-orange/10 px-2 py-1 text-[9px] font-bold uppercase text-orange">Planned</span></div>)}</div><p className={`mt-3 text-[10px] leading-relaxed ${muted}`}>Checklist items are planned features, not guarantees or active services.</p></div>

            <div className="glass-card p-5 sm:p-6"><h3 className={`mb-4 flex items-center gap-2 font-display font-bold ${heading}`}><CircleHelp className="h-4 w-4 text-gold" /> Quick answers</h3><div className="space-y-4"><div><p className={`text-sm font-semibold ${heading}`}>Can I deploy a token now?</p><p className={`mt-1 text-xs leading-relaxed ${muted}`}>Not yet. This is a UI preview only, with no wallet or contract connection.</p></div><div><p className={`text-sm font-semibold ${heading}`}>What does the estimate include?</p><p className={`mt-1 text-xs leading-relaxed ${muted}`}>A static, illustrative network gas estimate. It is not live pricing or a final fee quote.</p></div></div></div>
          </motion.aside>
        </div>
      </div>
      <AnimatePresence>{toast && <motion.div role="status" aria-live="polite" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} className={`fixed bottom-5 left-1/2 z-[70] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center gap-3 rounded-2xl border px-4 py-3 shadow-2xl ${isLight ? 'border-gold/30 bg-white text-[#26180c]' : 'border-gold/30 bg-dark-card text-cream'}`}><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold"><Check className="h-4 w-4" /></span><span className="text-sm font-semibold">Launchpad coming soon. Join the Telegram for early access.</span></motion.div>}</AnimatePresence>
    </section>
  )
}
