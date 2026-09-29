import { Expand } from 'lucide-react'
import { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Container } from '../components/Container'
import { Lightbox } from '../components/Lightbox'
import { ResponsiveImage } from '../components/ResponsiveImage'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { galleryItems, type GalleryLayout } from '../data/gallery'
import { trackEvent } from '../utils/analytics'

const GalleryShell = styled.section`
  padding: ${({ theme }) => theme.spacing.section} 0;
  background: ${({ theme }) => theme.colors.cream};
`

const GalleryIntro = styled(Container)`
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 3rem;
  margin-bottom: clamp(3rem, 7vw, 6rem);

  > p {
    max-width: 25rem;
    margin-bottom: 0;
    color: ${({ theme }) => theme.colors.brown};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    align-items: flex-start;
    flex-direction: column;
  }
`

const Grid = styled(Container)`
  display: grid;
  grid-auto-rows: 4.5rem;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: clamp(0.65rem, 1.4vw, 1rem);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-auto-rows: auto;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const getGridSpan = (layout: GalleryLayout, index: number) => {
  if (index === 0) return { columns: 7, rows: 7 }
  if (index === 1) return { columns: 5, rows: 7 }
  if (layout === 'wide') return { columns: 8, rows: 6 }
  if (layout === 'square') return { columns: 6, rows: 6 }
  return { columns: 6, rows: 6 }
}

const GalleryButton = styled.button<{ $columns: number; $rows: number; $layout: GalleryLayout }>`
  position: relative;
  overflow: hidden;
  padding: 0;
  color: ${({ theme }) => theme.colors.white};
  border: 0;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.forest};
  cursor: zoom-in;
  grid-column: span ${({ $columns }) => $columns};
  grid-row: span ${({ $rows }) => $rows};

  picture,
  img {
    transition: transform ${({ theme }) => theme.transitions.slow};
  }

  &::after {
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, rgba(16, 39, 31, 0.7), transparent 55%);
    content: '';
    opacity: 0.75;
    transition: opacity ${({ theme }) => theme.transitions.base};
  }

  &:hover picture,
  &:focus-visible picture,
  &:hover img,
  &:focus-visible img {
    transform: scale(1.035);
  }

  &:hover::after,
  &:focus-visible::after {
    opacity: 1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    aspect-ratio: ${({ $layout }) => ($layout === 'wide' ? '1.35' : $layout === 'square' ? '1' : '0.74')};
    grid-column: span ${({ $layout }) => ($layout === 'wide' ? 2 : 1)};
    grid-row: auto;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    aspect-ratio: ${({ $layout }) => ($layout === 'wide' ? '1.3' : '0.82')};
    grid-column: span ${({ $layout }) => ($layout === 'wide' ? 2 : 1)};
  }
`

const Caption = styled.span`
  position: absolute;
  z-index: 2;
  right: 1rem;
  bottom: 1rem;
  left: 1rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.76rem;
  font-weight: 650;
  text-align: left;

  svg {
    flex: 0 0 auto;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    > span {
      display: none;
    }
  }
`

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const closeLightbox = useCallback(() => setActiveIndex(null), [])
  const changeLightbox = useCallback((index: number) => setActiveIndex(index), [])

  const openLightbox = (index: number) => {
    setActiveIndex(index)
    trackEvent('gallery_open', galleryItems[index].base)
  }

  return (
    <GalleryShell id="galeria">
      <GalleryIntro>
        <Reveal>
          <SectionHeading eyebrow="Galeria">Pequenos retratos de um dia no Auzen.</SectionHeading>
        </Reveal>
        <Reveal delay={0.12}>
          <p>Uma pausa na sombra, uma nova descoberta, um encontro no jardim. Conheça alguns momentos por aqui.</p>
        </Reveal>
      </GalleryIntro>
      <Grid>
        {galleryItems.map((item, index) => {
          const span = getGridSpan(item.layout, index)
          return (
            <GalleryButton
              key={item.base}
              type="button"
              $columns={span.columns}
              $rows={span.rows}
              $layout={item.layout}
              onClick={() => openLightbox(index)}
              aria-label={`Ampliar fotografia: ${item.caption}`}
            >
              <ResponsiveImage
                base={item.base}
                alt={item.alt}
                width={item.width}
                height={item.height}
                maxWidth={item.maxWidth}
                sizes="(max-width: 520px) 46vw, (max-width: 800px) 48vw, 55vw"
                objectPosition={item.position}
              />
              <Caption>
                <span>{item.caption}</span>
                <Expand size={18} aria-hidden="true" />
              </Caption>
            </GalleryButton>
          )
        })}
      </Grid>
      {activeIndex !== null && (
        <Lightbox items={galleryItems} activeIndex={activeIndex} onClose={closeLightbox} onChange={changeLightbox} />
      )}
    </GalleryShell>
  )
}
