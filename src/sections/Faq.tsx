import { ArrowUpRight, MessageCircle, Plus } from 'lucide-react'
import styled from 'styled-components'
import { ButtonLink } from '../components/Button'
import { Container } from '../components/Container'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { createWhatsAppUrl } from '../config/contact'
import { faqItems } from '../data/faq'
import { trackEvent } from '../utils/analytics'

const FaqShell = styled.section`
  padding: ${({ theme }) => theme.spacing.section} 0;
  background: ${({ theme }) => theme.colors.warmWhite};
`

const FaqGrid = styled(Container)`
  display: grid;
  grid-template-columns: minmax(17rem, 0.72fr) minmax(0, 1.28fr);
  gap: clamp(3rem, 9vw, 9rem);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`

const FaqIntro = styled.div`
  display: flex;
  align-self: start;
  flex-direction: column;
  gap: 1.5rem;

  > p {
    max-width: 29rem;
    margin-bottom: 0;
    color: ${({ theme }) => theme.colors.brown};
  }
`

const Questions = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.line};
`

const Question = styled.details`
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};

  &[open] summary svg {
    transform: rotate(45deg);
  }

  summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    padding: 1.55rem 0;
    font-family: ${({ theme }) => theme.typography.display};
    font-size: clamp(1.45rem, 2.4vw, 2rem);
    font-weight: 480;
    letter-spacing: -0.025em;
    line-height: 1.15;
    cursor: pointer;
    list-style: none;

    &::-webkit-details-marker {
      display: none;
    }

    svg {
      flex: 0 0 auto;
      color: ${({ theme }) => theme.colors.terracotta};
      transition: transform ${({ theme }) => theme.transitions.base};
    }
  }
`

const Answer = styled.div`
  max-width: 39rem;
  padding: 0 3rem 1.6rem 0;

  p {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.brown};
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: ${({ theme }) => theme.colors.terracottaDark};
    font-size: 0.78rem;
    font-weight: 750;
    border-bottom: 1px solid currentColor;
  }
`

export function Faq() {
  return (
    <FaqShell id="duvidas">
      <FaqGrid>
        <FaqIntro>
          <Reveal>
            <SectionHeading eyebrow="Dúvidas">A conversa pode começar por aqui.</SectionHeading>
          </Reveal>
          <Reveal delay={0.1}>
            <p>Regras e detalhes podem variar. Para receber uma resposta atualizada, fale diretamente com o Auzen.</p>
          </Reveal>
          <Reveal delay={0.16}>
            <ButtonLink
              href={createWhatsAppUrl('general')}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('whatsapp_click', 'faq_intro')}
            >
              <MessageCircle size={18} aria-hidden="true" /> Tirar uma dúvida
            </ButtonLink>
          </Reveal>
        </FaqIntro>
        <Reveal delay={0.08}>
          <Questions>
            {faqItems.map((item) => (
              <Question key={item.question}>
                <summary>
                  {item.question} <Plus size={20} aria-hidden="true" />
                </summary>
                <Answer>
                  <p>{item.answer}</p>
                  <a
                    href={createWhatsAppUrl(item.intent)}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackEvent('whatsapp_click', `faq_${item.intent}`)}
                  >
                    {item.linkLabel} <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </Answer>
              </Question>
            ))}
          </Questions>
        </Reveal>
      </FaqGrid>
    </FaqShell>
  )
}
