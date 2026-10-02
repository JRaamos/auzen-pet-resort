import styled from 'styled-components'
import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { WhatsAppButton } from './components/WhatsAppButton'
import { About } from './sections/About'
import { Differentials } from './sections/Differentials'
import { Experience } from './sections/Experience'
import { Faq } from './sections/Faq'
import { FinalCTA } from './sections/FinalCTA'
import { Gallery } from './sections/Gallery'
import { Hero } from './sections/Hero'
import { Services } from './sections/Services'
import { Space } from './sections/Space'
import { Testimonials } from './sections/Testimonials'
import { getLocalBusinessData } from './utils/structuredData'
import { Container } from './components/Container'
import { siteConfig } from './config/site'
import { HomeNews } from './sections/HomeNews'

const BookingPage = lazy(() =>
  import('./pages/BookingPage').then((module) => ({
    default: module.BookingPage,
  })),
)
const AboutPage = lazy(() =>
  import('./pages/ContentPages').then((module) => ({
    default: module.AboutPage,
  })),
)
const ContactPage = lazy(() =>
  import('./pages/ContentPages').then((module) => ({
    default: module.ContactPage,
  })),
)
const InformationPage = lazy(() =>
  import('./pages/ContentPages').then((module) => ({
    default: module.InformationPage,
  })),
)
const NotFoundPage = lazy(() =>
  import('./pages/ContentPages').then((module) => ({
    default: module.NotFoundPage,
  })),
)
const PromotionsPage = lazy(() =>
  import('./pages/ContentPages').then((module) => ({
    default: module.PromotionsPage,
  })),
)
const ServicesPage = lazy(() =>
  import('./pages/ContentPages').then((module) => ({
    default: module.ServicesPage,
  })),
)
const SpacePage = lazy(() =>
  import('./pages/ContentPages').then((module) => ({
    default: module.SpacePage,
  })),
)

const SkipLink = styled.a`
  position: fixed;
  z-index: 200;
  top: 0.75rem;
  left: 0.75rem;
  padding: 0.75rem 1rem;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.terracottaDark};
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 0.8rem;
  font-weight: 700;
  transform: translateY(-150%);
  transition: transform ${({ theme }) => theme.transitions.fast};

  &:focus {
    transform: translateY(0);
  }
`

const pageNames: Record<string, string> = {
  '/': 'Hotel e creche para cães em Lauro de Freitas',
  '/quem-somos': 'Quem somos',
  '/servicos': 'Serviços, horários e valores',
  '/promocoes': 'Promoções',
  '/espaco': 'Nosso espaço e galeria',
  '/contato': 'Contato e localização',
  '/informacoes': 'Orientações antes da estadia',
  '/reservar': 'Solicitar reserva',
}
function HomePage() {
  return (
    <>
      <Hero />
      <HomeNews />
      <About />
      <Services />
      <Space />
      <Experience />
      <Differentials />
      <Gallery />
      <Testimonials />
      <Faq />
      <FinalCTA />
    </>
  )
}

function App() {
  const location = useLocation()
  useEffect(() => {
    const title = `Auzen Pet Resort | ${pageNames[location.pathname] || 'Página não encontrada'}`
    document.title = title
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute('content', title)
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', siteConfig.description)
    let canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    )
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = `${siteConfig.siteUrl}${location.pathname}`
    document
      .querySelector('meta[property="og:url"]')
      ?.setAttribute('content', canonical.href)
    const frame = requestAnimationFrame(() => {
      if (location.hash)
        document.getElementById(location.hash.slice(1))?.scrollIntoView()
      else {
        window.scrollTo({ top: 0, behavior: 'instant' })
        document
          .querySelector<HTMLElement>('main h1')
          ?.focus({ preventScroll: true })
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [location.pathname, location.hash])
  const structuredData = getLocalBusinessData()
  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
          }}
        />
      )}
      <SkipLink href="#main-content">Pular para o conteúdo</SkipLink>
      <Header />
      <main id="main-content">
        <Suspense
          fallback={
            <Container style={{ paddingBlock: '8rem' }} role="status">
              Preparando seu próximo passeio…
            </Container>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quem-somos" element={<AboutPage />} />
            <Route path="/servicos" element={<ServicesPage />} />
            <Route path="/promocoes" element={<PromotionsPage />} />
            <Route path="/espaco" element={<SpacePage />} />
            <Route path="/contato" element={<ContactPage />} />
            <Route path="/informacoes" element={<InformationPage />} />
            <Route
              path="/reservar"
              element={<BookingPage key={location.search} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default App
