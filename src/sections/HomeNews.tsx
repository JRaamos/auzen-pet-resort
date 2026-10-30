import { ArrowRight, Clock3 } from 'lucide-react'
import styled from 'styled-components'
import { Container } from '../components/Container'
import { ButtonLink } from '../components/Button'
import { daycareConfig } from '../config/daycare'
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
    color: ${({ theme }) => theme.colors.terracottaDark};
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
            <Clock3 size={16} aria-hidden="true" /> Dias de quintal, de segunda a sexta
          </strong>
          <p>
            Creche das 7h às 18h · Diária avulsa {money(daycareConfig.dailyRate)}
          </p>
          <small>Pacotes mensais a partir de {money(daycareConfig.plans[0].price)} · 4 diárias por mês.</small>
        </div>
        <ButtonLink href="/#planos" variant="text">
          Escolha seu pacote <ArrowRight size={16} aria-hidden="true" />
        </ButtonLink>
        <ButtonLink href="/informacoes" variant="text">
          Prepare a chegada <ArrowRight size={16} />
        </ButtonLink>
      </Container>
    </Shell>
  )
}
