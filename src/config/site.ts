export const siteConfig = {
  name: 'Auzen Pet Resort',
  shortName: 'Auzen',
  description:
    'Hotel, creche e transporte para cães em Lauro de Freitas. Natureza, acolhimento e carinho em cada estadia.',
  siteUrl:
    import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') ||
    'https://auzen-pet-resort.vercel.app',
} as const
