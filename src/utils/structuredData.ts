import { contactConfig } from '../config/contact'
import { siteConfig } from '../config/site'
import { serviceDetails } from '../data/services'
import { faqItems } from '../data/faq'

// No local-business claim is emitted until the official location and domain are supplied.
export function getLocalBusinessData(path = '/') {
  if (!siteConfig.siteUrl || !contactConfig.address) return null
  const business = {
    '@type': 'LocalBusiness',
    '@id': `${siteConfig.siteUrl}/#business`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    telephone: contactConfig.whatsapp.display,
    address: { '@type': 'PostalAddress', streetAddress: 'Rua da Jurema, Quingoma de Fora', addressLocality: 'Lauro de Freitas', addressRegion: 'BA', addressCountry: 'BR' },
    image: `${siteConfig.siteUrl}/images/hero-garden-1600.jpg`,
    ...(contactConfig.instagram ? { sameAs: [contactConfig.instagram] } : {}),
  }
  const service = path === '/hotel' ? serviceDetails.hotel : path === '/creche' ? serviceDetails.daycare : null
  const faqs = service?.faqs || (path === '/' || path === '/informacoes' ? faqItems : null)
  return {
    '@context': 'https://schema.org',
    '@graph': [business,
      ...(service ? [{ '@type': 'Service', '@id': `${siteConfig.siteUrl}${path}#service`, name: service.name, description: service.intro, url: `${siteConfig.siteUrl}${path}`, provider: { '@id': business['@id'] }, areaServed: { '@type': 'City', name: 'Lauro de Freitas' } }] : []),
      ...(faqs ? [{ '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) }] : []),
    ],
  }
}
