import styled from 'styled-components'

interface BrandProps {
  inverted?: boolean
  className?: string
  onClick?: () => void
}

const BrandLink = styled.a<{ $inverted: boolean }>`
  display: inline-flex;
  flex-direction: column;
  gap: 0.02rem;
  color: ${({ theme, $inverted }) => ($inverted ? theme.colors.warmWhite : theme.colors.forest)};
  line-height: 1;
  transition: color ${({ theme }) => theme.transitions.base};
`

const Name = styled.span`
  font-family: ${({ theme }) => theme.typography.display};
  font-size: clamp(1.65rem, 2.2vw, 2rem);
  font-weight: 600;
  letter-spacing: -0.045em;

  i {
    color: ${({ theme }) => theme.colors.terracotta};
    font-style: normal;
  }
`

const Descriptor = styled.span`
  margin-left: 0.08rem;
  font-size: 0.52rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
`

export function Brand({ inverted = false, className, onClick }: BrandProps) {
  return (
    <BrandLink
      href="#inicio"
      aria-label="Auzen Pet Resort — voltar ao início"
      $inverted={inverted}
      className={className}
      onClick={onClick}
    >
      <Name>
        Auzen<i>.</i>
      </Name>
      <Descriptor>Pet Resort</Descriptor>
    </BrandLink>
  )
}
