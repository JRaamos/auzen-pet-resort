import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Container } from '../components/Container'
import { ResponsiveImage } from '../components/ResponsiveImage'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { trackEvent } from '../utils/analytics'

const SpaceShell = styled.section`
  padding: ${({ theme }) => theme.spacing.section} 0;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.warmWhite};
`

const SpaceIntro = styled(Container)`
  display: grid;
  grid-template-columns: 1.1fr 0.7fr;
  align-items: end;
  gap: clamp(2rem, 8vw, 8rem);
  margin-bottom: clamp(3.5rem, 8vw, 7rem);

  > div:last-child p {
    max-width: 31rem;
    margin-bottom: 0;
    color: ${({ theme }) => theme.colors.brown};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`

const Mosaic = styled(Container)`
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(16rem, 0.65fr);
  grid-template-rows: clamp(18rem, 26vw, 24rem) clamp(18rem, 30vw, 27rem);
  gap: clamp(0.9rem, 2vw, 1.5rem);

  > div:first-child { grid-row: 1 / 3; }
  > div { min-height: 0; }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 0.75fr;
    grid-template-rows: auto auto;
    > div:first-child { grid-row: auto; }
    > div:last-child { grid-column: 1 / -1; }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`

const Landscape = styled.div`
  height: 100%;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.lg} 0 0 ${({ theme }) => theme.radius.lg};
  grid-row: 1 / 3;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 42rem;
    grid-row: 1 / 2;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 28rem;
    border-radius: ${({ theme }) => theme.radius.lg};
  }
`

const GardenDetail = styled.div`
  height: clamp(18rem, 26vw, 24rem);
  overflow: hidden;
  border-radius: 0 ${({ theme }) => theme.radius.lg} 0 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 42rem;
    border-radius: 0 ${({ theme }) => theme.radius.lg} ${({ theme }) => theme.radius.lg} 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 30rem;
    border-radius: ${({ theme }) => theme.radius.lg};
  }
`

const VideoFrame = styled.div`
  position: relative;
  height: clamp(18rem, 30vw, 27rem);
  overflow: hidden;
  color: ${({ theme }) => theme.colors.warmWhite};
  background: ${({ theme }) => theme.colors.forest};
  border-radius: 0 0 ${({ theme }) => theme.radius.lg} 0;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, rgba(16, 44, 34, 0.65), transparent 55%);
    content: '';
    pointer-events: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 32rem;
    grid-column: 1 / -1;
    border-radius: ${({ theme }) => theme.radius.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 30rem;
    grid-column: auto;
  }
`

const VideoLabel = styled.div`
  position: absolute;
  z-index: 2;
  right: 1.25rem;
  bottom: 1.25rem;
  left: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  span {
    font-family: ${({ theme }) => theme.typography.display};
    font-size: 1.45rem;
    letter-spacing: -0.025em;
  }

  button {
    display: grid;
    width: 3rem;
    height: 3rem;
    flex: 0 0 auto;
    padding: 0;
    color: inherit;
    border: 1px solid ${({ theme }) => theme.colors.lightLine};
    border-radius: 50%;
    background: rgba(24, 62, 50, 0.55);
    cursor: pointer;
    place-items: center;
  }
`

function SpaceVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause()
    })
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  const toggleVideo = () => {
    const video = videoRef.current
    if (!video) return

    if (!started) {
      video.src = '/media/space-tour.mp4'
      setStarted(true)
    }

    if (video.paused) {
      void video.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
      trackEvent('video_toggle', 'space_play')
    } else {
      video.pause()
      setPlaying(false)
      trackEvent('video_toggle', 'space_pause')
    }
  }

  return (
    <VideoFrame>
      <video
        ref={videoRef}
        poster="/images/garden-detail-900.jpg"
        muted
        playsInline
        preload="none"
        aria-label="Passeio em vídeo pelas áreas externas do Auzen"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      <VideoLabel>
        <span>Um passeio pelo quintal</span>
        <button type="button" onClick={toggleVideo} aria-label={playing ? 'Pausar vídeo' : 'Reproduzir vídeo'}>
          {playing ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
        </button>
      </VideoLabel>
    </VideoFrame>
  )
}

export function Space() {
  return (
    <SpaceShell id="espaco">
      <SpaceIntro>
        <Reveal>
          <SectionHeading eyebrow="O espaço">O quintal não é cenário. É parte da experiência.</SectionHeading>
        </Reveal>
        <Reveal delay={0.12}>
          <div>
            <p>
              O verde aparece em todo canto: no gramado, no jardim, nas árvores e nos caminhos que convidam cada cão a descobrir o ambiente no próprio ritmo.
            </p>
          </div>
        </Reveal>
      </SpaceIntro>
      <Mosaic>
        <Reveal>
          <Landscape>
            <ResponsiveImage
              base="open-lawn"
              alt="Grande área gramada e arborizada do Auzen"
              width={900}
              height={1600}
              maxWidth={900}
              sizes="(max-width: 520px) 92vw, (max-width: 800px) 55vw, 62vw"
              objectPosition="50% 33%"
            />
          </Landscape>
        </Reveal>
        <Reveal delay={0.08}>
          <GardenDetail>
            <ResponsiveImage
              base="garden-detail"
              alt="Jardim florido com uma cadeira verde no espaço do Auzen"
              width={900}
              height={1600}
              maxWidth={900}
              sizes="(max-width: 800px) 40vw, 30vw"
              objectPosition="50% 38%"
            />
          </GardenDetail>
        </Reveal>
        <Reveal delay={0.14}>
          <SpaceVideo />
        </Reveal>
      </Mosaic>
    </SpaceShell>
  )
}
