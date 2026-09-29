import type { ReactNode } from 'react'
import styled from 'styled-components'

const Eyebrow = styled.p`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.1rem;
  color: ${({ theme }) => theme.colors.terracotta};
  font-size: 0.72rem;
  font-weight: 750;
  letter-spacing: 0.16em;
  text-transform: uppercase;

  &::before {
    width: 2.2rem;
    height: 1px;
    background: currentColor;
    content: '';
  }
`

const Title = styled.h2`
  max-width: 15ch;
  margin-bottom: 0;
  font-family: ${({ theme }) => theme.typography.display};
  font-size: clamp(2.6rem, 6vw, 5.2rem);
  font-weight: 450;
  letter-spacing: -0.045em;
  line-height: 0.98;
`

interface SectionHeadingProps {
  eyebrow: string
  children: ReactNode
  className?: string
}

export function SectionHeading({ eyebrow, children, className }: SectionHeadingProps) {
  return (
    <div className={className}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Title>{children}</Title>
    </div>
  )
}
