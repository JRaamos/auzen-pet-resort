import { Link } from 'react-router-dom'
import { ArrowUpRight, Check, Clock3 } from 'lucide-react'
import styled from 'styled-components'
import { ButtonLink } from '../components/Button'
import { Container } from '../components/Container'
import { ResponsiveImage } from '../components/ResponsiveImage'
import { WhatsAppIcon } from '../components/SocialIcons'
import { createWhatsAppUrl } from '../config/contact'
import { serviceDetails } from '../data/services'
import { Actions, DisplayTitle, Eyebrow, Heading, Lead, Note, PageShell, Photo, RuleList, Section, Split } from '../styles/pages'

const Questions = styled.div`
  max-width: 52rem;
  margin-top: 2rem;
  details { padding: 1.3rem 0; border-bottom: 1px solid ${({ theme }) => theme.colors.line}; }
  summary { cursor: pointer; font-weight: 700; padding: .3rem 0; }
  p { color: ${({ theme }) => theme.colors.brown}; }
`
const ServicePhoto = styled(Photo)`
  picture { height: auto; aspect-ratio: 4/5; max-height: 600px; overflow: hidden; border-radius: 0 3rem 0 0; }
  img { height: 100%; }
`
export function ServicePage({ service }: { service: 'hotel' | 'daycare' }) {
  const info = serviceDetails[service]
  return <PageShell>
    <Section><Container><Split>
      <div>
        <Eyebrow>Auzen Pet Resort · Lauro de Freitas, BA</Eyebrow>
        <DisplayTitle>{info.name}</DisplayTitle>
        <Lead>{info.intro}</Lead>
        <Actions>
          <ButtonLink href={createWhatsAppUrl(service)} target="_blank" rel="noreferrer" data-service={service} data-analytics-location="service_hero"><WhatsAppIcon width={19} height={19} /> Consultar {service === 'hotel' ? 'hospedagem' : 'creche'}</ButtonLink>
          <ButtonLink href={`/reservar?servico=${service}`} variant="text">Planejar reserva <ArrowUpRight size={17} /></ButtonLink>
        </Actions>
        <Note><Clock3 size={15} aria-hidden="true" /> {info.schedule}</Note>
      </div>
      <ServicePhoto><ResponsiveImage base={info.image} alt={info.alt} width={900} height={1600} sizes="(max-width: 800px) 90vw, 45vw" loading="eager" /><figcaption>Um momento real no espaço do Auzen.</figcaption></ServicePhoto>
    </Split></Container></Section>
    <Section style={{ paddingTop: 0 }}><Container><Split>
      <div><Eyebrow>Do jeito do seu cão</Eyebrow><Heading>{info.heading}</Heading><Lead>{info.detail}</Lead><Link to="/informacoes">Veja o que levar e como se preparar →</Link></div>
      <RuleList>{info.benefits.map((benefit) => <article key={benefit}><Check aria-hidden="true" /><div><h3>{benefit}</h3></div></article>)}</RuleList>
    </Split></Container></Section>
    <Section><Container><Eyebrow>Antes de combinar</Eyebrow><Heading>Perguntas sobre {service === 'hotel' ? 'a hospedagem' : 'a creche'}.</Heading>
      <Questions>{info.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</Questions>
      <Actions><ButtonLink href={createWhatsAppUrl(service)} target="_blank" rel="noreferrer" data-service={service} data-analytics-location="service_faq"><WhatsAppIcon width={19} height={19} /> Falar com a equipe</ButtonLink><ButtonLink href="/servicos" variant="text">Consultar serviços e valores <ArrowUpRight size={17} /></ButtonLink></Actions>
      <Note>Valores e disponibilidade são confirmados pela equipe. A solicitação pelo site não confirma uma reserva.</Note>
    </Container></Section>
  </PageShell>
}
