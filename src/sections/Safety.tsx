import { motion } from 'framer-motion'
import { AlertTriangle, Shield, Lock, CheckCircle, ExternalLink, XCircle } from 'lucide-react'
import { TRUST, TOKEN, TOKENOMICS } from '../config'

export default function Safety() {
  return (
    <section id="safety" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Red warning banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 p-5 rounded-2xl bg-pink/10 border border-pink/40 flex gap-4"
        >
          <AlertTriangle className="w-6 h-6 text-pink flex-shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-sm">
            <p className="font-bold text-pink text-base">⚠️ Beware of Fake Tokens & Scams</p>
            <p className="text-cream/70">Only trust the contract address shown on this website. Admins will <strong>never</strong> DM you first. Never share your seed phrase or private key with anyone — no legitimate project will ever ask for it.</p>
            <p className="text-cream/70">Official CA: <span className="font-mono text-cream">{TOKEN.contractAddress}</span></p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="tag mb-4 inline-flex">Trust & Safety</span>
          <h2 className="section-title">Safety & Verification</h2>
          <p className="text-cream/60 mt-3 max-w-xl mx-auto">
            Do your own research. Here are all the tools to verify $MOKKI yourself.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Scanner links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-gold" />
              <h3 className="font-display font-bold text-base text-cream">Verify the Contract</h3>
            </div>
            <div className="space-y-3">
              {TRUST.scannerLinks.map(link => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-dark-border hover:border-gold/40 hover:bg-gold/5 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-gold" />
                    </div>
                    <span className="text-sm font-medium text-cream group-hover:text-gold transition-colors">
                      {link.name}
                    </span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-cream/30 group-hover:text-gold transition-colors" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contract checklist */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-lime" />
              <h3 className="font-display font-bold text-base text-cream">Contract Checklist</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Ownership Renounced', status: true, note: 'Verified on BscScan' },
                { label: 'No Mint Function', status: true, note: 'Cannot create new tokens' },
                { label: 'No Hidden Fees', status: true, note: '0/0 tax confirmed' },
                { label: 'Source Code Verified', status: true, note: 'Open source on BscScan' },
                { label: 'Audit Report', status: null, note: 'Not yet available' },
                { label: 'Liquidity Locked', status: TOKENOMICS.liquidityLock.locked, note: TOKENOMICS.liquidityLock.locked ? `${TOKENOMICS.liquidityLock.platform}` : 'Not yet available' },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-3 py-2 border-b border-dark-border last:border-0">
                  {item.status === true
                    ? <CheckCircle className="w-4 h-4 text-lime flex-shrink-0 mt-0.5" />
                    : item.status === false
                    ? <XCircle className="w-4 h-4 text-pink flex-shrink-0 mt-0.5" />
                    : <div className="w-4 h-4 rounded-full border-2 border-cream/30 flex-shrink-0 mt-0.5" />
                  }
                  <div>
                    <p className="text-sm text-cream">{item.label}</p>
                    <p className="text-xs text-cream/40">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Audit card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-blue-400" />
              <h3 className="font-display font-bold text-base text-cream">Security Audit</h3>
            </div>
            {TRUST.auditUrl ? (
              <a href={TRUST.auditUrl} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm">
                View Audit Report <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <div className="p-3 rounded-xl bg-dark-border/30 text-sm text-cream/50">
                Audit report not yet available. We are committed to getting the contract audited before major utility launches.
              </div>
            )}
          </motion.div>

          {/* Liquidity lock card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <Lock className="w-5 h-5 text-gold" />
              <h3 className="font-display font-bold text-base text-cream">Liquidity Lock</h3>
            </div>
            {TOKENOMICS.liquidityLock.locked ? (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-cream/50">Platform</span>
                  <span className="text-cream">{TOKENOMICS.liquidityLock.platform}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream/50">Unlock Date</span>
                  <span className="text-cream">{TOKENOMICS.liquidityLock.unlockDate}</span>
                </div>
                {TOKENOMICS.liquidityLock.proofUrl && (
                  <a href={TOKENOMICS.liquidityLock.proofUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gold text-xs mt-2 hover:text-orange transition-colors">
                    View lock proof <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-dark-border/30 text-sm text-cream/50">
                Liquidity lock details not yet available. Always verify liquidity on DexScreener.
              </div>
            )}
          </motion.div>
        </div>

        {/* Transparency statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 p-5 rounded-2xl border border-dark-border bg-dark-card/50 text-sm text-cream/60 text-center"
        >
          {TRUST.transparencyStatement}
        </motion.div>
      </div>
    </section>
  )
}
