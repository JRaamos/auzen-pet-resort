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
    base: 'garden-friends',
    alt: 'Dois cães se aproximando no gramado do Auzen, um preto com roupa rosa e outro caramelo',
    caption: 'Novas amizades no jardim.',
    width: 900, height: 962, maxWidth: 900,
    layout: 'square', position: '50% 30%',
  },
  {
    base: 'garden-red-dress',
    alt: 'Cão de pelagem preta e branca com vestido vermelho no gramado do Auzen',
    caption: 'Um dia de sol e descobertas.',
    width: 900, height: 1186, maxWidth: 900,
    layout: 'portrait', position: '50% 45%',
  },
  {
    base: 'brown-dog-v2',
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
    base: 'daycare-energy-v1',
    alt: 'Dois cães brincando no gramado entre flores amarelas',
    caption: 'Energia boa para compartilhar.',
    width: 900,
    height: 1125,
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
    caption: 'Liberdade para aproveitar o ar livre.',
    width: 900,
    height: 1600,
    maxWidth: 900,
    layout: 'portrait',
    position: '50% 54%',
  },
]
