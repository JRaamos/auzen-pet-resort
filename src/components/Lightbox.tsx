import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import type { GalleryItem } from '../data/gallery'
import { ResponsiveImage } from './ResponsiveImage'

const Overlay = styled.dialog`
  position: fixed;
  z-index: 100;
  inset: 0;
  width: 100%;
  max-width: none;
  height: 100%;
  max-height: none;
  margin: 0;
  border: 0;
  &[open] { display: grid; }
  &::backdrop { background: rgba(17, 29, 24, 0.96); }
  place-items: center;
  padding: clamp(1rem, 3vw, 2.5rem);
  color: ${({ theme }) => theme.colors.warmWhite};
  background: rgba(17, 29, 24, 0.96);
  backdrop-filter: blur(16px);
`

const Figure = styled.figure`
  display: grid;
  width: min(100%, 72rem);
  max-height: calc(100svh - 5rem);
  margin: 0;
  place-items: center;
  gap: 0.9rem;

  picture {
    width: auto;
    max-width: 100%;
    height: min(76svh, 52rem);
  }

  img {
    width: auto;
    max-width: 100%;
    height: 100%;
    object-fit: contain;
  }

  figcaption {
    color: rgba(255, 255, 255, 0.72);
    font-size: 0.82rem;
    text-align: center;
  }
`

const IconButton = styled.button<{ $position?: 'left' | 'right' }>`
  position: fixed;
  z-index: 2;
  top: ${({ $position }) => ($position ? '50%' : '1.25rem')};
  right: ${({ $position }) => ($position === 'right' ? '1.25rem' : $position ? 'auto' : '1.25rem')};
  left: ${({ $position }) => ($position === 'left' ? '1.25rem' : 'auto')};
  display: grid;
  width: 3rem;
  height: 3rem;
  padding: 0;
  color: ${({ theme }) => theme.colors.warmWhite};
  border: 1px solid ${({ theme }) => theme.colors.lightLine};
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  cursor: pointer;
  place-items: center;
  transform: ${({ $position }) => ($position ? 'translateY(-50%)' : 'none')};
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.terracotta};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: auto;
    right: ${({ $position }) => ($position === 'right' ? 'calc(50% - 4rem)' : $position ? 'auto' : '1rem')};
    bottom: ${({ $position }) => ($position ? '1rem' : 'auto')};
    left: ${({ $position }) => ($position === 'left' ? 'calc(50% - 4rem)' : 'auto')};
    transform: none;

    &:not([data-direction]) {
      top: 1rem;
      right: 1rem;
      bottom: auto;
    }
  }
`

interface LightboxProps {
  items: GalleryItem[]
  activeIndex: number
  onClose: () => void
  onChange: (index: number) => void
}

export function Lightbox({ items, activeIndex, onClose, onChange }: LightboxProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const activeItem = items[activeIndex]

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    dialog.current?.showModal()
    document.body.classList.add('lightbox-open')
    closeButton.current?.focus({ preventScroll: true })
    const element = dialog.current
    return () => {
      element?.close()
      document.body.classList.remove('lightbox-open')
      previousFocus?.focus({ preventScroll: true })
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose() }
      if (event.key === 'ArrowLeft') onChange((activeIndex - 1 + items.length) % items.length)
      if (event.key === 'ArrowRight') onChange((activeIndex + 1) % items.length)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeIndex, items.length, onChange, onClose])

  return createPortal(
    <Overlay ref={dialog} aria-label="Fotografia ampliada" onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <IconButton ref={closeButton} type="button" aria-label="Fechar fotografia" onClick={onClose}>
        <X size={21} aria-hidden="true" />
      </IconButton>
      <IconButton
        type="button"
        $position="left"
        data-direction="previous"
        aria-label="Fotografia anterior"
        onClick={(event) => {
          event.stopPropagation()
          onChange((activeIndex - 1 + items.length) % items.length)
        }}
      >
        <ArrowLeft size={21} aria-hidden="true" />
      </IconButton>
      <Figure>
        <ResponsiveImage
          base={activeItem.base}
          alt={activeItem.alt}
          width={activeItem.width}
          height={activeItem.height}
          maxWidth={activeItem.maxWidth}
          sizes="90vw"
          objectPosition={activeItem.position}
        />
        <figcaption>{activeItem.caption}</figcaption>
      </Figure>
      <IconButton
        type="button"
        $position="right"
        data-direction="next"
        aria-label="Próxima fotografia"
        onClick={(event) => {
          event.stopPropagation()
          onChange((activeIndex + 1) % items.length)
        }}
      >
        <ArrowRight size={21} aria-hidden="true" />
      </IconButton>
    </Overlay>, document.body,
  )
}
