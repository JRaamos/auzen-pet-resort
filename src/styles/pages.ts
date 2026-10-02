import styled from 'styled-components'
export const PageShell = styled.div`
  padding-top: 5.6rem;
  @media (max-width: 1100px) {
    padding-top: 4.8rem;
  }
`
export const Section = styled.section`
  padding: clamp(3.5rem, 7vw, 6.5rem) 0;
`
export const Eyebrow = styled.p`
  color: ${({ theme }) => theme.colors.terracotta};
  font-size: 0.7rem;
  font-weight: 750;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin-bottom: 1rem;
`
export const DisplayTitle = styled.h1`
  font-family: ${({ theme }) => theme.typography.display};
  font-size: clamp(2.8rem, 6vw, 6rem);
  font-weight: 450;
  letter-spacing: -0.045em;
  line-height: 0.98;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.forest};
`
export const Heading = styled.h2`
  font-family: ${({ theme }) => theme.typography.display};
  font-size: clamp(2.2rem, 4vw, 4rem);
  font-weight: 450;
  letter-spacing: -0.04em;
  line-height: 1.06;
  color: ${({ theme }) => theme.colors.forest};
`
export const Lead = styled.p`
  max-width: 38rem;
  color: ${({ theme }) => theme.colors.brown};
  font-size: clamp(0.95rem, 1.4vw, 1.08rem);
`
export const Split = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 6vw, 6rem);
  align-items: center;
  > * {
    min-width: 0;
  }
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`
export const Photo = styled.figure`
  margin: 0;
  img {
    width: 100%;
    aspect-ratio: 4/5;
    object-fit: cover;
    border-radius: 0 3rem 0 0;
  }
  figcaption {
    font-size: 0.75rem;
    margin-top: 0.8rem;
    color: ${({ theme }) => theme.colors.forestMuted};
  }
`
export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1.8rem;
`
export const Note = styled.p`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.brown};
  line-height: 1.7;
`
export const RuleList = styled.div`>article{display:grid;grid-template-columns:2rem 1fr;gap:1rem;padding:1.6rem 0;border-bottom:1px solid ${({ theme }) => theme.colors.line};svg{color:${({ theme }) => theme.colors.terracotta};}h3{margin:0 0 .4rem;font-size:1rem;}p{margin:0;font-size:.9rem;color:${({ theme }) => theme.colors.brown};}`
