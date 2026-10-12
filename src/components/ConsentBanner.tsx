import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { analyticsConfigured, readConsent, setConsent } from '../utils/analytics'

const Banner = styled.aside`
  position: fixed; z-index: 160; bottom: 1rem; left: 1rem; right: 1rem;
  max-width: 42rem; padding: 1.4rem; background: ${({ theme }) => theme.colors.warmWhite};
  color: ${({ theme }) => theme.colors.forest}; border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 1rem; box-shadow: 0 8px 40px #0003;
  max-height: calc(100dvh - 2rem); overflow: auto;
  h2 { font-size: 1.1rem; margin: 0 0 .5rem; }
  p { font-size: .85rem; margin: 0 0 1rem; }
  div { display: flex; flex-wrap: wrap; gap: .6rem; }
  button { min-height: 44px; padding: .7rem 1rem; border: 1px solid currentColor; border-radius: 2rem; background: transparent; color: inherit; cursor: pointer; font-weight: 700; }
  a { text-decoration: underline; }
`
export function ConsentBanner() {
  const [open, setOpen] = useState(() => typeof window !== 'undefined' && analyticsConfigured && readConsent() === null)
  useEffect(() => {
    const show = () => setOpen(true)
    window.addEventListener('auzen:open-consent', show)
    return () => window.removeEventListener('auzen:open-consent', show)
  }, [])
  useEffect(() => {
    document.body.classList.toggle('consent-open', open)
    return () => document.body.classList.remove('consent-open')
  }, [open])
  if (!open) return null
  const choose = (value: 'granted' | 'denied') => { setConsent(value); setOpen(false) }
  return <Banner aria-label="Preferências de privacidade">
    <h2>Suas escolhas de privacidade</h2>
    <p>{analyticsConfigured ? 'Com sua permissão, usamos medição de visitas e cliques para entender como as pessoas encontram o Auzen. Você pode recusar e continuar usando todos os serviços.' : 'A medição de visitas ainda não está ativa. O formulário funciona sem cookies de análise.'} <Link to="/privacidade" onClick={() => setOpen(false)}>Saiba como usamos os dados.</Link></p>
    <div><button onClick={() => choose('denied')}>Recusar opcionais</button>{analyticsConfigured && <button onClick={() => choose('granted')}>Aceitar análise de visitas</button>}<button onClick={() => setOpen(false)}>Fechar</button></div>
  </Banner>
}
