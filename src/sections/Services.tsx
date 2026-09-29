import { ArrowUpRight } from 'lucide-react'
import styled from 'styled-components'
import { ButtonLink } from '../components/Button'
import { Container } from '../components/Container'
import { ResponsiveImage } from '../components/ResponsiveImage'
import { Reveal } from '../components/Reveal'
import { createWhatsAppUrl } from '../config/contact'
import { trackEvent } from '../utils/analytics'

const ServicesShell = styled.section`
  padding: ${({ theme }) => theme.spacing.section} 0;
  color: ${({ theme }) => theme.colors.warmWhite};
  background: ${({ theme }) => theme.colors.forest};
`

const ServicesIntro = styled(Container)`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: clamp(3rem, 7vw, 6rem);

  p {
    max-width: 26rem;
    margin-bottom: 0;
    color: rgba(255, 255, 255, 0.62);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    align-items: flex-start;
    flex-direction: column;
  }
`

const IntroTitle = styled.h2`
  max-width: 12ch;
  margin-bottom: 0;
  font-family: ${({ theme }) => theme.typography.display};
  font-size: clamp(3rem, 7vw, 6rem);
  font-weight: 430;
  letter-spacing: -0.05em;
  line-height: 0.93;
`

const Service = styled.article<{ $reverse?: boolean }>`
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(18rem, 0.85fr);
  align-items: stretch;
  border-top: 1px solid ${({ theme }) => theme.colors.lightLine};

  > :first-child {
    order: ${({ $reverse }) => ($reverse ? 2 : 1)};
  }

  > :last-child {
    order: ${({ $reverse }) => ($reverse ? 1 : 2)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;

    > :first-child,
    > :last-child {
      order: initial;
    }
  }
`

const ServiceImage = styled.div`
  position: relative;
  height: clamp(30rem, 54vw, 47rem);
  overflow: hidden;

  &::after {
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, rgba(20, 48, 39, 0.38), transparent 50%);
    content: '';
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: min(120vw, 38rem);
    border-radius: ${({ theme }) => theme.radius.lg};
  }
`

const ServiceCopy = styled.div`
  position: relative;
  display: flex;
  min-height: 36rem;
  flex-direction: column;
  justify-content: center;
  padding: clamp(2rem, 4vw, 4rem);
  overflow: hidden;

  &::before {
    position: absolute;
    top: -0.2em;
    right: -0.05em;
    color: rgba(255, 255, 255, 0.035);
    font-family: ${({ theme }) => theme.typography.display};
    font-size: clamp(11rem, 23vw, 22rem);
    line-height: 1;
    content: attr(data-number);
    pointer-events: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: auto;
    padding-inline: 0;
  }
`

const Label = styled.span`
  position: relative;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.terracottaLight};
  font-size: 0.72rem;
  font-weight: 750;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`

const ServiceTitle = styled.h3`
  position: relative;
  max-width: 13ch;
  margin-bottom: 1.35rem;
  font-family: ${({ theme }) => theme.typography.display};
  font-size: clamp(2.7rem, 4.6vw, 4.5rem);
  font-weight: 420;
  letter-spacing: -0.05em;
  line-height: 0.95;
`

const ServiceText = styled.p`
  position: relative;
  max-width: 30rem;
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.68);
`

const Keywords = styled.p`
  position: relative;
  padding: 1rem 0;
  margin-bottom: 1.8rem;
  color: ${({ theme }) => theme.colors.sand};
  border-top: 1px solid ${({ theme }) => theme.colors.lightLine};
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightLine};
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`

const StyledTextButton = styled(ButtonLink)`
  align-self: flex-start;
  color: ${({ theme }) => theme.colors.terracottaLight};
  &:hover { color: ${({ theme }) => theme.colors.white}; }
`

export function Services() {
  return (
    <ServicesShell aria-labelledby="services-title">
      <ServicesIntro>
        <Reveal>
          <IntroTitle id="services-title">Dois jeitos de viver o Auzen.</IntroTitle>
        </Reveal>
        <Reveal delay={0.12}>
          <p>Para passar o dia ou ficar por mais tempo, a conversa começa entendendo o que você e seu cão precisam.</p>
        </Reveal>
      </ServicesIntro>
      <Container>
        <Service id="hotel">
          <Reveal>
            <ServiceImage>
              <ResponsiveImage
                base="hotel-rest"
                alt="Cão descansando em uma área coberta do Auzen"
                width={900}
                height={1600}
                maxWidth={900}
                sizes="(max-width: 800px) 90vw, 55vw"
                objectPosition="50% 50%"
              />
            </ServiceImage>
          </Reveal>
          <ServiceCopy data-number="01">
            <Reveal delay={0.08}>
              <Label>Hotel</Label>
              <ServiceTitle>Uma estadia com clima de casa.</ServiceTitle>
              <ServiceText>
                Para viagens, compromissos ou períodos de ausência: um lugar acolhedor, com natureza por perto, para o seu cão ficar.
              </ServiceText>
              <Keywords>Hospedagem · períodos de ausência · ambiente acolhedor</Keywords>
              <StyledTextButton
                href={createWhatsAppUrl('hotel')}
                target="_blank"
                rel="noreferrer"
                variant="text"
                onClick={() => trackEvent('whatsapp_click', 'hotel')}
              >
                Consultar hospedagem <ArrowUpRight size={17} aria-hidden="true" />
              </StyledTextButton>
            </Reveal>
          </ServiceCopy>
        </Service>
        <Service id="creche" $reverse>
          <Reveal>
            <ServiceImage>
              <ResponsiveImage
                base="daycare-play"
                alt="Dois cães explorando juntos o gramado do Auzen"
                width={900}
                height={1600}
                maxWidth={900}
                sizes="(max-width: 800px) 90vw, 55vw"
                objectPosition="50% 52%"
              />
            </ServiceImage>
          </Reveal>
          <ServiceCopy data-number="02">
            <Reveal delay={0.08}>
              <Label>Creche · Day Care</Label>
              <ServiceTitle>Um dia com mais quintal.</ServiceTitle>
              <ServiceText>
                Um ambiente ao ar livre para brincar, explorar, conviver e gastar energia com uma rotina mais estimulante.
              </ServiceText>
              <Keywords>Brincadeiras · convivência · tempo ao ar livre</Keywords>
              <StyledTextButton
                href={createWhatsAppUrl('daycare')}
                target="_blank"
                rel="noreferrer"
                variant="text"
                onClick={() => trackEvent('whatsapp_click', 'daycare')}
              >
                Quero conhecer a creche <ArrowUpRight size={17} aria-hidden="true" />
              </StyledTextButton>
            </Reveal>
          </ServiceCopy>
        </Service>
      </Container>
    </ServicesShell>
  )
}
