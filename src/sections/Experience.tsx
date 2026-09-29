import { ArrowDown } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { useRef } from 'react'
import styled from 'styled-components'
import { Container } from '../components/Container'
import { Reveal } from '../components/Reveal'

const steps = [
  { number: '01', title: 'Chegar', text: 'Sentir o ambiente e olhar tudo ao redor.' },
  { number: '02', title: 'Explorar', text: 'Farejar, caminhar e encontrar novos cantos.' },
  { number: '03', title: 'Brincar', text: 'Gastar energia e viver o lado de fora.' },
  { number: '04', title: 'Descansar', text: 'Ter tempo para respirar e fazer uma pausa.' },
  { number: '05', title: 'Voltar feliz', text: 'Levar para casa um dia cheio de histórias.' },
]

const ExperienceShell = styled.section`
  position: relative;
  padding: ${({ theme }) => theme.spacing.section} 0;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.warmWhite};
  background: ${({ theme }) => theme.colors.terracottaDark};
`

const BackgroundWord = styled.span`
  position: absolute;
  right: -0.05em;
  bottom: -0.2em;
  color: rgba(255, 255, 255, 0.035);
  font-family: ${({ theme }) => theme.typography.display};
  font-size: clamp(13rem, 35vw, 36rem);
  line-height: 0.7;
  pointer-events: none;
`

const Top = styled(Container)`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 3rem;
  margin-bottom: clamp(4rem, 9vw, 8rem);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    align-items: flex-start;
    flex-direction: column;
  }
`

const TitleWrap = styled.div`
  p {
    margin-bottom: 1rem;
    color: rgba(255, 255, 255, 0.68);
    font-size: 0.7rem;
    font-weight: 750;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  h2 {
    max-width: 11ch;
    margin-bottom: 0;
    font-family: ${({ theme }) => theme.typography.display};
    font-size: clamp(3rem, 7vw, 6.2rem);
    font-weight: 420;
    letter-spacing: -0.052em;
    line-height: 0.9;
  }
`

const Note = styled.p`
  max-width: 25rem;
  margin-bottom: 0;
  color: rgba(255, 255, 255, 0.68);
  font-size: 0.88rem;
`

const Journey = styled(Container)`
  position: relative;
`

const Track = styled.div`
  position: absolute;
  top: 1.05rem;
  right: 0;
  left: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    top: 0;
    bottom: 0;
    left: 1.05rem;
    width: 1px;
    height: auto;
  }
`

const Progress = styled(motion.div)`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.sand};
  transform-origin: left top;
  transform: scaleX(var(--progress));

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    transform-origin: top;
    transform: scaleY(var(--progress));
  }
`

const Steps = styled.ol`
  position: relative;
  display: grid;
  padding: 0;
  margin: 0;
  grid-template-columns: repeat(5, 1fr);
  gap: clamp(1.25rem, 3vw, 3rem);
  list-style: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`

const Step = styled.li`
  position: relative;
  padding-top: 3.3rem;

  &::before {
    position: absolute;
    top: 0.6rem;
    left: 0;
    width: 0.9rem;
    height: 0.9rem;
    background: ${({ theme }) => theme.colors.terracottaDark};
    border: 2px solid ${({ theme }) => theme.colors.sand};
    border-radius: 50%;
    content: '';
  }

  span {
    display: block;
    margin-bottom: 1.2rem;
    color: rgba(255, 255, 255, 0.75);
    font-size: 0.67rem;
    font-weight: 700;
    letter-spacing: 0.12em;
  }

  h3 {
    margin-bottom: 0.65rem;
    font-family: ${({ theme }) => theme.typography.display};
    font-size: clamp(1.9rem, 3vw, 2.8rem);
    font-weight: 440;
    letter-spacing: -0.035em;
    line-height: 1;
  }

  p {
    max-width: 14rem;
    margin-bottom: 0;
    color: rgba(255, 255, 255, 0.62);
    font-size: 0.78rem;
    line-height: 1.6;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 0 0 3.3rem;

    &::before {
      top: 0.45rem;
      left: 0.6rem;
    }

    span {
      margin-bottom: 0.45rem;
    }

    p {
      max-width: 24rem;
    }
  }
`

const DownCue = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    color: rgba(255, 255, 255, 0.55);
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
`

export function Experience() {
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 75%', 'end 40%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.3 })

  return (
    <ExperienceShell ref={sectionRef} aria-labelledby="experience-title">
      <BackgroundWord aria-hidden="true">auzen</BackgroundWord>
      <Top>
        <Reveal>
          <TitleWrap>
            <p>Uma jornada possível</p>
            <h2 id="experience-title">Cada dia encontra o próprio ritmo.</h2>
          </TitleWrap>
        </Reveal>
        <Reveal delay={0.12}>
          <div>
            <Note>Não é uma agenda rígida. É uma forma de imaginar os momentos que cabem em um dia com mais espaço.</Note>
            <DownCue>
              Acompanhe <ArrowDown size={14} aria-hidden="true" />
            </DownCue>
          </div>
        </Reveal>
      </Top>
      <Journey>
        <Track>
          <Progress style={{ '--progress': reducedMotion ? 1 : progress } as import('motion/react').MotionStyle} />
        </Track>
        <Steps role="list">
          {steps.map((step, index) => (
            <Step key={step.number}>
              <Reveal delay={index * 0.06}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            </Step>
          ))}
        </Steps>
      </Journey>
    </ExperienceShell>
  )
}
