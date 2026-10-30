import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { ArrowRight } from 'lucide-react'
import { Container } from '../components/Container'
import { PageIntro, ReserveCallout } from '../components/PageLayout'
import { ResponsiveImage } from '../components/ResponsiveImage'
import { Reveal } from '../components/Reveal'
import { guides, getGuide } from '../data/guides'
import { Actions, Heading, Lead, Note, PageShell, Section } from '../styles/pages'

const Trail = styled.nav`
  padding-top: 1.6rem; font-size: .8rem;
  ol { display: flex; flex-wrap: wrap; gap: .6rem; list-style: none; margin: 0; padding: 0; }
  li + li::before { content: '/'; margin-right: .6rem; opacity: .5; }
  a { text-decoration: underline; text-underline-offset: .2em; }
`
const Stories = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 3rem;
  a { display: block; }
  picture { height: auto; }
  img { width: 100%; height: auto; aspect-ratio: 4/3; object-fit: cover; object-position: 50% 35%; border-radius: 0 2rem 0 0; transition: filter 180ms; }
  a:hover img { filter: brightness(1.05); }
  h2 { margin-top: 1.5rem; font-size: clamp(2rem, 3vw, 3rem); }
  span { display: inline-flex; align-items: center; gap: .5rem; color: ${({ theme }) => theme.colors.terracottaDark}; }
  @media(max-width: 700px) { grid-template-columns: 1fr; }
`
const Cover = styled.figure`
  margin: 0;
  picture { height: auto; }
  img { width: 100%; height: auto; max-height: 620px; aspect-ratio: 2/1; object-fit: cover; object-position: 50% 20%; }
  @media(max-width: 600px) { img { aspect-ratio: 4/3; } }
`
const Reading = styled.div`
  display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 2.3fr); gap: clamp(2rem, 6vw, 6rem);
  aside { align-self: start; position: sticky; top: 7rem; }
  aside ol { padding-left: 1.2rem; }
  aside li { margin-bottom: .9rem; }
  a { text-decoration: underline; text-underline-offset: .2em; }
  article { max-width: 48rem; }
  article section { margin-bottom: 3rem; scroll-margin-top: 7rem; }
  h2 { font-size: clamp(2rem, 3.2vw, 3rem); margin-bottom: 1.3rem; }
  @media(max-width: 800px) { grid-template-columns: 1fr; aside { position: static; } }
`

export function GuidesPage() {
  const { pathname } = useLocation()
  const guide = getGuide(pathname)
  const related = guides.find(item => item.slug !== guide?.slug)!
  return <PageShell>
    <Container><Trail aria-label="Caminho da página"><ol>
      <li><Link to="/">Início</Link></li>
      <li>{guide ? <Link to="/guias">Guias</Link> : <span aria-current="page">Guias</span>}</li>
      {guide && <li aria-current="page">{guide.title}</li>}
    </ol></Trail></Container>
    <PageIntro eyebrow="Guias Auzen · Lauro de Freitas" title={guide?.title || 'Mais tranquilidade para planejar.'}>
      <Lead>{guide?.description || 'Respostas práticas para escolher entre hotel e creche e preparar a próxima estadia do seu cão.'}</Lead>
      {guide && <Note>Por Auzen Pet Resort · Orientações para planejar sua estadia</Note>}
    </PageIntro>
    {guide ? <>
      <Container><Cover><ResponsiveImage base={guide.image} alt={guide.alt} width={900} height={600} loading="eager" sizes="90vw" /></Cover></Container>
      <Section><Container><Reading>
        <aside><nav aria-label="Neste guia"><strong>Neste guia</strong><ol>{guide.sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ol></nav></aside>
        <article>{guide.sections.map(section => <section id={section.id} key={section.id}><Heading>{section.title}</Heading>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}
          <Heading>Continue planejando</Heading>
          <Actions><Link to="/hotel">Hotel para cães em Lauro de Freitas</Link><Link to="/creche">Conheça a creche canina</Link><Link to="/servicos">Serviços e valores</Link><Link to="/informacoes">O que levar</Link><Link to="/contato">Contato e localização</Link></Actions>
          <Note>Leia também: <Link to={`/guias/${related.slug}`}>{related.title}</Link></Note>
        </article>
      </Reading></Container></Section>
    </> : <Section style={{ paddingTop: 0 }}><Container><Stories>{guides.map((item, index) => <Reveal key={item.slug} delay={index * .08}><Link to={`/guias/${item.slug}`}>
      <ResponsiveImage base={item.image} alt={item.alt} width={900} height={675} sizes="(max-width: 700px) 90vw, 45vw" />
      <Heading>{item.title}</Heading><p>{item.description}</p><span>Ler o guia <ArrowRight size={17} aria-hidden="true" /></span>
    </Link></Reveal>)}</Stories></Container></Section>}
    <ReserveCallout />
  </PageShell>
}
