export const siteConfig = {
  name: 'Auzen Pet Resort',
  shortName: 'Auzen',
  description: 'Hotel e creche para cães em um espaço aberto, verde e acolhedor.',
  siteUrl: import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') || null,
} as const
