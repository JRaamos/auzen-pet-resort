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
  max-width: 45rem;
  margin: 0 auto 3.5rem;
  text-align: center;
  h2 {
    margin-bottom: 1rem;
    font: 450 clamp(2.7rem, 5vw, 4.6rem)/1.03 ${({ theme }) => theme.typography.display};
    letter-spacing: -0.045em;
  }
  > p { margin: 0 auto; max-width: 42rem; color: ${({ theme }) => theme.colors.brown}; font-size: .9rem; }
`
const Label = styled.p`
  margin-bottom: .8rem;
  color: ${({ theme }) => theme.colors.terracottaDark};
  font-size: .7rem;
  font-weight: 750;
  letter-spacing: .16em;
  text-align: center;
  text-transform: uppercase;
`
const Period = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: .5rem;
  margin-top: 1.5rem;
  padding: .65rem 1.15rem;
  background: ${({ theme }) => theme.colors.sand};
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: .73rem;
  font-weight: 700;
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1rem;
  padding-top: .75rem;
  @media (max-width: 1100px) { grid-template-columns: repeat(6, minmax(0, 1fr)); > article { grid-column: span 2; } > article:nth-last-child(-n + 2) { grid-column: span 3; } }
  @media (max-width: 700px) { grid-template-columns: repeat(2, minmax(0, 1fr)); > article, > article:nth-last-child(-n + 2) { grid-column: auto; } > article:last-child { grid-column: 1 / -1; } }
  @media (max-width: 480px) { grid-template-columns: 1fr; gap: 1.5rem; }
`
const Plan = styled.article<{ $featured: boolean }>`
  --plan-muted: ${({ theme, $featured }) => $featured ? 'rgba(255,255,255,.8)' : theme.colors.brown};
  position: relative;
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1.25rem 1.4rem;
  color: ${({ theme, $featured }) => $featured ? theme.colors.warmWhite : theme.colors.forest};
  background: ${({ theme, $featured }) => $featured ? theme.colors.forest : theme.colors.warmWhite};
  border: 1.5px solid ${({ theme, $featured }) => $featured ? theme.colors.forest : theme.colors.sand};
  border-radius: 1.65rem;
  text-align: center;
  box-shadow: ${({ $featured }) => $featured ? '0 14px 32px rgba(24,62,50,.14)' : 'none'};
  transform: translateY(${({ $featured }) => $featured ? '-.5rem' : '0'});
  transition: transform ${({ theme }) => theme.transitions.base}, box-shadow ${({ theme }) => theme.transitions.base};
  &:hover, &:focus-within { transform: translateY(-.65rem); box-shadow: 0 16px 32px rgba(24,62,50,.12); }
  h3 { margin: 0 0 .5rem; font-size: 1.1rem; letter-spacing: -.03em; }
  > p { min-height: 3.75rem; margin: 0; color: var(--plan-muted); font-size: .76rem; line-height: 1.6; }
  > a {
    width: 100%;
    margin-top: auto;
    min-height: 3rem;
    padding-inline: .7rem;
    color: ${({ theme }) => theme.colors.forest};
    background: ${({ theme, $featured }) => $featured ? theme.colors.sand : 'transparent'};
    border: 1.5px solid ${({ theme, $featured }) => $featured ? theme.colors.sand : theme.colors.forest};
    font-size: .76rem;
    &:hover { background: ${({ theme, $featured }) => $featured ? theme.colors.warmWhite : theme.colors.sand}; }
  }
  @media (prefers-reduced-motion: reduce) { transform: none; &:hover, &:focus-within { transform: none; } }
`
const Badge = styled.span`
  position: absolute;
  top: -1rem;
  left: 50%;
  transform: translateX(-50%);
  padding: .45rem .8rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme }) => theme.colors.forest};
  background: ${({ theme }) => theme.colors.sand};
  white-space: nowrap;
  font-size: .65rem;
  font-weight: 800;
`
const Price = styled.div<{ $featured: boolean }>`
  margin: 1rem 0 1.25rem;
  color: ${({ theme, $featured }) => $featured ? theme.colors.sand : theme.colors.forest};
  white-space: nowrap;
  strong { font: 650 clamp(2.8rem, 3.6vw, 3.35rem)/1 ${({ theme }) => theme.typography.body}; letter-spacing: -.055em; }
  span { display: inline-block; margin: .2rem .25rem 0 0; vertical-align: top; font-size: .85rem; font-weight: 750; }
  small { display: block; margin-top: .55rem; color: var(--plan-muted); font-size: .75rem; }
`
const DailyPrice = styled.div<{ $featured: boolean }>`
  padding: .4rem .65rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme }) => theme.colors.forest};
  background: ${({ theme, $featured }) => $featured ? theme.colors.sand : theme.colors.cream};
  font-size: .7rem;
  font-weight: 750;
`
const Benefits = styled.ul`
  display: grid;
  align-content: start;
  width: 100%;
  gap: .85rem;
  padding: 0;
  margin: 1.6rem 0 2rem;
  list-style: none;
  text-align: left;
  li { display: flex; gap: .6rem; align-items: flex-start; font-size: .76rem; line-height: 1.65; }
  svg { flex: 0 0 auto; margin-top: .1rem; color: inherit; }
`
const Footnotes = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2.5rem;
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
  margin-top: 2rem;
  background: ${({ theme }) => theme.colors.sand};
  border-radius: 1.4rem;
  > div { display: flex; gap: 1rem; align-items: center; }
  p { margin: 0; font-size: .85rem; }
  strong { display: block; font-size: 1rem; }
  a { font-size: .8rem; }
  @media (max-width: 600px) { padding: 1.4rem; > a { width: 100%; } }
