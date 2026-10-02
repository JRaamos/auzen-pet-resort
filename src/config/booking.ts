export const bookingConfig = {
  rates: { hotel: 100, daycare: 65 },
  promotion: { code: 'MAISDIAS', minUnits: 5, percent: 10 },
  checkIn: { start: '07:00', end: '17:00' },
  hotelCheckOut: { start: '07:00', end: '09:00' },
  daycareCheckOut: { start: '07:00', end: '17:00' },
  maxPets: 4,
  maxDays: 60,
  provisional: true,
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
      'Combine os horários: entrada das 07h às 17h; no hotel, saída até 09h. A creche encerra às 17h.',
  },
  {
    title: 'Reserve com antecedência',
    detail:
      'Finais de semana e feriados prolongados merecem planejamento. A vaga é confirmada pela equipe no WhatsApp.',
  },
] as const
