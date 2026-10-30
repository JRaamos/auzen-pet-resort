import { ArrowDown, ArrowRight, CalendarDays, Leaf, PawPrint } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import styled from 'styled-components'
import { ButtonLink } from '../components/Button'
import { Container } from '../components/Container'
import { ResponsiveImage } from '../components/ResponsiveImage'

const Shell = styled.section`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.cream};
  color: ${({ theme }) => theme.colors.forest};
  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    width: 54rem;
    height: 54rem;
    right: -18rem;
    top: -5rem;
    border: 1px solid ${({ theme }) => theme.colors.line};
    border-radius: 50%;
  }
`
const Inner = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 6vw, 6rem);
  align-items: center;
  min-height: min(100svh, 64rem);
  padding-block: 8.5rem 5rem;
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: 1.75rem;
    min-height: 0;
    padding-block: 6rem 3rem;
  }
`
const Copy = styled(motion.div)`
  min-width: 0;
  position: relative;
  z-index: 2;
`
const Label = styled.p`
  margin-bottom: 1.1rem;
  font-size: .66rem;
  font-weight: 750;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.terracottaDark};
  @media (max-width: 800px) { margin-bottom: .65rem; font-size: .58rem; }
`
const Title = styled.h1`
  margin: 0 0 1.7rem;
  font: 500 clamp(6rem, 9vw, 8.6rem)/.85 ${({ theme }) => theme.typography.display};
  letter-spacing: -.06em;
  i { font-style: normal; color: ${({ theme }) => theme.colors.terracotta}; }
  small { display: block; margin: .9rem 0 0 .3rem; font: 600 .72rem/1.5 ${({ theme }) => theme.typography.body}; letter-spacing: .42em; text-transform: uppercase; }
  @media (max-width: 800px) {
    font-size: clamp(4.2rem, 15vw, 6rem);
    margin-bottom: 1rem;
    small { font-size: .56rem; margin-top: .5rem; }
  }
`
const Promise = styled.p`
  max-width: 19ch;
  margin-bottom: 1.1rem;
  font: 450 clamp(2.4rem, 3.6vw, 3.6rem)/1.02 ${({ theme }) => theme.typography.display};
  letter-spacing: -.04em;
  em { color: ${({ theme }) => theme.colors.terracottaDark}; }
  @media (max-width: 800px) { max-width: 25ch; font-size: clamp(1.7rem, 6.7vw, 2.5rem); margin-bottom: .75rem; }
`
const Lead = styled.p`
  max-width: 29rem;
  font-size: .9rem;
  color: ${({ theme }) => theme.colors.brown};
  margin-bottom: 1.5rem;
  @media (max-width: 800px) { font-size: .78rem; margin-bottom: 1rem; }
`
const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: .8rem;
  > a { font-size: .76rem; }
  > a:last-child {
    color: ${({ theme }) => theme.colors.forest};
    border: 1px solid ${({ theme }) => theme.colors.forest};
    background: transparent;
    &:hover { background: ${({ theme }) => theme.colors.sand}; }
  }
  @media (max-width: 520px) {
    gap: .5rem;
    > a { padding: .75rem .8rem; font-size: .65rem; min-height: 2.85rem; }
  }
`
const Details = styled.p`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: .5rem 1.5rem;
  margin: 1.5rem 0 0;
  font-size: .7rem;
  font-weight: 650;
  span { display: inline-flex; align-items: center; gap: .45rem; }
  svg { color: ${({ theme }) => theme.colors.terracottaDark}; }
  @media (max-width: 800px) { display: none; }
`
const Photos = styled(motion.div)`
  position: relative;
  min-width: 0;
  padding: 0 0 2rem 1.5rem;
  @media (max-width: 800px) { padding: 0 0 1.2rem; margin-inline: .5rem; transform: none !important; }
`
const MainPhoto = styled.div`
  height: clamp(28rem, 62svh, 42rem);
  overflow: hidden;
  border-radius: 45% 45% 1.5rem 1.5rem;
  border: .5rem solid ${({ theme }) => theme.colors.warmWhite};
  transform: rotate(2deg);
  @media (max-width: 800px) {
    height: clamp(10rem, 24svh, 18rem);
    border-radius: 6rem 1rem 6rem 1rem;
    img { object-position: 50% 30%; }
  }
`
const InsetPhoto = styled.div`
  position: absolute;
  width: 36%;
  aspect-ratio: 1;
  left: -1rem;
  bottom: 0;
  overflow: hidden;
  border: .45rem solid ${({ theme }) => theme.colors.warmWhite};
  border-radius: 1.5rem;
  transform: rotate(-9deg);
  box-shadow: ${({ theme }) => theme.shadows.soft};
  @media (max-width: 800px) { width: 6.5rem; left: -.5rem; border-radius: 1rem; border-width: .3rem; }
`
const Caption = styled.span`
  position: absolute;
  right: -.3rem;
  bottom: 0;
  display: flex;
  gap: .6rem;
  align-items: center;
  padding: 1rem 1.2rem;
  background: ${({ theme }) => theme.colors.forest};
  color: ${({ theme }) => theme.colors.warmWhite};
  border-radius: 1rem 1rem 1rem 0;
  font-size: .75rem;
  font-weight: 650;
  @media (max-width: 800px) { font-size: .65rem; padding: .7rem .8rem; }
`
const Scroll = styled.a`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  font-size: .6rem;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  @media (max-width: 800px) { display: none; }
`

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])
  return <Shell id="inicio" ref={ref}>
    <Inner>
      <Copy initial={reduceMotion ? false : { y: 18 }} animate={{ y: 0 }} transition={{ duration: .65 }}>
        <Label>Hotel + Creche · Lauro de Freitas</Label>
        <Title>Auzen<i>.</i><small>Pet Resort</small></Title>
        <Promise>Quintal, amigos e diversão.<br /><em>Todo dia tem uma descoberta.</em></Promise>
        <Lead>Creche e hotel em meio à natureza. Um lugar para seu cão brincar, fazer amigos e se sentir em casa.</Lead>
        <Actions>
          <ButtonLink href="/reservar?servico=daycare"><CalendarDays size={17} aria-hidden="true" />Planejar minha reserva</ButtonLink>
          <ButtonLink href="/#planos" variant="outline">Ver pacotes e valores <ArrowRight size={17} aria-hidden="true" /></ButtonLink>
        </Actions>
        <Details><span><Leaf size={16} aria-hidden="true" />Natureza por todos os lados</span><span><PawPrint size={16} aria-hidden="true" />Um dia no ritmo dele</span></Details>
      </Copy>
      <Photos style={{ y: reduceMotion ? 0 : y }} initial={reduceMotion ? false : { opacity: .5 }} animate={{ opacity: 1 }} transition={{ duration: .8 }}>
        <MainPhoto><ResponsiveImage base="garden-friends" alt="Dois cães se encontrando no gramado do Auzen Pet Resort" width={900} height={962} sizes="(max-width: 800px) 90vw, 45vw" loading="eager" fetchPriority="high" objectPosition="50% 35%" /></MainPhoto>
        <InsetPhoto><ResponsiveImage base="golden-walk" alt="Cão explorando o jardim florido da Auzen" width={900} height={1600} sizes="(max-width: 800px) 104px, 200px" objectPosition="50% 40%" /></InsetPhoto>
        <Caption><PawPrint size={20} aria-hidden="true" />O nosso quintal espera por ele.</Caption>
      </Photos>
    </Inner>
    <Scroll href="#services-title">Conheça o Auzen <ArrowDown size={14} aria-hidden="true" /></Scroll>
  </Shell>
}
