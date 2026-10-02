import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import styled from 'styled-components'
import { Container } from './Container'
import { ButtonLink } from './Button'

import { DisplayTitle, Eyebrow, Heading, Section } from '../styles/pages'
export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children?: ReactNode
}) {
  const reduced = useReducedMotion()
  return (
    <Section>
      <Container>
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <Eyebrow>{eyebrow}</Eyebrow>
          <DisplayTitle>{title}</DisplayTitle>
          {children}
        </motion.div>
      </Container>
    </Section>
  )
}
const Callout = styled(Section)`
  background: ${({ theme }) => theme.colors.sand};
  h2 {
    max-width: 19ch;
  }
  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }
  @media (max-width: 650px) {
    > div {
      align-items: flex-start;
      flex-direction: column;
    }
  }
`
export function ReserveCallout() {
  return (
    <Callout>
      <Container>
        <div>
          <Eyebrow>O próximo dia de diversão</Eyebrow>
          <Heading>Um lugar de carinho espera pelo seu cão.</Heading>
        </div>
        <ButtonLink href="/reservar">
          Planejar minha reserva <ArrowUpRight size={18} />
        </ButtonLink>
      </Container>
    </Callout>
  )
}
