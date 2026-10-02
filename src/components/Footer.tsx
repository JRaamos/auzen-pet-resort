import { ArrowUp, ArrowUpRight } from 'lucide-react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { contactConfig, createWhatsAppUrl } from '../config/contact'
import { navigationItems } from '../config/navigation'
import { trackEvent } from '../utils/analytics'
import { Brand } from './Brand'
import { Container } from './Container'

const FooterShell = styled.footer`
  padding: clamp(4rem, 8vw, 7rem) 0 1.5rem;
  color: ${({ theme }) => theme.colors.warmWhite};
  background: ${({ theme }) => theme.colors.forest};
`

const FooterGrid = styled(Container)`
  display: grid;
  grid-template-columns: minmax(14rem, 1.5fr) 1fr 1fr;
  gap: clamp(3rem, 8vw, 8rem);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;

    > :first-child {
      grid-column: 1 / -1;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;

    > :first-child {
      grid-column: auto;
    }
  }
`

const FooterIntro = styled.div`
  p {
    max-width: 25rem;
    margin: 1.4rem 0 0;
    color: rgba(255, 255, 255, 0.68);
    font-size: 0.92rem;
  }
`

const FooterColumn = styled.div`
  h3 {
    margin-bottom: 1.1rem;
    color: rgba(255, 255, 255, 0.68);
    font-size: 0.66rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  nav,
  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.65rem;
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.88rem;
    transition: color ${({ theme }) => theme.transitions.fast};

    &:hover {
      color: ${({ theme }) => theme.colors.terracotta};
    }
  }
`

const FooterBottom = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: clamp(4rem, 8vw, 7rem);
  padding-top: 1.3rem;
  color: rgba(255, 255, 255, 0.68);
  border-top: 1px solid ${({ theme }) => theme.colors.lightLine};
  font-size: 0.72rem;

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    color: ${({ theme }) => theme.colors.warmWhite};
    font-weight: 700;
  }
`

const FooterCredit = styled.span`
  strong {
    color: ${({ theme }) => theme.colors.warmWhite};
    font-weight: 700;
  }
`

export function Footer() {
  return (
    <FooterShell>
      <FooterGrid>
        <FooterIntro>
          <Brand inverted />
          <p>
            Hotel e creche para cães, com natureza por perto e espaço para viver
            o dia do lado de fora.
          </p>
        </FooterIntro>
        <FooterColumn>
          <h3>Navegue</h3>
          <nav aria-label="Navegação do rodapé">
            {navigationItems.map((item) => (
              <Link to={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
            <Link to="/reservar">Fazer reserva</Link>
            <Link to="/informacoes">Antes da estadia</Link>
          </nav>
        </FooterColumn>
        <FooterColumn>
          <h3>Contato</h3>
          <div>
            <a
              href={createWhatsAppUrl('general')}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('whatsapp_click', 'footer')}
            >
              {contactConfig.whatsapp.display}{' '}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <span>Informações e reservas pelo WhatsApp.</span>
            {contactConfig.address && (
              <address>{contactConfig.address}</address>
            )}
            {contactConfig.openingHours && (
              <span>{contactConfig.openingHours}</span>
            )}
            {contactConfig.instagram && (
              <a
                href={contactConfig.instagram}
                target="_blank"
                rel="noreferrer"
              >
                Instagram <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            )}
          </div>
        </FooterColumn>
      </FooterGrid>
      <FooterBottom>
        <span>© {new Date().getFullYear()} Auzen Pet Resort</span>
        <FooterCredit>
          Desenvolvido por <strong>Febraio Tech</strong>
        </FooterCredit>
        {contactConfig.legalLinks.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
        <Link to="/#inicio">
          Voltar ao início <ArrowUp size={14} aria-hidden="true" />
        </Link>
      </FooterBottom>
    </FooterShell>
  )
}
