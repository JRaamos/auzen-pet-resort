import { ArrowUpRight } from 'lucide-react'
import styled from 'styled-components'
import { Container } from '../components/Container'
import { Reveal } from '../components/Reveal'
import { ResponsiveImage } from '../components/ResponsiveImage'
import { ButtonLink } from '../components/Button'
import { createWhatsAppUrl } from '../config/contact'

const Shell = styled.section`
  padding: ${({ theme }) => theme.spacing.section} 0;
  background: ${({ theme }) => theme.colors.sand};
  color: ${({ theme }) => theme.colors.forest};
`
const Layout = styled(Container)`
  display: grid;
  grid-template-columns: .9fr 1fr;
  align-items: center;
  gap: clamp(2rem, 7vw, 7rem);
  figure { margin: 0; height: clamp(25rem, 45vw, 39rem); overflow: hidden; border-radius: 45% 45% 1rem 1rem; }
  h2 { margin-bottom: 2rem; font: 430 clamp(2.8rem, 5vw, 4.8rem)/.98 ${({ theme }) => theme.typography.display}; letter-spacing: -.04em; }
  ol { list-style: none; padding: 0; margin: 0 0 2rem; counter-reset: visit; }
  li { display: grid; grid-template-columns: 2rem 1fr; gap: 1rem; padding-block: 1.2rem; border-bottom: 1px solid ${({ theme }) => theme.colors.line}; counter-increment: visit; }
  li::before { content: '0' counter(visit); color: ${({ theme }) => theme.colors.terracottaDark}; font-size: .75rem; padding-top: .2rem; }
  h3 { margin-bottom: .3rem; font-size: .95rem; }
  li p { margin: 0; font-size: .8rem; color: ${({ theme }) => theme.colors.brown}; }
  @media (max-width: 800px) { grid-template-columns: 1fr; figure { height: 24rem; } }
`
const Label = styled.p`
  color: ${({ theme }) => theme.colors.terracottaDark};
  font-size: .7rem;
  font-weight: 750;
  letter-spacing: .16em;
  text-transform: uppercase;
`

export function FirstVisit() {
  return <Shell id="primeira-visita" aria-labelledby="visit-title"><Layout>
    <Reveal><figure><ResponsiveImage base="human-care" alt="Carinho e companhia com os cães no jardim do Auzen" width={900} height={1600} sizes="(max-width: 800px) 90vw, 45vw" objectPosition="50% 45%" /></figure></Reveal>
    <Reveal delay={.1}><Label>Vamos nos conhecer?</Label><h2 id="visit-title">O primeiro encontro de uma boa amizade.</h2>
      <ol>
        <li><div><h3>Conte um pouquinho sobre ele.</h3><p>Fale com a equipe pelo WhatsApp sobre a rotina, a saúde e o jeito do seu cão.</p></div></li>
        <li><div><h3>Venha conhecer o nosso quintal.</h3><p>Combine uma visita e converse sobre a adaptação e os cuidados que ele precisa.</p></div></li>
        <li><div><h3>Escolha os dias de diversão.</h3><p>Combine a frequência da creche ou as datas da hospedagem e confirme a disponibilidade com a equipe.</p></div></li>
      </ol>
      <ButtonLink href={createWhatsAppUrl('visit')} target="_blank" rel="noreferrer" data-analytics-location="first_visit">Combinar uma visita <ArrowUpRight size={17} aria-hidden="true" /></ButtonLink>
    </Reveal>
  </Layout></Shell>
}
