import { ArrowRight, CalendarDays } from 'lucide-react'
import styled from 'styled-components'
import { Container } from '../components/Container'
import { ButtonLink } from '../components/Button'
import { bookingConfig } from '../config/booking'
import { money } from '../utils/booking'
const Shell = styled.section`
  background: ${({ theme }) => theme.colors.sand};
  padding: 2.5rem 0;
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.5rem;
  }
  p {
    margin: 0;
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.brown};
  }
  strong {
    display: block;
    color: ${({ theme }) => theme.colors.forest};
    font-size: 1rem;
    margin-bottom: 0.3rem;
  }
  a {
    font-size: 0.8rem;
  }
  small {
    display: block;
    margin-top: 0.4rem;
    font-size: 0.7rem;
  }
  @media (max-width: 520px) {
    > div {
      align-items: flex-start;
      flex-direction: column;
    }
  }
`
export function HomeNews() {
  return (
    <Shell>
      <Container>
        <div>
          <strong>
            <CalendarDays size={16} /> Planeje a próxima estadia
          </strong>
          <p>
            Hotel: {money(bookingConfig.rates.hotel)} / diária · Creche:{' '}
            {money(bookingConfig.rates.daycare)} / dia
          </p>
          <small>Valores iniciais por cão, sujeitos à confirmação.</small>
        </div>
        <ButtonLink href="/promocoes" variant="text">
          Conheça a condição MAISDIAS <ArrowRight size={16} />
        </ButtonLink>
        <ButtonLink href="/informacoes" variant="text">
          Prepare a chegada <ArrowRight size={16} />
        </ButtonLink>
      </Container>
    </Shell>
  )
}
