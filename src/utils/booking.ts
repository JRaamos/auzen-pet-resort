import { bookingConfig } from '../config/booking'
import { contactConfig } from '../config/contact'

export type Service = 'hotel' | 'daycare'
export interface Pet {
  name: string
  breed: string
  age: string
  ageUnit: string
  weight: string
  size: string
  sex: string
  neutered: string
  vaccination: string
  parasite: string
  parasiteDate: string
  health: string
  medication: string
  feeding: string
  behavior: string
  notes: string
}
export interface Booking {
  service: Service
  startDate: string
  endDate: string
  arrival: string
  departure: string
  transport: string
  promo: string
  tutor: {
    name: string
    phone: string
    email: string
    address: string
    emergencyName: string
    emergencyPhone: string
  }
  pets: Pet[]
  payment: string
  notes: string
  consent: boolean
}
export const emptyPet = (): Pet => ({
  name: '',
  breed: '',
  age: '',
  ageUnit: 'anos',
  weight: '',
  size: '',
  sex: '',
  neutered: '',
  vaccination: '',
  parasite: '',
  parasiteDate: '',
  health: '',
  medication: '',
  feeding: '',
  behavior: '',
  notes: '',
})
export const newBooking = (
  service: Service = 'hotel',
  promo = '',
): Booking => ({
  service,
  startDate: '',
  endDate: '',
  arrival: '08:00',
  departure: service === 'hotel' ? '09:00' : bookingConfig.daycareCheckOut.end,
  transport: 'Não preciso',
  promo,
  tutor: {
    name: '',
    phone: '',
    email: '',
    address: '',
    emergencyName: '',
    emergencyPhone: '',
  },
  pets: [emptyPet()],
  payment: 'Pix',
  notes: '',
  consent: false,
})
export const money = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
export function todayInBahia(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Bahia',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now)
  return ['year', 'month', 'day']
    .map((key) => parts.find((part) => part.type === key)?.value)
    .join('-')
}
const dateNumber = (value: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return NaN
  const timestamp = Date.parse(`${value}T12:00:00Z`)
  return Number.isFinite(timestamp) &&
    new Date(timestamp).toISOString().slice(0, 10) === value
    ? timestamp
    : NaN
}
export function dailyRate(service: Service, size: string): number | null {
  if (service === 'daycare')
    return ['Pequeno', 'Médio', 'Grande', 'Gigante'].includes(size)
      ? bookingConfig.rates.daycare.Pequeno : null
  const rates = bookingConfig.rates[service]
  return size === 'Pequeno' || size === 'Médio' ? rates[size] : null
}
export function calculateQuote(
  booking: Pick<
    Booking,
    'service' | 'startDate' | 'endDate' | 'pets' | 'promo'
  >,
) {
  const difference =
    (dateNumber(booking.endDate) - dateNumber(booking.startDate)) / 86400000
  let units =
    Number.isFinite(difference) &&
    difference >= (booking.service === 'hotel' ? 1 : 0)
      ? difference + (booking.service === 'daycare' ? 1 : 0)
      : 0
  if (booking.service === 'daycare' && units > 0) {
    const startDay = new Date(dateNumber(booking.startDate)).getUTCDay()
    const fullWeeks = Math.floor(units / 7)
    const remainder = units % 7
    units = fullWeeks * 5
    for (let offset = 0; offset < remainder; offset++) {
      const day = (startDay + offset) % 7
      if (day !== 0 && day !== 6) units++
    }
  }
  const rates = booking.pets.map((pet) => dailyRate(booking.service, pet.size))
  const complete = rates.length > 0 && rates.every((rate) => rate !== null)
  const subtotal = complete
    ? units * rates.reduce<number>((sum, rate) => sum + (rate ?? 0), 0)
    : null
  const requested =
    booking.promo.trim().toUpperCase() === bookingConfig.promotion.code
  const eligible = requested && units >= bookingConfig.promotion.minUnits
  const discount = eligible && subtotal !== null
    ? Math.round(subtotal * bookingConfig.promotion.percent) / 100
    : 0
  return {
    units,
    rates,
    complete,
    subtotal,
    discount,
    total: subtotal === null ? null : Math.round((subtotal - discount) * 100) / 100,
    eligible,
  }
}
export function validateStep(
  booking: Booking,
  step: number,
  today = todayInBahia(),
): string[] {
  const errors: string[] = []
  const quote = calculateQuote(booking)
  if (step === 0) {
    if (
      !Number.isFinite(dateNumber(booking.startDate)) ||
      booking.startDate < today
    )
      errors.push('Escolha uma data de entrada válida, a partir de hoje.')
    if (!quote.units)
      errors.push(
        booking.service === 'hotel'
          ? 'A saída do hotel deve ser pelo menos no dia seguinte à entrada.'
          : 'A saída da creche deve ser no mesmo dia ou depois da entrada.',
      )
    if (quote.units > bookingConfig.maxDays)
      errors.push(
        'Para períodos acima de 60 dias, fale diretamente com a equipe.',
      )
    const timeValid = (value: string, start: string, end: string) =>
      /^\d{2}:\d{2}$/.test(value) && value >= start && value <= end
    const arrivalEnd = booking.service === 'hotel' ? bookingConfig.checkIn.end : bookingConfig.daycareCheckOut.end
    if (!timeValid(booking.arrival, '07:00', arrivalEnd))
      errors.push(booking.service === 'hotel' ? 'A entrada acontece das 7h às 17h.' : 'A entrada da creche acontece das 7h às 18h.')
    if (
      !timeValid(
        booking.departure,
        '07:00',
        booking.service === 'hotel' ? '09:00' : bookingConfig.daycareCheckOut.end,
      )
    )
      errors.push(
        booking.service === 'hotel'
          ? 'Escolha a saída do hotel até as 9h.'
          : 'Escolha a saída da creche até 18h.',
      )
    if (booking.service === 'daycare' && booking.arrival >= booking.departure)
      errors.push(
        'Na creche, a saída deve acontecer depois da entrada em cada dia.',
      )
    if (booking.service === 'daycare' && [booking.startDate, booking.endDate].some(value => {
      const day = new Date(dateNumber(value)).getUTCDay()
      return day === 0 || day === 6
    })) errors.push('A creche funciona de segunda a sexta-feira. Escolha datas nesses dias.')
    if (
      booking.promo.trim() &&
      booking.promo.trim().toUpperCase() !== bookingConfig.promotion.code
    )
      errors.push(
        'Esse código não foi encontrado. Use MAISDIAS ou deixe o campo vazio.',
      )
    if (booking.promo.trim() && !quote.eligible && quote.units)
      errors.push(
        'MAISDIAS vale para períodos de 5 diárias ou mais. Ajuste as datas ou remova o código.',
      )
  }
  const phoneValid = (value: string) =>
    /^\d{10,13}$/.test(value.replace(/\D/g, ''))
  if (step === 1) {
    if (booking.tutor.name.trim().length < 3)
      errors.push('Informe o nome completo do tutor.')
    if (!phoneValid(booking.tutor.phone))
      errors.push('Informe um telefone com DDD válido.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.tutor.email))
      errors.push('Informe um e-mail válido.')
    if (booking.tutor.address.trim().length < 8)
      errors.push('Informe seu endereço, com bairro e cidade.')
    if (
      booking.tutor.emergencyName.trim().length < 3 ||
      !phoneValid(booking.tutor.emergencyPhone)
    )
      errors.push('Informe nome e telefone de um contato de emergência.')
  }
  if (step === 2) {
    if (!booking.pets.length || booking.pets.length > bookingConfig.maxPets)
      errors.push('Informe entre 1 e 4 cães.')
    booking.pets.forEach((pet, index) => {
      if (
        !pet.name.trim() ||
        !pet.breed.trim() ||
        !pet.age.trim() ||
        !Number.isFinite(Number(pet.age)) ||
        Number(pet.age) < 0 ||
        Number(pet.age) > (pet.ageUnit === 'meses' ? 360 : 30) ||
        !pet.weight.trim() ||
        !Number.isFinite(Number(pet.weight)) ||
        Number(pet.weight) <= 0 ||
        Number(pet.weight) > 120 ||
        !pet.size ||
        !pet.sex ||
        !pet.neutered ||
        !pet.vaccination ||
        !pet.parasite ||
        !pet.behavior ||
        !pet.feeding.trim()
      )
        errors.push(
          `Complete os dados obrigatórios do cão ${index + 1}, incluindo idade e peso válidos, alimentação, vacinação e comportamento.`,
        )
    })
  }
  if (step === 3 && !booking.consent)
    errors.push(
      'Confirme que leu as orientações e autoriza compartilhar esses dados com o Auzen pelo WhatsApp.',
    )
  return errors
}
export const displayDate = (value: string) =>
  Number.isFinite(dateNumber(value))
    ? value.split('-').reverse().join('/')
    : 'A definir'
export function buildBookingMessage(booking: Booking) {
  const quote = calculateQuote(booking)
  const clean = (value: string) =>
    value.trim().replace(/\r/g, '') || 'Não informado'
  const text = [
    '🐾 *SOLICITAÇÃO DE RESERVA | AUZEN PET RESORT*',
    'Olá, equipe Auzen! Preparei minha solicitação pelo site. Vamos combinar os detalhes? 💚',
    '',
    '📅 *PERÍODO E SERVIÇO*',
    `Serviço: ${booking.service === 'hotel' ? 'Hotel para cães' : 'Creche para cães'}`,
    `Entrada: ${displayDate(booking.startDate)} às ${booking.arrival}`,
    `Saída: ${displayDate(booking.endDate)} às ${booking.departure}`,
    `Quantidade: ${quote.units} ${booking.service === 'hotel' ? (quote.units === 1 ? 'noite' : 'noites') : (quote.units === 1 ? 'dia' : 'dias')} · ${booking.pets.length} ${booking.pets.length === 1 ? 'cão' : 'cães'}`,
    `🚐 Transporte: ${booking.transport}${booking.transport !== 'Não preciso' ? ' (valor e disponibilidade a combinar)' : ''}`,
    '',
    '👤 *TUTOR*',
    `Nome: ${clean(booking.tutor.name)}`,
    `WhatsApp: ${clean(booking.tutor.phone)}`,
    `E-mail: ${clean(booking.tutor.email)}`,
    `Endereço: ${clean(booking.tutor.address)}`,
    `☎️ Emergência: ${clean(booking.tutor.emergencyName)} · ${clean(booking.tutor.emergencyPhone)}`,
    ...booking.pets.flatMap((pet, index) => [
      '',
      `🐶 *CÃO ${index + 1} — ${clean(pet.name)}*`,
      `Raça: ${clean(pet.breed)} · Idade: ${clean(pet.age)} ${pet.ageUnit}`,
      `Porte: ${pet.size} · Peso: ${pet.weight} kg · Sexo: ${pet.sex} · Castrado: ${pet.neutered}`,
      `💉 Vacinação: ${pet.vaccination}`,
      `Proteção antiparasitária: ${pet.parasite}${pet.parasiteDate ? ` · Última aplicação: ${displayDate(pet.parasiteDate)}` : ''}`,
      `Saúde / alergias: ${clean(pet.health)}`,
      `Medicamentos: ${clean(pet.medication)}`,
      `🍽️ Alimentação e horários: ${clean(pet.feeding)}`,
      `Convivência: ${pet.behavior}`,
      `Cuidados / observações: ${clean(pet.notes)}`,
    ]),
    '',
    '💳 *ESTIMATIVA E PAGAMENTO*',
    ...booking.pets.map((pet, index) => {
      const rate = quote.rates[index]
      return `${clean(pet.name)} (${pet.size || 'porte a informar'}): ${rate === null ? 'valor sob consulta' : `${money(rate)} × ${quote.units} ${quote.units === 1 ? 'diária' : 'diárias'} = ${money(rate * quote.units)}`}`
    }),
    ...(quote.discount
      ? [
          `🎁 MAISDIAS (${bookingConfig.promotion.percent}%): −${money(quote.discount)}`,
        ]
      : []),
    `Total estimado: *${quote.total === null ? 'Sob consulta' : money(quote.total)}*${booking.transport !== 'Não preciso' ? ' + transporte a combinar' : ''}`,
    `Forma de pagamento preferida: ${booking.payment} (a confirmar com a equipe)`,
    'Valor final, disponibilidade e condições de pagamento serão confirmados pela equipe Auzen. Nenhum pagamento foi realizado pelo site.',
    '',
    `📝 Observações gerais: ${clean(booking.notes)}`,
    '',
    '✅ Li as orientações sobre vacinação, proteção antiparasitária, alimentação e horários. Autorizo o compartilhamento destes dados com o Auzen para tratar da reserva.',
    'Aguardo a confirmação da equipe. Obrigado! 🐾',
  ]
  return text.join('\n')
}
export const bookingWhatsAppUrl = (booking: Booking) =>
  `https://wa.me/${contactConfig.whatsapp.digits}?text=${encodeURIComponent(buildBookingMessage(booking))}`
