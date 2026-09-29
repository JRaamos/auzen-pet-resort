export type GalleryLayout = 'wide' | 'portrait' | 'square'

export interface GalleryItem {
  base: string
  alt: string
  caption: string
  width: number
  height: number
  maxWidth: 900 | 1600
  layout: GalleryLayout
  position?: string
}

export const galleryItems: GalleryItem[] = [
  {
    base: 'brown-dog',
    alt: 'Cão de pelagem marrom em uma área aberta do Auzen',
    caption: 'Espaço para observar, farejar e explorar.',
    width: 1600,
    height: 900,
    maxWidth: 1600,
    layout: 'wide',
    position: '50% 42%',
  },
  {
    base: 'garden-dog',
    alt: 'Cão sentado no gramado ao lado das flores amarelas',
    caption: 'Jardim, sombra e companhia.',
    width: 900,
    height: 1600,
    maxWidth: 900,
    layout: 'portrait',
    position: '50% 54%',
  },
  {
    base: 'dog-running',
    alt: 'Cão caminhando pelo gramado em frente ao jardim',
    caption: 'Um quintal cheio de caminhos.',
    width: 900,
    height: 1600,
    maxWidth: 900,
    layout: 'portrait',
    position: '50% 58%',
  },
  {
    base: 'open-lawn',
    alt: 'Área gramada ampla com um cão e galinhas ao fundo',
    caption: 'Natureza presente na rotina do espaço.',
    width: 900,
    height: 1600,
    maxWidth: 900,
    layout: 'portrait',
    position: '50% 38%',
  },
  {
    base: 'sunglasses-dog',
    alt: 'Cão descansando com óculos escuros em um banco verde',
    caption: 'Também tem hora de desacelerar.',
    width: 900,
    height: 1600,
    maxWidth: 900,
    layout: 'square',
    position: '50% 35%',
  },
  {
    base: 'golden-walk',
    alt: 'Cão claro caminhando pelo jardim do Auzen',
    caption: 'Liberdade para viver o lado de fora.',
    width: 900,
    height: 1600,
    maxWidth: 900,
    layout: 'portrait',
    position: '50% 54%',
  },
]
