import styled from 'styled-components'
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

function App() {
  const structuredData = getLocalBusinessData()
  return (
    <>
      {structuredData && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />}
      <SkipLink href="#main-content">Pular para o conteúdo</SkipLink>
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <Space />
        <Experience />
        <Differentials />
        <Gallery />
        <Testimonials />
        <Faq />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default App
