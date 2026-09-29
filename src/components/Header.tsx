import { ArrowUpRight, Menu, MessageCircle, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { contactConfig, createWhatsAppUrl } from '../config/contact'
import { navigationItems } from '../config/navigation'
import { trackEvent } from '../utils/analytics'
import { Brand } from './Brand'
import { ResponsiveImage } from './ResponsiveImage'

const HeaderShell = styled.header<{ $scrolled: boolean; $open: boolean }>`
  position: fixed;
  z-index: 50;
  top: 0;
  right: 0;
  left: 0;
  color: ${({ theme, $scrolled, $open }) =>
    $open || !$scrolled ? theme.colors.warmWhite : theme.colors.forest};
  background: ${({ $scrolled, $open }) => {
    if ($open) return 'transparent'
    if ($scrolled) return 'rgba(246, 240, 230, 0.94)'
    return 'transparent'
  }};
  border-bottom: 1px solid
    ${({ theme, $scrolled, $open }) => ($scrolled && !$open ? theme.colors.line : 'transparent')};
  backdrop-filter: ${({ $scrolled, $open }) => ($scrolled && !$open ? 'blur(18px)' : 'none')};
  transition:
    background ${({ theme }) => theme.transitions.base},
    color ${({ theme }) => theme.transitions.base},
    border-color ${({ theme }) => theme.transitions.base};
`

const HeaderInner = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  width: min(100% - clamp(1.5rem, 4vw, 4rem), 88rem);
  min-height: 5.6rem;
  align-items: center;
  margin-inline: auto;
  grid-template-columns: auto 1fr auto;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    min-height: 4.8rem;
    grid-template-columns: 1fr auto;
  }
`

const DesktopNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(1.1rem, 2vw, 2rem);

  a {
    position: relative;
    padding: 0.5rem 0;
    font-size: 0.76rem;
    font-weight: 650;
    letter-spacing: 0.025em;

    &::after {
      position: absolute;
      right: 0;
      bottom: 0.18rem;
      left: 0;
      height: 1px;
      background: currentColor;
      content: '';
      transform: scaleX(0);
      transform-origin: right;
      transition: transform ${({ theme }) => theme.transitions.base};
    }

    &:hover::after,
    &:focus-visible::after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    display: none;
  }
`

const HeaderCta = styled.a`
  display: inline-flex;
  min-height: 2.85rem;
  align-items: center;
  gap: 0.55rem;
  padding: 0.65rem 1rem;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.terracotta};
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 0.75rem;
  font-weight: 750;
  transition:
    transform ${({ theme }) => theme.transitions.base},
    background ${({ theme }) => theme.transitions.base};

  &:hover {
    background: ${({ theme }) => theme.colors.terracottaDark};
    transform: translateY(-2px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    display: none;
  }
`

const MenuButton = styled.button`
  display: none;
  width: 2.85rem;
  height: 2.85rem;
  align-items: center;
  justify-content: center;
  justify-self: end;
  padding: 0;
  color: inherit;
  border: 1px solid currentColor;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    display: inline-flex;
  }
`

const MobileMenu = styled.div<{ $open: boolean }>`
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: min(100%, 27rem);
  height: 100dvh;
  overflow-y: auto;
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  overscroll-behavior: contain;
  padding: 5.5rem clamp(1.5rem, 6vw, 2rem) max(1.5rem, env(safe-area-inset-bottom));
  color: ${({ theme }) => theme.colors.warmWhite};
  background: ${({ theme }) => theme.colors.forest};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transform: translateX(${({ $open }) => ($open ? '0' : '100%')});
  transition:
    transform 420ms cubic-bezier(0.22, 1, 0.36, 1),
    visibility 420ms;

  @media (min-width: 1101px) {
    display: none;
  }
`

const MenuBackdrop = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  height: 100dvh;
  background: rgba(9, 25, 19, 0.6);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  transition: opacity 420ms, visibility 420ms;
  @media (min-width: 1101px) { display: none; }
`

const MenuIntro = styled.div`
  flex-shrink: 0;
  margin-bottom: 1rem;
  overflow: hidden;
  border-radius: 0 2.5rem 0 0;
  height: clamp(5rem, 18dvh, 12rem);
  img { object-position: 50% 58%; }
  @media (max-height: 600px) { height: 4rem; margin-bottom: 0.75rem; }
