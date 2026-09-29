import type { ImgHTMLAttributes } from 'react'
import styled from 'styled-components'

interface ResponsiveImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'width' | 'height'> {
  base: string
  alt: string
  width: number
  height: number
  maxWidth?: 900 | 1600
  sizes?: string
  objectPosition?: string
}

const Picture = styled.picture<{ $objectPosition: string }>`
  display: block;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: ${({ $objectPosition }) => $objectPosition};
  }
`

const getWidths = (maxWidth: 900 | 1600) => (maxWidth === 1600 ? [480, 900, 1600] : [480, 900])

export function ResponsiveImage({
  base,
  alt,
  width,
  height,
  maxWidth = 900,
  sizes = '100vw',
  objectPosition = '50% 50%',
  loading = 'lazy',
  decoding = 'async',
  ...imageProps
}: ResponsiveImageProps) {
  const widths = getWidths(maxWidth)
  const avifSrcSet = widths.map((item) => `/images/${base}-${item}.avif ${item}w`).join(', ')
  const jpegSrcSet = widths.map((item) => `/images/${base}-${item}.jpg ${item}w`).join(', ')

  return (
    <Picture $objectPosition={objectPosition}>
      <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      <img
        src={`/images/${base}-${maxWidth}.jpg`}
        srcSet={jpegSrcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        {...imageProps}
      />
    </Picture>
  )
}
