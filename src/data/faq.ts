import type { WhatsAppIntent } from '../config/contact'

export interface FaqItem {
  question: string
  answer: string
  intent: WhatsAppIntent
  linkLabel: string
}

export const faqItems: FaqItem[] = [
  {
    question: 'Como consultar disponibilidade?',
    answer: 'Envie pelo WhatsApp as datas que você tem em mente. Assim, o Auzen pode responder com as informações atualizadas para o período.',
    intent: 'availability',
    linkLabel: 'Consultar datas',
  },
  {
    question: 'Como faço uma reserva?',
    answer: 'O primeiro passo é conversar pelo WhatsApp. Por lá, você recebe as orientações necessárias antes de confirmar a estadia ou a creche.',
    intent: 'general',
    linkLabel: 'Começar a conversa',
  },
  {
    question: 'Posso conhecer o espaço antes?',
    answer: 'Fale com o Auzen pelo WhatsApp para verificar a possibilidade e combinar os detalhes de uma visita.',
    intent: 'visit',
    linkLabel: 'Conversar sobre uma visita',
  },
  {
    question: 'Como obtenho informações sobre valores?',
    answer: 'Consulte diretamente pelo WhatsApp para receber as informações comerciais mais recentes sobre hotel e creche.',
    intent: 'general',
    linkLabel: 'Pedir informações',
  },
]
