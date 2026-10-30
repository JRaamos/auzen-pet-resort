import { daycareConfig } from './daycare'

export const bookingConfig = {
  rates: {
    hotel: { Pequeno: 105, Médio: 115 },
    daycare: { Pequeno: daycareConfig.dailyRate, Médio: daycareConfig.dailyRate },
  },
  promotion: { code: 'MAISDIAS', minUnits: 5, percent: 10 },
  checkIn: { start: '07:00', end: '17:00' },
  hotelCheckOut: { start: '07:00', end: '09:00' },
  daycareCheckOut: { start: daycareConfig.opens, end: daycareConfig.closes },
  maxPets: 4,
  maxDays: 60,
} as const

export const paymentOptions = [
  'Pix',
  'Cartão de crédito',
  'Cartão de débito',
  'Dinheiro',
] as const
export const transportOptions = [
  'Não preciso',
  'Buscar meu cão',
  'Levar meu cão',
  'Buscar e levar',
] as const
export const preparationItems = [
  {
    title: 'Carteira de vacinação',
    detail:
      'Tenha a carteira atualizada para apresentar à equipe antes da estadia.',
  },
  {
    title: 'Proteção contra parasitas',
    detail:
      'Informe qual produto seu cão utiliza e quando foi a última aplicação.',
  },
  {
    title: 'Alimentação de casa',
    detail:
      'Traga a alimentação habitual, na quantidade necessária, e as orientações de porção e horários.',
  },
  {
    title: 'Saúde e rotina',
    detail:
      'Conte sobre medicamentos, alergias, comportamento e cuidados especiais.',
  },
  {
    title: 'Entrada e saída',
    detail:
      'Creche: segunda a sexta, das 7h às 18h. Hotel: entrada das 7h às 17h e saída até as 9h do dia seguinte.',
  },
  {
    title: 'Reserve com antecedência',
    detail:
      'Fins de semana e feriados prolongados merecem planejamento. A vaga é confirmada pela equipe no WhatsApp.',
  },
] as const
