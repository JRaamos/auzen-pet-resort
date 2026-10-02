export type WhatsAppIntent =
  'general' | 'hotel' | 'daycare' | 'visit' | 'availability'

interface ContactConfig {
  whatsapp: { display: string; digits: string }
  address: string | null
  instagram: string | null
  openingHours: string | null
  legalLinks: { label: string; href: string }[]
}

export const contactConfig: ContactConfig = {
  whatsapp: {
    display: '(71) 98241-2339',
    digits: '5571982412339',
  },
  address: 'Rua da Jurema, Quingoma de Fora, Lauro de Freitas – BA',
  instagram: 'https://www.instagram.com/auzenpetresort/',
  openingHours:
    'Creche: 07h às 17h · Hotel: check-in das 07h às 17h e check-out até 09h',
  legalLinks: [],
}

export const whatsappMessages: Record<WhatsAppIntent, string> = {
  general:
    'Olá! Conheci o Auzen Pet Resort pelo site e gostaria de mais informações.',
  hotel:
    'Olá! Vi o site do Auzen Pet Resort e gostaria de consultar hospedagem para meu cachorro.',
  daycare: 'Olá! Gostaria de saber mais sobre a creche do Auzen Pet Resort.',
  visit:
    'Olá! Conheci o Auzen Pet Resort pelo site e gostaria de conversar sobre uma visita ao espaço.',
  availability:
    'Olá! Vi o site do Auzen Pet Resort e gostaria de consultar disponibilidade.',
}

export const createWhatsAppUrl = (intent: WhatsAppIntent = 'general') => {
  const message = encodeURIComponent(whatsappMessages[intent])
  return `https://wa.me/${contactConfig.whatsapp.digits}?text=${message}`
}
