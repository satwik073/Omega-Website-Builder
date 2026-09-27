/**
 * Photography for the marketing page.
 *
 * All images are served from the Unsplash CDN under the Unsplash License
 * (free for commercial use, no attribution required — credited here anyway).
 * Only standard-licence photos are used; nothing from Unsplash+.
 *
 * `img()` builds a CDN URL at an exact crop, so each slot gets the aspect
 * ratio the layout expects rather than a resized original.
 */

const BASE = 'https://images.unsplash.com/'

export const img = (
  file: string,
  w: number,
  h: number,
  /**
   * Crop bias — `entropy` for scenes, `faces` for portraits, `center` for a
   * single centred subject (the sculptural renders), where entropy tends to
   * wander off the object and into a background corner.
   */
  crop: 'entropy' | 'faces' | 'edges' | 'center' = 'entropy'
) =>
  `${BASE}${file}?auto=format&fit=crop${
    crop === 'center' ? '' : `&crop=${crop}`
  }&w=${w}&h=${h}&q=80`

/* Hero banner — Luke Jones, "a group of glass blocks". 5760x3240. */
export const HERO = 'photo-1673861561475-e0415df68554'

/* Work cards, cropped to the 0.797 portrait the grid uses. */
export const WORK: Record<string, string> = {
  // Thom Bradley — clothing racks, neutral tones
  Meridian: 'photo-1603400521630-9f2de124b33b',
  // luthfi alfarizi — iridescent glass sculpture, echoes the hero banner
  Aperture: 'photo-1741277938635-dd700ca5fcde',
  // Alexander Andrews — black DSLR, low key
  Lumen: 'photo-1503043259787-e75660c42572',
  // Ela De Pure — minimal product still life
  Season: 'photo-1778451510207-24f1e204f465',
  // JC Gellidon — street portrait with skateboard
  Axis: 'photo-1721637635502-b0abaaa75edb',
  // Hans — black laptop on a desk
  Nova: 'photo-1626868713255-cb0c4640a529',
}

/* Testimonial portraits, cropped square on faces. */
export const FACES: Record<string, string> = {
  // Jurica Koletić
  'Daniel Carter': 'photo-1500648767791-00dcc994a43e',
  // Andrew Neel
  'Maya Lindqvist': 'photo-1648905252677-6c0d8c1251e6',
  // Mike van den Bos
  'Marcus Rivera': 'photo-1619011940610-eda7c2ab3477',
}

/* Article cards, 408x268. */
export const POSTS: Record<string, string> = {
  // Balázs Kétyi — a design system on a monitor
  'Why Great UI/UX Starts with Strategy': 'photo-1558655146-d09347e92766',
  // Martin Péchy — Helvetica specimen poster
  'Designing Brands for the Digital-First Era': 'photo-1543487945-139a97f387d5',
  // Florian Olivo — lines of markup
  'Building Websites That Convert and Scale': 'photo-1542831371-29b0f74f9713',
}

/* Services column — white/neutral sculptural forms, one per panel. */
export const SERVICE_ART: string[] = [
  'photo-1739346070480-ed95076f7bd3', // white curved form with a sphere
  'photo-1623150502742-6a849aa94be4', // white organic form
  'photo-1636306950045-4dbb10b7e0f4', // overlapping beige shells
  'photo-1658134203445-ed08f94294ce', // white curved layers
  'photo-1655012325191-cbc22182fa9f', // cream torus on a podium
]

/* Dark chrome spheres behind the closing CTA. */
export const CTA_ART = 'photo-1695376425475-1b6b561f8e4e'

/* Reel surface — black abstract curves. */
export const REEL_ART = 'photo-1707730376818-a7a02fe896d5'
