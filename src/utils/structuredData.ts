import { contactConfig } from '../config/contact'
import { siteConfig } from '../config/site'

// No local-business claim is emitted until the official location and domain are supplied.
export function getLocalBusinessData() {
  if (!siteConfig.siteUrl || !contactConfig.address) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    telephone: contactConfig.whatsapp.display,
    address: contactConfig.address,
    image: `${siteConfig.siteUrl}/images/hero-garden-1600.jpg`,
    ...(contactConfig.instagram ? { sameAs: [contactConfig.instagram] } : {}),
  }
}
