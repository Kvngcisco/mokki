/**
 * MOKKI DAO — Centralized asset paths
 * Change image filenames here and they update everywhere.
 */

export const ASSETS = {
  /**
   * Mascot only — transparent PNG, no background, no text.
   * Used in: Hero, About, DAO, Team, Community, LoadingScreen
   */
  mascot: '/assets/mascot.png',

  /**
   * Logo icon — coin + mascot, no text, transparent PNG.
   * Used in: Navbar (40px), Footer (40px), HowToBuy badge
   */
  logoIcon: '/assets/logo-icon.png',

  /**
   * Logo full — coin + mascot + MOKKI lettering, transparent PNG.
   * Used in: OG image, brand lockups
   */
  logoFull: '/assets/logo-full.png',

  /**
   * Logo full light variant — use on cream/light backgrounds.
   * Falls back to logoFull if file doesn't exist.
   */
  logoFullLight: '/assets/logo-full-light.png',

  /**
   * Open Graph / Twitter card (1200×630).
   * Generated or supplied separately.
   */
  ogImage: '/assets/og-image.png',
} as const