`

const MobileNav = styled.nav<{ $open: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0;

  > a {
    display: grid;
    grid-template-columns: 1.4rem 1fr auto;
    gap: 0.6rem;
    align-items: center;
    justify-content: space-between;
    min-height: 2.85rem;
    padding: clamp(0.55rem, 1.3dvh, 0.9rem) 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightLine};
    font-family: ${({ theme }) => theme.typography.display};
    font-size: clamp(1.75rem, 7vw, 2.25rem);
    font-weight: 430;
    letter-spacing: -0.04em;
    line-height: 1;
    transform: translateX(${({ $open }) => ($open ? '0' : '1.5rem')});
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    transition: transform 400ms, opacity 300ms, color 200ms;
    &:hover { color: ${({ theme }) => theme.colors.terracottaLight}; }
    span:first-child {
      font-family: ${({ theme }) => theme.typography.body};
      font-size: 0.6rem;
      letter-spacing: 0;
      color: ${({ theme }) => theme.colors.terracottaLight};
    }
    ${Array.from({ length: 6 }, (_, index) => `&:nth-child(${index + 1}) { transition-delay: ${index * 25 + 60}ms; }`).join('')}
  }
`

const MobileFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.75rem;
  margin-top: 1.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;

  a {
    display: flex;
    min-height: 3rem;
    align-items: center;
    justify-content: center;
    gap: 0.65rem;
    padding: 0.7rem;
    background: ${({ theme }) => theme.colors.terracotta};
    border-radius: ${({ theme }) => theme.radius.pill};
    color: ${({ theme }) => theme.colors.warmWhite};
    font-weight: 700;
  }
  > span { text-align: center; font-size: 0.65rem; letter-spacing: 0.05em; }
  @media (max-height: 600px) { margin-top: 1rem; }
`

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const firstMobileLink = useRef<HTMLAnchorElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    if (!menuOpen) return
    const menuButton = menuButtonRef.current
    const focusFrame = requestAnimationFrame(() => firstMobileLink.current?.focus({ preventScroll: true }))
    const background = Array.from(document.querySelectorAll<HTMLElement>('main, footer, [data-floating-contact]'))
    background.forEach((element) => { element.inert = true })

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
      if (event.key === 'Tab') {
        const focusable = Array.from(headerRef.current?.querySelectorAll<HTMLElement>('a, button') ?? [])
          .filter((element) => element.tabIndex >= 0 && element.getClientRects().length > 0)
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }
    }
    const onResize = () => { if (window.innerWidth > 1100) setMenuOpen(false) }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(focusFrame)
      document.body.classList.remove('menu-open')
      background.forEach((element) => { element.inert = false })
      menuButton?.focus({ preventScroll: true })
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)
  const invertedBrand = menuOpen || !scrolled

  return (
    <HeaderShell ref={headerRef} $scrolled={scrolled} $open={menuOpen}>
      <MenuBackdrop $open={menuOpen} onClick={closeMenu} aria-hidden="true" />
      <HeaderInner>
        <Brand inverted={invertedBrand} onClick={closeMenu} />
        <DesktopNav aria-label="Navegação principal">
          {navigationItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </DesktopNav>
        <HeaderCta
          href={createWhatsAppUrl('availability')}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent('whatsapp_click', 'header')}
          aria-label={`Reservar pelo WhatsApp ${contactConfig.whatsapp.display}`}
        >
          Reservar pelo WhatsApp <ArrowUpRight size={15} aria-hidden="true" />
        </HeaderCta>
        <MenuButton
          ref={menuButtonRef}
          type="button"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </MenuButton>
      </HeaderInner>
      <MobileMenu
        id="mobile-navigation"
        $open={menuOpen}
        aria-hidden={!menuOpen}
        onTransitionEnd={(event) => {
          if (event.target === event.currentTarget && event.propertyName === 'transform' && menuOpen && document.activeElement === menuButtonRef.current) {
            firstMobileLink.current?.focus({ preventScroll: true })
          }
        }}
      >
        <MenuIntro aria-hidden="true">
          <ResponsiveImage base="hero-garden" alt="" width={1600} height={900} sizes="430px" />
        </MenuIntro>
        <MobileNav $open={menuOpen} aria-label="Navegação mobile">
          {navigationItems.map((item, index) => (
            <a
              ref={index === 0 ? firstMobileLink : undefined}
              href={item.href}
              key={item.href}
              onClick={closeMenu}
              tabIndex={menuOpen ? 0 : -1}
            >
              <span aria-hidden="true">0{index + 1}</span><span>{item.label}</span> <ArrowUpRight size={20} aria-hidden="true" />
            </a>
          ))}
        </MobileNav>
        <MobileFooter>
          <a
            href={createWhatsAppUrl('general')}
            target="_blank"
            rel="noreferrer"
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => trackEvent('whatsapp_click', 'mobile_menu')}
          >
            <MessageCircle size={17} aria-hidden="true" /> Vamos conversar?
          </a>
          <span>Hotel + Creche para cães · {contactConfig.whatsapp.display}</span>
        </MobileFooter>
      </MobileMenu>
    </HeaderShell>
  )
}
