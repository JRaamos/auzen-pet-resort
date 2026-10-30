import { ArrowUpRight, Check, Clock3, Moon } from 'lucide-react'
import styled from 'styled-components'
import { ButtonLink } from '../components/Button'
import { Container } from '../components/Container'
import { ResponsiveImage } from '../components/ResponsiveImage'
import { Reveal } from '../components/Reveal'
import { WhatsAppIcon } from '../components/SocialIcons'
import { bookingConfig } from '../config/booking'
import { createWhatsAppUrl } from '../config/contact'
import { serviceDetails } from '../data/services'
import { money } from '../utils/booking'

const Shell = styled.section`
  padding: clamp(3.5rem, 7vw, 7rem) 0;
  background: ${({ theme }) => theme.colors.warmWhite};
  color: ${({ theme }) => theme.colors.forest};
  scroll-margin-top: 1rem;
`
const Layout = styled(Container)`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: center;
  gap: clamp(2.5rem, 6vw, 6rem);
  > div { min-width: 0; }
  @media (max-width: 800px) { grid-template-columns: 1fr; }
`
const Photography = styled.figure`
  position: relative;
  margin: 0;
  padding: 0 1.5rem 0 0;
  figcaption { margin-top: 1.75rem; max-width: 24rem; font-size: .64rem; color: ${({ theme }) => theme.colors.brown}; }
  @media (max-width: 800px) { padding-right: 1rem; figcaption { margin-top: 1.25rem; } }
`
const MainPhoto = styled.div`
  position: relative;
  height: clamp(30rem, 49vw, 43rem);
  isolation: isolate;
  &::before {
    position: absolute;
    z-index: -1;
    inset: 1.2rem -1.2rem -1.2rem 1.2rem;
    background: ${({ theme }) => theme.colors.sand};
    border-radius: 2rem;
    content: '';
  }
  > picture { border-radius: 2rem; overflow: hidden; }
  @media (max-width: 800px) { height: min(115vw, 35rem); }
`
const InsetPhoto = styled.div`
  position: absolute;
  right: -.5rem;
  bottom: 4.5rem;
  width: 36%;
  aspect-ratio: 1;
  border: .4rem solid ${({ theme }) => theme.colors.warmWhite};
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  @media (max-width: 800px) { right: -.25rem; width: 31%; bottom: 4rem; }
`
const PhotoBadge = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 0;
  display: flex;
  align-items: center;
  gap: .6rem;
  padding: .8rem 1rem;
  color: ${({ theme }) => theme.colors.warmWhite};
  background: ${({ theme }) => theme.colors.forest};
  border-radius: 1rem 1rem 0 1rem;
  font-size: .72rem;
  font-weight: 700;
  svg { color: ${({ theme }) => theme.colors.sand}; }
`
const Label = styled.p`
  margin-bottom: .8rem;
  color: ${({ theme }) => theme.colors.terracottaDark};
  font-size: .7rem;
  font-weight: 750;
  letter-spacing: .16em;
  text-transform: uppercase;
`
const Title = styled.h2`
  margin-bottom: 1rem;
  max-width: 16ch;
  font: 450 clamp(2.7rem, 4.5vw, 4.4rem)/1 ${({ theme }) => theme.typography.display};
  letter-spacing: -.045em;
`
const Intro = styled.p`
  margin-bottom: 1.4rem;
  color: ${({ theme }) => theme.colors.brown};
  font-size: .9rem;
`
const Benefits = styled.ul`
  display: grid;
  gap: .7rem;
  padding: 0;
  margin: 0 0 1.75rem;
  list-style: none;
  li { display: flex; align-items: flex-start; gap: .6rem; font-size: .8rem; }
  svg { flex: 0 0 auto; margin-top: .15rem; color: ${({ theme }) => theme.colors.terracottaDark}; }
