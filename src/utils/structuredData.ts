import { contactConfig } from '../config/contact'
import { siteConfig } from '../config/site'
import { serviceDetails } from '../data/services'
import { faqItems } from '../data/faq'
import { getGuide } from '../data/guides'
import { pageMetadata } from '../config/seo'

// No local-business claim is emitted until the official location and domain are supplied.
export function getLocalBusinessData(path = '/') {
  if (!siteConfig.siteUrl || !contactConfig.address) return null
  const business = {
    '@type': 'LocalBusiness',
    '@id': `${siteConfig.siteUrl}/#business`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    telephone: `+${contactConfig.whatsapp.digits}`,
    address: { '@type': 'PostalAddress', streetAddress: 'Rua da Jurema, Quingoma de Fora', addressLocality: 'Lauro de Freitas', addressRegion: 'BA', postalCode: contactConfig.postalCode, addressCountry: 'BR' },
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '07:00', closes: '17:00' }],
    image: `${siteConfig.siteUrl}/images/hero-garden-1600.jpg`,
    ...(contactConfig.instagram ? { sameAs: [contactConfig.instagram] } : {}),
  }
  const service = path === '/hotel' ? serviceDetails.hotel : path === '/creche' ? serviceDetails.daycare : null
  const faqs = service?.faqs || (path === '/' || path === '/informacoes' ? faqItems : null)
  const guide = getGuide(path)
  const url = `${siteConfig.siteUrl}${path}`
  const trail = guide ? [{ name: 'Início', item: `${siteConfig.siteUrl}/` }, { name: 'Guias', item: `${siteConfig.siteUrl}/guias` }, { name: guide.title, item: url }] : path === '/guias' ? [{ name: 'Início', item: `${siteConfig.siteUrl}/` }, { name: 'Guias', item: url }] : []
  return {
    '@context': 'https://schema.org',
    '@graph': [business,
      { '@type': 'WebSite', '@id': `${siteConfig.siteUrl}/#website`, url: siteConfig.siteUrl, name: siteConfig.name, inLanguage: 'pt-BR', publisher: { '@id': business['@id'] } },
      ...(pageMetadata[path] ? [{ '@type': 'WebPage', '@id': `${url}#webpage`, url, name: pageMetadata[path].title, description: pageMetadata[path].description, inLanguage: 'pt-BR', isPartOf: { '@id': `${siteConfig.siteUrl}/#website` } }] : []),
      ...(trail.length ? [{ '@type': 'BreadcrumbList', itemListElement: trail.map((item, index) => ({ '@type': 'ListItem', position: index + 1, ...item })) }] : []),
      ...(guide ? [{ '@type': 'Article', '@id': `${url}#article`, headline: guide.title, description: guide.description, image: `${siteConfig.siteUrl}/images/${guide.image}-900.jpg`, inLanguage: 'pt-BR', mainEntityOfPage: { '@id': `${url}#webpage` }, author: { '@id': business['@id'] }, publisher: { '@id': business['@id'] } }] : []),
      ...(service ? [{ '@type': 'Service', '@id': `${siteConfig.siteUrl}${path}#service`, name: service.name, description: service.intro, url: `${siteConfig.siteUrl}${path}`, provider: { '@id': business['@id'] }, areaServed: { '@type': 'City', name: 'Lauro de Freitas' } }] : []),
      ...(faqs ? [{ '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) }] : []),
    ],
  }
}
