import { ArrowDown, ArrowRight, MessageCircle } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import styled from 'styled-components'
import { ButtonLink } from '../components/Button'
import { Container } from '../components/Container'
import { createWhatsAppUrl } from '../config/contact'
import { trackEvent } from '../utils/analytics'

const HeroShell = styled.section`
  position: relative;
  min-height: 100svh;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.warmWhite};
  background: ${({ theme }) => theme.colors.forest};
  isolation: isolate;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    --photo-height: clamp(13rem, 35svh, 19rem);
    min-height: 0;
  }

  @media (max-width: 800px) and (max-height: 600px) {
    --photo-height: 11.5rem;
  }
`

const ImageLayer = styled(motion.div)`
  position: absolute;
  z-index: -3;
  inset: -8% 0 -8%;

  picture,
  img {
    width: 100%;
    height: 100%;
  }

  img {
    object-fit: cover;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    inset: 3.2rem 0 auto;
    height: calc(var(--photo-height) + 1rem);
    transform: none !important;

    img {
      object-position: 50% 28%;
    }
  }
`

const Overlay = styled.div`
  position: absolute;
  z-index: -2;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(14, 31, 25, 0.66) 0, rgba(14, 31, 25, 0.45) 5rem, transparent 13rem),
    linear-gradient(90deg, rgba(17, 48, 38, 0.96) 0%, rgba(17, 48, 38, 0.84) 28%, rgba(17, 48, 38, 0.18) 58%, rgba(17, 48, 38, 0.08) 100%),
    linear-gradient(0deg, rgba(14, 31, 25, 0.68) 0%, transparent 45%);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    background:
      linear-gradient(180deg, #183e32 3.2rem, rgba(24, 62, 50, 0.12) 6rem, transparent 8rem),
      linear-gradient(180deg, transparent 8rem, rgba(24, 62, 50, 0.18) calc(var(--photo-height) - 5rem), #183e32 calc(var(--photo-height) + 3.5rem));
  }
`

const OrganicLine = styled.div`
  position: absolute;
  z-index: -1;
  top: 11%;
  right: -10rem;
  width: min(46vw, 45rem);
  aspect-ratio: 1;
  border: 1px solid rgba(255, 255, 255, 0.38);
  border-radius: ${({ theme }) => theme.radius.organic};
  transform: rotate(15deg);

  &::after {
    position: absolute;
    inset: 1.4rem;
    border: 1px solid rgba(200, 102, 69, 0.7);
    border-radius: inherit;
    content: '';
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`

const HeroInner = styled(Container)`
  display: flex;
  min-height: 100svh;
  flex-direction: column;
  justify-content: center;
  padding-top: 7rem;
  padding-bottom: 5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 0;
    justify-content: flex-start;
    padding-top: calc(var(--photo-height) + 1rem);
    padding-bottom: 3rem;
  }
`

const HeroContent = styled(motion.div)`
  width: min(100%, 33rem);
`

const Eyebrow = styled.p`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.4rem;
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.72rem;
  font-weight: 750;
  letter-spacing: 0.18em;
  text-transform: uppercase;

  &::before {
    width: 2.4rem;
    height: 1px;
    background: ${({ theme }) => theme.colors.terracotta};
    content: '';
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: 0.8rem;
    font-size: 0.62rem;
    letter-spacing: 0.14em;
    &::before { width: 1.5rem; }
  }
`

const Title = styled.h1`
  margin-bottom: 1.8rem;
  font-family: ${({ theme }) => theme.typography.display};
  font-size: clamp(5.5rem, 10vw, 9rem);
  font-weight: 500;
  letter-spacing: -0.058em;
  line-height: 0.88;

  i { color: ${({ theme }) => theme.colors.terracotta}; font-style: normal; }
  small {
    display: block;
    margin: 0.8rem 0 0 0.35rem;
    font-family: ${({ theme }) => theme.typography.body};
    font-size: 0.75rem;
    font-weight: 550;
    letter-spacing: 0.42em;
    text-transform: uppercase;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: 1rem;
    font-size: clamp(4.2rem, 18vw, 5.5rem);
    small { margin-top: 0.55rem; font-size: 0.6rem; }
  }
`