`
const Rates = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: .75rem;
  article {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 1.15rem .5rem;
    border: 1.5px solid ${({ theme }) => theme.colors.sand};
    border-radius: 1.25rem;
    text-align: center;
  }
  article:first-child { color: ${({ theme }) => theme.colors.warmWhite}; background: ${({ theme }) => theme.colors.forest}; border-color: ${({ theme }) => theme.colors.forest}; }
  h3 { margin-bottom: .65rem; font-size: .7rem; text-transform: uppercase; letter-spacing: .04em; }
  strong { font-size: clamp(1.45rem, 2.5vw, 2rem); letter-spacing: -.055em; white-space: nowrap; }
  small { font-size: .67rem; margin-top: .25rem; }
  article:first-child strong { color: ${({ theme }) => theme.colors.sand}; }
`
const Note = styled.p`
  margin: .75rem 0 1.25rem;
  color: ${({ theme }) => theme.colors.brown};
  font-size: .7rem;
`
const LongerStay = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: .8rem;
  padding: 1rem 1.1rem;
  margin-bottom: 1rem;
  border-radius: 1rem;
  background: ${({ theme }) => theme.colors.sand};
  h3 { margin: 0 0 .25rem; font-size: .8rem; }
  p { margin: 0; font-size: .7rem; color: ${({ theme }) => theme.colors.brown}; }
  > strong { font-size: .85rem; white-space: nowrap; }
  @media (max-width: 380px) { flex-direction: column; align-items: flex-start; }
`
const Schedule = styled.div`
  display: flex;
  align-items: flex-start;
  gap: .6rem;
  margin: 1.1rem 0 1.5rem;
  color: ${({ theme }) => theme.colors.brown};
  font-size: .72rem;
  svg { flex: 0 0 auto; color: ${({ theme }) => theme.colors.terracottaDark}; margin-top: .1rem; }
`
const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  a { font-size: .78rem; }
  @media (max-width: 480px) { align-items: flex-start; flex-direction: column; > a:first-child { width: 100%; } }
`

export function HotelShowcase({ page = false }: { page?: boolean }) {
  return <Shell id="hotel" aria-labelledby="hotel-title"><Layout>
    <Reveal><Photography>
      <MainPhoto><ResponsiveImage base={serviceDetails.hotel.image} alt={serviceDetails.hotel.alt} width={900} height={1125} sizes="(max-width: 800px) 90vw, 45vw" loading={page ? 'eager' : 'lazy'} objectPosition="50% 40%" /></MainPhoto>
      <InsetPhoto><ResponsiveImage base="open-lawn" alt="Área gramada e arborizada do Auzen" width={900} height={1600} sizes="(max-width: 800px) 28vw, 200px" objectPosition="50% 40%" /></InsetPhoto>
      <PhotoBadge><Moon size={20} aria-hidden="true" />Carinho em cada estadia</PhotoBadge>
      <figcaption>Imagem principal ilustrativa, recriada a partir de uma foto do Auzen. No detalhe, foto real do jardim.</figcaption>
    </Photography></Reveal>
    <Reveal delay={.1}>
      <Label>Hotel para cães · Auzen Pet Resort</Label>
      <Title as={page ? 'h1' : 'h2'} id="hotel-title" tabIndex={page ? -1 : undefined}>Uma estadia com clima de casa.</Title>
      <Intro>Enquanto você viaja, ele encontra acolhimento, natureza e atenção à rotina. Um lugar para ficar bem, com o jeito Auzen de cuidar.</Intro>
      <Benefits>
        <li><Check size={18} aria-hidden="true" />Rotina e cuidados combinados com a família</li>
        <li><Check size={18} aria-hidden="true" />Espaço ao ar livre para explorar</li>
        <li><Check size={18} aria-hidden="true" />Alimentação nos horários informados pelo tutor</li>
      </Benefits>
      <Rates aria-label="Diárias do hotel por porte">
        {(['Pequeno', 'Médio'] as const).map(size => <article key={size}><h3>Porte {size.toLowerCase()}</h3><strong>{money(bookingConfig.rates.hotel[size])}</strong><small>por noite · por cão</small></article>)}
      </Rates>
      <Note>Portes grande e gigante: sob consulta. Traga a alimentação habitual do seu cão.</Note>
      <LongerStay><div><h3>Vai ficar mais dias?</h3><p>A partir de {bookingConfig.promotion.minUnits} noites · código {bookingConfig.promotion.code}</p></div><strong>{bookingConfig.promotion.percent}% de desconto</strong></LongerStay>
      <Schedule><Clock3 size={17} aria-hidden="true" /><span>Check-in das 7h às 17h.<br />Check-out até as 9h do dia seguinte.</span></Schedule>
      <Actions>
        <ButtonLink href={createWhatsAppUrl('hotel')} target="_blank" rel="noreferrer" data-service="hotel" data-analytics-location="hotel_showcase"><WhatsAppIcon width={18} height={18} />Consultar datas</ButtonLink>
        <ButtonLink href="/reservar?servico=hotel" variant="text">Planejar hospedagem <ArrowUpRight size={16} aria-hidden="true" /></ButtonLink>
      </Actions>
    </Reveal>
  </Layout></Shell>
}
