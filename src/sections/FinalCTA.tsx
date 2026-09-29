import { ArrowUpRight, MessageCircle } from 'lucide-react'
import styled from 'styled-components'
import { ButtonLink } from '../components/Button'
import { Container } from '../components/Container'
import { ResponsiveImage } from '../components/ResponsiveImage'
import { Reveal } from '../components/Reveal'
import { createWhatsAppUrl } from '../config/contact'
import { trackEvent } from '../utils/analytics'

const Shell = styled.section`
  position: relative;
  min-height: min(80svh, 52rem);
  overflow: hidden;
  color: ${({ theme }) => theme.colors.warmWhite};
  background: ${({ theme }) => theme.colors.forest};
  isolation: isolate;
`

const Background = styled.div`
  position: absolute;
  z-index: -2;
  inset: 0;

  &::after {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, rgba(17, 48, 38, 0.94), rgba(17, 48, 38, 0.58) 58%, rgba(17, 48, 38, 0.28)),
      linear-gradient(0deg, rgba(17, 48, 38, 0.72), transparent 50%);
    content: '';
  }

  picture,
  img {
    width: 100%;
    height: 100%;
  }

  img {
    object-fit: cover;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    img {
      object-position: 43% 50%;
    }

    &::after {
      background: linear-gradient(0deg, rgba(17, 48, 38, 0.96), rgba(17, 48, 38, 0.38));
    }
  }
`

const Content = styled(Container)`
  display: flex;
  min-height: min(80svh, 52rem);
  flex-direction: column;
  justify-content: center;
  padding-top: 6rem;
  padding-bottom: 6rem;
`

const Eyebrow = styled.p`
  margin-bottom: 1.1rem;
  color: ${({ theme }) => theme.colors.sand};
  font-size: 0.72rem;
  font-weight: 750;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`

const Title = styled.h2`
  max-width: 11ch;
  margin-bottom: 1.8rem;
  font-family: ${({ theme }) => theme.typography.display};
  font-size: clamp(3.3rem, 8vw, 7rem);
  font-weight: 420;
  letter-spacing: -0.055em;
  line-height: 0.9;
`

const FinalLink = styled(ButtonLink)`
  align-self: flex-start;
`

const CornerNote = styled.div`
  position: absolute;
  right: clamp(1.5rem, 5vw, 5rem);
  bottom: clamp(1.5rem, 4vw, 3rem);
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.74rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`

export function FinalCTA() {
  return (
    <Shell id="contato">
      <Background>
        <ResponsiveImage
          base="two-dogs"
          alt="Dois cães juntos no gramado do Auzen"
          width={1600}
          height={900}
          maxWidth={1600}
          sizes="100vw"
          objectPosition="50% 45%"
        />
      </Background>
      <Content>
        <Reveal>
          <Eyebrow>Vamos conversar?</Eyebrow>
          <Title>O próximo passeio começa com um oi.</Title>
          <FinalLink
            href={createWhatsAppUrl('general')}
            target="_blank"
            rel="noreferrer"
            variant="light"
            onClick={() => trackEvent('whatsapp_click', 'final_cta')}
          >
            <MessageCircle size={18} aria-hidden="true" /> Chamar o Auzen no WhatsApp
          </FinalLink>
        </Reveal>
      </Content>
      <CornerNote>
        Hotel + Creche para cães <ArrowUpRight size={15} aria-hidden="true" />
      </CornerNote>
    </Shell>
  )
}
