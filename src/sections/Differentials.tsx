import { HeartHandshake, Home, Leaf, MoveRight } from 'lucide-react'
import styled from 'styled-components'
import { Container } from '../components/Container'
import { ResponsiveImage } from '../components/ResponsiveImage'
import { Reveal } from '../components/Reveal'

const items = [
  { icon: Leaf, title: 'Espaço para explorar', text: 'Gramado, jardim e caminhos que convidam ao movimento.' },
  { icon: MoveRight, title: 'Tempo para conviver', text: 'Um ambiente onde brincar e dividir o dia fazem parte da experiência.' },
  { icon: HeartHandshake, title: 'Cuidado próximo', text: 'Uma relação simples, humana e aberta à conversa com cada tutor.' },
  { icon: Home, title: 'Ambiente acolhedor', text: 'Menos cara de instalação, mais sensação de quintal e casa.' },
]

const Shell = styled.section`
  padding: ${({ theme }) => theme.spacing.section} 0;
  background: ${({ theme }) => theme.colors.sand};
`

const Grid = styled(Container)`
  display: grid;
  grid-template-columns: minmax(18rem, 0.8fr) minmax(0, 1.2fr);
  gap: clamp(3rem, 8vw, 8rem);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`

const ImageWrap = styled.div`
  position: relative;
  height: clamp(36rem, 68vw, 51rem);
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.organic};

  &::after {
    position: absolute;
    inset: 1.1rem;
    border: 1px solid rgba(255, 255, 255, 0.52);
    border-radius: inherit;
    content: '';
    pointer-events: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: min(120vw, 42rem);
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  > div > p {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.terracottaDark};
    font-size: 0.7rem;
    font-weight: 750;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  > div > h2 {
    max-width: 10ch;
    margin-bottom: clamp(2.5rem, 5vw, 4rem);
    font-family: ${({ theme }) => theme.typography.display};
    font-size: clamp(2.8rem, 6vw, 5rem);
    font-weight: 430;
    letter-spacing: -0.048em;
    line-height: 0.95;
  }
`

const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`

const Item = styled.li`
  display: grid;
  padding: 1.35rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.line};
  grid-template-columns: auto 1fr;
  gap: 1.1rem;

  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  }

  svg {
    margin-top: 0.22rem;
    color: ${({ theme }) => theme.colors.terracottaDark};
  }

  h3 {
    margin-bottom: 0.3rem;
    font-family: ${({ theme }) => theme.typography.display};
    font-size: 1.5rem;
    font-weight: 500;
    letter-spacing: -0.025em;
  }

  p {
    margin-bottom: 0;
    color: ${({ theme }) => theme.colors.brown};
    font-size: 0.82rem;
  }
`

export function Differentials() {
  return (
    <Shell aria-labelledby="differentials-title">
      <Grid>
        <Reveal>
          <ImageWrap>
            <ResponsiveImage
              base="garden-dog"
              alt="Cão sentado no gramado ao lado do jardim florido"
              width={900}
              height={1600}
              maxWidth={900}
              sizes="(max-width: 800px) 90vw, 42vw"
              objectPosition="50% 52%"
            />
          </ImageWrap>
        </Reveal>
        <Content>
          <Reveal>
            <p>O jeito Auzen</p>
            <h2 id="differentials-title">O simples bem-feito faz toda a diferença.</h2>
          </Reveal>
          <List role="list">
            {items.map((item, index) => {
              const Icon = item.icon
              return (
                <Item key={item.title}>
                  <Reveal delay={index * 0.06}>
                    <Icon size={21} aria-hidden="true" />
                  </Reveal>
                  <Reveal delay={index * 0.06 + 0.03}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </Reveal>
                </Item>
              )
            })}
          </List>
        </Content>
      </Grid>
    </Shell>
  )
}
