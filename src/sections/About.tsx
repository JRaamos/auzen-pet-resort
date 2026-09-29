import { ArrowDownRight } from 'lucide-react'
import styled from 'styled-components'
import { Container } from '../components/Container'
import { ResponsiveImage } from '../components/ResponsiveImage'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'

const AboutShell = styled.section`
  position: relative;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing.section} 0;
  background: ${({ theme }) => theme.colors.cream};
`

const IntroGrid = styled(Container)`
  display: grid;
  grid-template-columns: 1.1fr 0.75fr;
  align-items: end;
  gap: clamp(2.5rem, 9vw, 9rem);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`

const Copy = styled.div`
  padding-bottom: 0.35rem;

  p {
    max-width: 35rem;
    margin-bottom: 1.6rem;
    color: ${({ theme }) => theme.colors.brown};
    font-size: clamp(1rem, 1.5vw, 1.14rem);
  }
`

const SimpleList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem 1.3rem;
  padding: 1.25rem 0 0;
  margin: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.line};
  list-style: none;

  li {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.8rem;
    font-weight: 700;

    &::before {
      width: 0.42rem;
      height: 0.42rem;
      background: ${({ theme }) => theme.colors.terracotta};
      border-radius: 50%;
      content: '';
    }
  }
`

const StoryGrid = styled(Container)`
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(14rem, 0.5fr);
  align-items: end;
  gap: clamp(1rem, 3vw, 2.2rem);
  margin-top: clamp(4rem, 9vw, 8rem);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`

const MainImage = styled.div`
  position: relative;
  height: clamp(28rem, 62vw, 47rem);
  overflow: hidden;
  border-radius: 0 ${({ theme }) => theme.radius.lg} ${({ theme }) => theme.radius.lg} 0;

  &::after {
    position: absolute;
    inset: auto 0 0;
    height: 30%;
    background: linear-gradient(transparent, rgba(24, 62, 50, 0.44));
    content: '';
    pointer-events: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: min(120vw, 42rem);
    border-radius: ${({ theme }) => theme.radius.lg};
  }
`

const Caption = styled.div`
  display: flex;
  min-height: 18rem;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.line};
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};

  svg {
    color: ${({ theme }) => theme.colors.terracotta};
  }

  p {
    margin-bottom: 0;
    font-family: ${({ theme }) => theme.typography.display};
    font-size: clamp(1.8rem, 3vw, 2.6rem);
    font-weight: 430;
    letter-spacing: -0.035em;
    line-height: 1.05;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 12rem;
  }
`

export function About() {
  return (
    <AboutShell id="auzen">
      <IntroGrid>
        <Reveal>
          <SectionHeading eyebrow="O Auzen">Aqui, cachorro tem espaço para ser cachorro.</SectionHeading>
        </Reveal>
        <Reveal delay={0.12}>
          <Copy>
            <p>
              Entre gramado, árvores e cantinhos de sombra, o Auzen reúne hotel e creche em um ambiente de verdade — aberto, próximo e cheio de vida.
            </p>
            <SimpleList aria-label="Características do espaço">
              <li>Natureza por perto</li>
              <li>Convivência</li>
              <li>Tempo ao ar livre</li>
            </SimpleList>
          </Copy>
        </Reveal>
      </IntroGrid>
      <StoryGrid>
        <Reveal>
          <MainImage>
            <ResponsiveImage
              base="human-care"
              alt="Pessoa no jardim acompanhada por dois cães"
              width={900}
              height={1600}
              maxWidth={900}
              sizes="(max-width: 800px) 90vw, 68vw"
              objectPosition="50% 45%"
            />
          </MainImage>
        </Reveal>
        <Reveal delay={0.15}>
          <Caption>
            <ArrowDownRight size={28} aria-hidden="true" />
            <p>Companhia por perto. Um carinho entre uma brincadeira e outra.</p>
          </Caption>
        </Reveal>
      </StoryGrid>
    </AboutShell>
  )
}
