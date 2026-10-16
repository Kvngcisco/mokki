# MOKKI DAO — Missing Info Checklist

Update `src/config.ts` with any of the items below when ready.

## ✅ Confirmed
- [x] Project name: MOKKI DAO
- [x] Ticker: $MOKKI
- [x] Contract: 0x26B9fe87c94ce0535b7B5f4f4Dda03480Fa98B39
- [x] Chain: BSC (56)
- [x] Supply: 1,000,000,000
- [x] Decimals: 18
- [x] Tax: 0/0
- [x] Ownership renounced: YES
- [x] Launch platform: PancakeSwap
- [x] Twitter: https://x.com/mokkicoin
- [x] Telegram: https://t.me/mokkidaocoin

## ⏳ Pending — add to src/config.ts when ready

### Identity
- [ ] Official website domain (currently: `mokkidao.com` — confirm or update)
- [ ] Official launch date

### Token
- [ ] Main trading pair address (MOKKI/BNB or MOKKI/BUSD) — add to `TOKEN.tradingPairAddress`
- [ ] Circulating supply — add to `TOKEN.circulatingSupply`

### Tokenomics
- [ ] Real allocation split (liquidity %, community %, marketing %, team %, treasury %)
  - Currently using placeholder: 40% liquidity, 30% community, 20% marketing, 10% treasury
- [ ] Liquidity lock: locked? platform? unlock date? proof URL?
  - Add to `TOKENOMICS.liquidityLock`
- [ ] Burn mechanism details — add to `TOKENOMICS.burnDetails`

### Trust & Safety
- [ ] Audit report URL (or confirm "none yet") — add to `TRUST.auditUrl`
- [ ] Auditor name — add to `TRUST.auditor`

### Team
- [ ] If team members become public: names, roles, photos, social links

### Roadmap
- [ ] Review/update the 4-phase roadmap milestones in `ROADMAP` array
- [ ] Update statuses: `'completed' | 'in-progress' | 'planned'`

### DAO
- [ ] Snapshot.org space URL — add to `DAO.snapshotUrl`

### Community / Socials
- [ ] Discord server URL — add to `SOCIALS.discord`
- [ ] TikTok URL — add to `SOCIALS.tiktok`
- [ ] YouTube channel — add to `SOCIALS.youtube`
- [ ] GitHub org URL — add to `SOCIALS.github`

### Assets
- [ ] Place `mokki-logo.png` in `/public/assets/` (main logo, white bg)
- [ ] Place `mokki-logo2.png` in `/public/assets/` (gold swirl variant)
- [ ] Add real meme images to `/public/memes/`

### Technical
- [ ] BscScan API key → add as `VITE_BSCSCAN_API_KEY` in `.env`
- [ ] Preferred hosting: Vercel / Netlify / Cloudflare?
- [ ] Custom domain confirmed?
- [ ] Analytics: Plausible / Google Analytics ID?

### Staking (Phase 2)
- [ ] Staking contract address — set `STAKING.enabled = true` and add address
- [ ] Real APR tiers
- [ ] Minimum stake amount
