import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import MarqueeTicker from './components/MarqueeTicker'
import SectionDivider from './components/SectionDivider'
import Hero from './sections/Hero'
import MarketStats from './sections/MarketStats'
import About from './sections/About'
import Tokenomics from './sections/Tokenomics'
import HowToBuy from './sections/HowToBuy'
import Staking from './sections/Staking'
import DAO from './sections/DAO'
import Safety from './sections/Safety'
import Roadmap from './sections/Roadmap'
import MemeGallery from './sections/MemeGallery'
import Team from './sections/Team'
import Community from './sections/Community'
import FAQ from './sections/FAQ'
import Footer from './sections/Footer'
import { PROJECT, TOKEN, SOCIALS } from './config'
import { ASSETS } from './assets'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <Helmet>
        <title>{PROJECT.name} — {PROJECT.tagline}</title>
        <meta name="description" content={PROJECT.shortDescription} />
        <meta property="og:title" content={`${PROJECT.name} (${PROJECT.ticker})`} />
        <meta property="og:description" content={PROJECT.tagline} />
        <meta property="og:url" content={`https://${PROJECT.domain}`} />
        <meta property="og:image" content={`https://${PROJECT.domain}/assets/logo-full.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@mokkicoin" />
        <link rel="canonical" href={`https://${PROJECT.domain}`} />
        <link rel="icon" type="image/png" href={ASSETS.logoIcon} />
        <link rel="apple-touch-icon" href={ASSETS.logoIcon} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: PROJECT.name,
          url: `https://${PROJECT.domain}`,
          logo: `https://${PROJECT.domain}${ASSETS.logoIcon}`,
          description: PROJECT.shortDescription,
          sameAs: [
            SOCIALS.twitter,
            SOCIALS.telegram,
            TOKEN.bscScanUrl,
          ].filter(Boolean),
        })}</script>
      </Helmet>

      <LoadingScreen onComplete={() => setLoaded(true)} />

      {loaded && (
        <div className="relative z-10 min-h-screen">
          <Navbar />
          <MarqueeTicker />

          <main>
            <Hero />
            <SectionDivider />
            <MarketStats />
            <SectionDivider />
            <About />
            <SectionDivider />
            <Tokenomics />
            <SectionDivider />
            <HowToBuy />
            <SectionDivider />
            <Staking />
            <SectionDivider />
            <DAO />
            <SectionDivider />
            <Safety />
            <SectionDivider />
            <Roadmap />
            <SectionDivider />
            <MemeGallery />
            <SectionDivider />
            <Team />
            <SectionDivider />
            <Community />
            <SectionDivider />
            <FAQ />
          </main>

          <Footer />
        </div>
      )}
    </>
  )
}
