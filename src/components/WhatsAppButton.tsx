import { MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { contactConfig, createWhatsAppUrl } from '../config/contact'

const FloatingLink = styled.a<{ $visible: boolean }>`
  body.consent-open & { visibility: hidden; pointer-events: none; }
  position: fixed;
  z-index: 45;
  right: clamp(1rem, 2.4vw, 2rem);
  bottom: clamp(1rem, 2.4vw, 2rem);
  display: inline-flex;
  min-height: 3.6rem;
  align-items: center;
  gap: 0.65rem;
  padding: 0.75rem 1.05rem;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.forest};
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: ${({ theme }) => theme.radius.pill};
  box-shadow: ${({ theme }) => theme.shadows.lift};
  font-size: 0.78rem;
  font-weight: 750;
  transition:
    background ${({ theme }) => theme.transitions.base},
    transform ${({ theme }) => theme.transitions.base};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};

  &:hover {
    background: ${({ theme }) => theme.colors.terracotta};
    transform: translateY(-3px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 3.4rem;
    min-height: 3.4rem;
    justify-content: center;
    padding: 0;

    span {
      position: absolute;
      overflow: hidden;
      width: 1px;
      height: 1px;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      white-space: nowrap;
    }
  }
`

export function WhatsAppButton() {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const intersections = new Map<Element, boolean>()
    const updateVisibility = () => setVisible(!Array.from(intersections.values()).some(Boolean))
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) =>
        intersections.set(entry.target, entry.isIntersecting),
      )
      updateVisibility()
    })
    const syncTargets = () => {
      for (const target of intersections.keys()) {
        if (!target.isConnected) {
          observer.unobserve(target)
          intersections.delete(target)
        }
      }
      document.querySelectorAll('#inicio, #planos, #contato, footer').forEach(target => {
        if (intersections.has(target)) return
        intersections.set(target, target.id === 'inicio')
        observer.observe(target)
      })
      updateVisibility()
    }
    syncTargets()
    // Lazy pages can mount their contact sections after this component.
    const mutations = new MutationObserver(syncTargets)
    mutations.observe(document.querySelector('main') || document.body, { childList: true, subtree: true })
    return () => { observer.disconnect(); mutations.disconnect() }
  }, [pathname])
  // These pages already expose the contact action in their primary content.
  if (pathname === '/reservar' || pathname === '/contato') return null
  return (
    <FloatingLink
      $visible={visible}
      tabIndex={visible ? 0 : -1}
      data-floating-contact
      href={createWhatsAppUrl('general')}
      target="_blank"
      rel="noreferrer"
      aria-label={`Falar com o Auzen pelo WhatsApp ${contactConfig.whatsapp.display}`}
    >
      <MessageCircle size={20} aria-hidden="true" />
      <span>Falar com o Auzen</span>
    </FloatingLink>
  )
}
