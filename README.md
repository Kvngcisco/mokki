# MOKKI DAO Website

Production-ready, animated, responsive Web3 website for MOKKI DAO ($MOKKI) on BNB Smart Chain.

## Tech Stack

- **Vite + React 18 + TypeScript**
- **Tailwind CSS** — design system via CSS variables
- **Framer Motion** — all animations
- **Recharts** — tokenomics donut chart
- **react-hot-toast** — notifications
- **react-helmet-async** — SEO

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy env file
cp .env.example .env

# 3. Add your logo/mascot images
# Place mokki-logo.png and mokki-logo2.png in public/assets/

# 4. Start dev server
npm run dev

# 5. Build for production
npm run build
```

## Updating Project Data

All project data lives in **`src/config.ts`** — one file to rule them all.

| What to update | Where in config.ts |
|---|---|
| Contract address, tax, supply | `TOKEN` object |
| Tokenomics chart | `TOKENOMICS.allocations` |
| Roadmap milestones | `ROADMAP` array |
| Social links | `SOCIALS` object |
| FAQ | `FAQ` array |
| Staking APRs | `STAKING.lockPeriods` |
| Enable staking | `STAKING.enabled = true` |
| DAO Snapshot link | `DAO.snapshotUrl` |
| Audit/lock proof | `TRUST.auditUrl`, `TOKENOMICS.liquidityLock` |

## Deploying

### Vercel (recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag the dist/ folder into Netlify UI
# Or: netlify deploy --prod --dir=dist
```

### Cloudflare Pages
Connect your GitHub repo in the Cloudflare Pages dashboard.
Build command: `npm run build`
Output directory: `dist`

## Adding the Logo

Place `mokki-logo.png` in `/public/assets/` — this is used everywhere (navbar, hero, footer, about, loading screen, meme gallery). One image, used consistently throughout.

## Adding Memes

Drop images into `/public/memes/` and update the `PLACEHOLDER_MEMES` array in `src/sections/MemeGallery.tsx`.

## Environment Variables

See `.env.example`. Add your BscScan API key for holder count data.

## What's Live vs Placeholder

| Feature | Status |
|---|---|
| Hero, about, tokenomics | ✅ Live |
| Market data (DexScreener) | ✅ Live (auto-refresh) |
| Live chart embed | ✅ Live |
| How to buy | ✅ Live |
| Roadmap | ✅ Placeholder — update in config.ts |
| Tokenomics chart | ⚠️ Placeholder allocations — confirm real split |
| Staking | ⏳ Coming soon mode (disabled) |
| DAO governance | ⏳ Coming soon (Snapshot link TBD) |
| Meme gallery | ⚠️ Using logo as placeholder — add real memes |
| Liquidity lock proof | ⏳ Not yet provided |
| Audit report | ⏳ Not yet provided |