`

export function DaycarePlans() {
  const lowestDailyPrice = Math.min(...daycareConfig.plans.map(plan => plan.price / plan.days))
  return (
    <Shell id="planos" aria-labelledby="plans-title">
      <Container>
        <Reveal>
          <Label>Creche Auzen · Pacotes e valores</Label>
          <Intro>
            <h2 id="plans-title">Mais dias juntos.</h2>
            <p>Escolha a frequência que combina com vocês. Quanto mais dias de quintal, menor o valor de cada diária.</p>
            <Period><CalendarDays size={16} aria-hidden="true" />Pacotes mensais · segunda a sexta</Period>
          </Intro>
        </Reveal>
        <Grid>
          {daycareConfig.plans.map(plan => {
            const featured = plan.price / plan.days === lowestDailyPrice
            return (
              <Plan key={plan.frequency} $featured={featured} aria-label={`Plano ${plan.frequency} ${plan.frequency === 1 ? 'vez' : 'vezes'} por semana`}>
                {featured && <Badge>Menor valor por dia</Badge>}
                <h3>{plan.frequency}× por semana</h3>
                <p>{plan.description}</p>
                <Price $featured={featured}><span>R$</span><strong>{plan.price}</strong><small>por mês</small></Price>
                <DailyPrice $featured={featured}>{money(plan.price / plan.days)} por dia</DailyPrice>
                <Benefits>
                  <li><PawPrint size={17} aria-hidden="true" /><span>{plan.days} diárias por mês</span></li>
                  <li><PawPrint size={17} aria-hidden="true" /><span>Brincadeiras e convivência</span></li>
                  <li><PawPrint size={17} aria-hidden="true" /><span>Contato com a natureza</span></li>
                </Benefits>
                <ButtonLink
                  href={`https://wa.me/${contactConfig.whatsapp.digits}?text=${encodeURIComponent(`Olá! Vi os pacotes da Creche Auzen no site e tenho interesse no plano de ${plan.frequency} ${plan.frequency === 1 ? 'vez' : 'vezes'} por semana (${plan.days} diárias por mês), por ${money(plan.price)} mensais. Podemos conversar sobre disponibilidade e adaptação do meu cão?`)}`}
                  target="_blank" rel="noreferrer" variant="primary"
                  aria-label={`Consultar plano de ${plan.frequency} ${plan.frequency === 1 ? 'vez' : 'vezes'} por semana`}
                  data-service="daycare" data-analytics-location="daycare_plans"
                >Quero este plano <ArrowUpRight size={16} aria-hidden="true" /></ButtonLink>
              </Plan>
            )
          })}
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