const Promise = styled.p`
  max-width: 15ch;
  margin-bottom: 1rem;
  font-family: ${({ theme }) => theme.typography.display};
  font-size: clamp(2rem, 3.8vw, 3.4rem);
  font-weight: 400;
  letter-spacing: -0.035em;
  line-height: 1.05;
  em { color: ${({ theme }) => theme.colors.sand}; }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: none;
    margin-bottom: 0.65rem;
    font-size: clamp(1.55rem, 6.5vw, 2rem);
    br { display: none; }
    em::before { content: ' '; }
  }
`

const Lead = styled.p`
  max-width: 27rem;
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.78);
  font-size: clamp(0.88rem, 1.2vw, 1rem);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: 1rem;
    font-size: 0.82rem;
    line-height: 1.65;
  }
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    align-items: stretch;
    flex-direction: column;
    gap: 0.35rem;

    a {
      width: 100%;
      min-height: 2.85rem;
      padding-block: 0.65rem;
    }

    a:last-child { border-color: transparent; background: transparent; }
  }
`

const SideNote = styled(motion.div)`
  position: absolute;
  right: clamp(2rem, 5vw, 5.5rem);
  bottom: 6.5rem;
  display: grid;
  max-width: 15rem;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.75rem;
  line-height: 1.5;

  &::before {
    width: 3.5rem;
    height: 1px;
    background: ${({ theme }) => theme.colors.terracotta};
    content: '';
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`

const ScrollCue = styled.a`
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transform: translateX(-50%);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    bottom: 0.85rem;
    font-size: 0.55rem;
  }

  svg {
    animation: float-down 1.8s ease-in-out infinite;
  }

  @keyframes float-down {
    0%, 100% { transform: translateY(-2px); }
    50% { transform: translateY(5px); }
  }
`

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <HeroShell id="inicio" ref={sectionRef}>
      <ImageLayer style={{ y: reduceMotion ? 0 : imageY, scale: reduceMotion ? 1 : 1.04 }}>
        <picture>
          <source media="(max-width: 800px)" type="image/avif" srcSet="/images/hero-mobile-v1-480.avif 480w, /images/hero-mobile-v1-900.avif 900w" sizes="100vw" />
          <source media="(max-width: 800px)" srcSet="/images/hero-mobile-v1-480.jpg 480w, /images/hero-mobile-v1-900.jpg 900w" sizes="100vw" />
          <source type="image/avif" srcSet="/images/hero-garden-900.avif 900w, /images/hero-garden-1600.avif 1600w" sizes="100vw" />
          <img src="/images/hero-garden-1600.jpg" alt="Cães e natureza no jardim do Auzen Pet Resort" width={1600} height={900} fetchPriority="high" decoding="async" />
        </picture>
      </ImageLayer>
      <Overlay />
      <OrganicLine aria-hidden="true" />
      <HeroInner>
        <HeroContent
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.18 } },
          }}
        >
          <motion.div variants={reduceMotion ? undefined : { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}>
            <Eyebrow>Hotel + Creche para cães</Eyebrow>
          </motion.div>
          <motion.div variants={reduceMotion ? undefined : { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}>
            <Title>Auzen<i>.</i><small>Pet Resort</small></Title>
            <Promise>Dias leves.<br /><em>Rabos felizes.</em></Promise>
          </motion.div>
          <motion.div variants={reduceMotion ? undefined : { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}>
            <Lead>Natureza, brincadeira e acolhimento para o seu cão se sentir em casa.</Lead>
          </motion.div>
          <motion.div variants={reduceMotion ? undefined : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <Actions>
              <ButtonLink
                href={createWhatsAppUrl('general')}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('whatsapp_click', 'hero')}
              >
                <MessageCircle size={18} aria-hidden="true" /> Falar pelo WhatsApp
              </ButtonLink>
              <ButtonLink href="#espaco" variant="outline">
                Conhecer o espaço <ArrowRight size={17} aria-hidden="true" />
              </ButtonLink>
            </Actions>
          </motion.div>
        </HeroContent>
      </HeroInner>
      <SideNote
        initial={reduceMotion ? false : { opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
      >
        Gramado, árvores e vida ao ar livre fazem parte do cenário.
      </SideNote>
      <ScrollCue href="#auzen">
        Descobrir <ArrowDown size={14} aria-hidden="true" />
      </ScrollCue>
    </HeroShell>
  )
}
