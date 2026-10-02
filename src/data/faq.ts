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
    answer:
      'Envie pelo WhatsApp as datas que você tem em mente. Assim, o Auzen pode responder com as informações atualizadas para o período.',
    intent: 'availability',
    linkLabel: 'Consultar datas',
  },
  {
    question: 'Como faço uma reserva?',
    answer:
      'Acesse Fazer reserva, escolha serviço e datas e preencha os dados do tutor e do cão. Ao final, o site prepara uma mensagem completa para o WhatsApp. A reserva depende da confirmação da equipe.',
    intent: 'general',
    linkLabel: 'Começar a conversa',
  },
  {
    question: 'Posso conhecer o espaço antes?',
    answer:
      'Fale com o Auzen pelo WhatsApp para verificar a possibilidade e combinar os detalhes de uma visita.',
    intent: 'visit',
    linkLabel: 'Conversar sobre uma visita',
  },
  {
    question: 'Como obtenho informações sobre valores?',
    answer:
      'A página Serviços e valores mostra a tabela inicial: hotel a R$ 100 por diária e creche a R$ 65 por dia, por cão. O formulário calcula a estimativa. A equipe confirma o valor final e o transporte pelo WhatsApp.',
    intent: 'general',
    linkLabel: 'Pedir informações',
  },
  {
    question: 'Quais são os horários?',
    answer:
      'A creche funciona das 07h às 17h. No hotel, o check-in acontece das 07h às 17h e o check-out é até 09h do dia seguinte. Visitas e transporte são combinados com a equipe.',
    intent: 'general',
    linkLabel: 'Combinar horários',
  },
  {
    question: 'O que preciso levar?',
    answer:
      'Traga a alimentação habitual e a carteira de vacinação. Informe proteção antiparasitária, medicamentos, alergias e rotina do seu cão. Confira todas as orientações na página Antes da estadia.',
    intent: 'general',
    linkLabel: 'Tirar uma dúvida',
  },
  {
    question: 'Tem transporte para buscar meu cão?',
    answer:
      'Sim, você pode solicitar busca, entrega ou ambos no formulário de reserva. A equipe confirma rota, disponibilidade e valor pelo WhatsApp. O transporte não faz parte da estimativa das diárias.',
    intent: 'general',
    linkLabel: 'Consultar transporte',
  },
  {
    question: 'O site confirma a vaga ou cobra o pagamento?',
    answer:
      'O site prepara sua solicitação e uma estimativa de valores. A equipe Auzen confirma a disponibilidade, o valor final e as condições de pagamento pelo WhatsApp. Nenhum pagamento é processado aqui.',
    intent: 'availability',
    linkLabel: 'Conversar com a equipe',
  },
]
