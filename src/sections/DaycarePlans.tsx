import { ArrowUpRight, CalendarDays, Clock3, PawPrint } from 'lucide-react'
import styled from 'styled-components'
import { Container } from '../components/Container'
import { Reveal } from '../components/Reveal'
import { ButtonLink } from '../components/Button'
import { daycareConfig } from '../config/daycare'
import { contactConfig, createWhatsAppUrl } from '../config/contact'
import { money } from '../utils/booking'

const Shell = styled.section`
  padding: ${({ theme }) => theme.spacing.section} 0;
  background: ${({ theme }) => theme.colors.cream};
  color: ${({ theme }) => theme.colors.forest};
  scroll-margin-top: 1rem;
`
const Intro = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 3rem;
  h2 {
    margin: 0;
    max-width: 14ch;
    font: 430 clamp(2.8rem, 5.8vw, 5.2rem)/0.98 ${({ theme }) => theme.typography.display};
    letter-spacing: -0.045em;
  }
  > p { max-width: 24rem; margin: 0; color: ${({ theme }) => theme.colors.brown}; font-size: .88rem; }
  @media (max-width: 800px) { flex-direction: column; align-items: flex-start; }
`
const Label = styled.p`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.terracottaDark};
  font-size: .7rem;
  font-weight: 750;
  letter-spacing: .16em;
  text-transform: uppercase;
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  border-block: 1px solid ${({ theme }) => theme.colors.line};
  @media (max-width: 1000px) { grid-template-columns: 1fr; }
`
const Plan = styled.article`
  min-width: 0;
  display: flex;
  flex-direction: column;
  padding: 2.2rem 1.2rem;
  border-right: 1px solid ${({ theme }) => theme.colors.line};
  &:first-child { padding-left: 0; }
  &:last-child { padding-right: 0; border-right: 0; }
  h3 { margin: 0 0 .5rem; font-size: 1.05rem; letter-spacing: -.03em; }
  > p { min-height: 2.6rem; font-size: .76rem; color: ${({ theme }) => theme.colors.brown}; }
  > small { margin-bottom: 1rem; font-size: .72rem; }
  > a { margin-top: auto; font-size: .73rem; }
  @media (max-width: 1000px) and (min-width: 601px) {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto auto;
    column-gap: 2rem;
    align-items: center;
    > p { display: none; }
    > small { grid-column: 1; margin: 0; }
    > div { grid-column: 2; grid-row: 1 / 3; }
    > a { grid-column: 3; grid-row: 1 / 3; margin: 0; }
  }
  @media (max-width: 1000px) {
    padding: 1.75rem 0;
    border-right: 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.line};
    &:last-child { border-bottom: 0; }
  }
  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: .5rem 1rem;
    align-items: start;
    h3 { font-size: 1.1rem; margin: 0; }
    > p { display: none; }
    > small { grid-column: 1; margin: 0; }
    > div { grid-row: 1 / 3; grid-column: 2; text-align: right; }
    > a { grid-column: 1 / -1; justify-self: start; margin-top: .75rem; }
  }
`
const Price = styled.div`
  margin: 1rem 0 1.5rem;
  white-space: nowrap;
  strong { font: 460 clamp(2.3rem, 3.4vw, 3.1rem)/1 ${({ theme }) => theme.typography.display}; letter-spacing: -.055em; }
  span { margin-right: .25rem; font-size: .8rem; }
  small { display: block; margin-top: .45rem; font-size: .65rem; color: ${({ theme }) => theme.colors.brown}; }
  @media (max-width: 1000px) { margin: 0; }
`
const Footnotes = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
  > div { display: flex; gap: 1rem; align-items: flex-start; }
  svg { flex-shrink: 0; color: ${({ theme }) => theme.colors.terracottaDark}; }
  h3 { margin: 0 0 .4rem; font-size: .9rem; }
  p { margin: 0; color: ${({ theme }) => theme.colors.brown}; font-size: .78rem; }
  @media (max-width: 600px) { grid-template-columns: 1fr; gap: 1.5rem; }
`
const DayPass = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.25rem;
  padding: 1.5rem 2rem;
  margin-top: 2.5rem;
  background: ${({ theme }) => theme.colors.sand};
  border-radius: 1rem;
  > div { display: flex; gap: 1rem; align-items: center; }
  p { margin: 0; font-size: .85rem; }
  strong { display: block; font-size: 1rem; }
  a { font-size: .8rem; }
  @media (max-width: 600px) { padding: 1.4rem; > a { width: 100%; } }
`

export function DaycarePlans() {
  return (
    <Shell id="planos" aria-labelledby="plans-title">
      <Container>
        <Reveal>
          <Label>Creche Auzen · Pacotes e valores</Label>
          <Intro>
            <h2 id="plans-title">Mais dias juntos.<br />Mais histórias pra contar.</h2>
            <p>Escolha a frequência que combina com vocês. Quanto mais dias de quintal, menor o valor de cada diária.</p>
          </Intro>
        </Reveal>
        <Grid>
          {daycareConfig.plans.map(plan => (
            <Plan key={plan.frequency} aria-label={`Plano ${plan.frequency} ${plan.frequency === 1 ? 'vez' : 'vezes'} por semana`}>
              <h3>{plan.frequency}× por semana</h3>
              <p>{plan.description}</p>
              <small>{plan.days} diárias por mês</small>
              <Price><span>R$</span><strong>{plan.price}</strong><small>por mês · {money(plan.price / plan.days)}/dia</small></Price>
              <ButtonLink
                href={`https://wa.me/${contactConfig.whatsapp.digits}?text=${encodeURIComponent(`Olá! Vi os pacotes da Creche Auzen no site e tenho interesse no plano de ${plan.frequency} ${plan.frequency === 1 ? 'vez' : 'vezes'} por semana (${plan.days} diárias por mês), por ${money(plan.price)} mensais. Podemos conversar sobre disponibilidade e adaptação do meu cão?`)}`}
                target="_blank" rel="noreferrer" variant="text"
                aria-label={`Consultar plano de ${plan.frequency} ${plan.frequency === 1 ? 'vez' : 'vezes'} por semana`}
                data-service="daycare" data-analytics-location="daycare_plans"
              >Quero este plano <ArrowUpRight size={16} aria-hidden="true" /></ButtonLink>
            </Plan>
          ))}
        </Grid>
        <Footnotes>
          <div><Clock3 size={24} aria-hidden="true" /><div><h3>Um dia inteiro para aproveitar.</h3><p>{daycareConfig.schedule}.</p></div></div>
          <div><PawPrint size={24} aria-hidden="true" /><div><h3>A família tem mais de um cão?</h3><p>Tem desconto especial! <a href={createWhatsAppUrl('daycare')} target="_blank" rel="noreferrer"><u>Consulte as condições com a equipe.</u></a></p></div></div>
        </Footnotes>
        <DayPass>
          <div><CalendarDays size={28} aria-hidden="true" /><p><strong>Prefere um dia de cada vez?</strong>Diária avulsa por {money(daycareConfig.dailyRate)}.</p></div>
          <ButtonLink href="/reservar?servico=daycare">Planejar um dia de creche <ArrowUpRight size={16} aria-hidden="true" /></ButtonLink>
        </DayPass>
      </Container>
    </Shell>
  )
}
