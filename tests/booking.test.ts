import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  bookingWhatsAppUrl,
  buildBookingMessage,
  calculateQuote,
  emptyPet,
  newBooking,
  todayInBahia,
  validateStep,
} from '../src/utils/booking'

const valid = () => {
  const booking = newBooking()
  booking.startDate = '2027-01-01'
  booking.endDate = '2027-01-06'
  booking.tutor = {
    name: 'Ana Teste',
    phone: '71999999999',
    email: 'ana@example.com',
    address: 'Rua Exemplo, 100, Lauro de Freitas',
    emergencyName: 'Carlos Teste',
    emergencyPhone: '71988888888',
  }
  booking.pets = [
    {
      ...emptyPet(),
      name: 'Bento',
      breed: 'SRD',
      age: '3',
      weight: '12',
      size: 'Médio',
      sex: 'Macho',
      neutered: 'Sim',
      vaccination: 'Em dia — apresentarei a carteira',
      parasite: 'Em dia',
      feeding: 'Ração habitual, 2x ao dia',
      behavior: 'Sociável',
    },
  ]
  booking.consent = true
  return booking
}
test('hotel counts nights across month boundaries', () => {
  const booking = valid()
  booking.startDate = '2027-01-31'
  booking.endDate = '2027-02-02'
  assert.equal(calculateQuote(booking).units, 2)
  assert.equal(calculateQuote(booking).total, 230)
})
test('daycare includes both dates and accepts a single day', () => {
  const booking = valid()
  booking.service = 'daycare'
  booking.endDate = booking.startDate
  assert.equal(calculateQuote(booking).units, 1)
  assert.equal(calculateQuote(booking).total, 75)
})
test('hotel rejects same-day checkout and inverse dates', () => {
  const booking = valid()
  booking.endDate = booking.startDate
  assert.equal(calculateQuote(booking).units, 0)
  assert.ok(validateStep(booking, 0, '2026-12-01').length)
  booking.endDate = '2026-12-31'
  assert.equal(calculateQuote(booking).units, 0)
})
test('invalid calendar date never creates a quote', () => {
  const booking = valid()
  booking.startDate = '2027-02-30'
  assert.equal(calculateQuote(booking).units, 0)
})
test('MAISDIAS discounts 5 nights per pet, not transport', () => {
  const booking = valid()
  booking.promo = ' maisdias '
  booking.pets.push({ ...booking.pets[0], name: 'Mel' })
  booking.transport = 'Buscar e levar'
  assert.deepEqual(calculateQuote(booking), {
    units: 5,
    rates: [115, 115],
    complete: true,
    subtotal: 1150,
    discount: 115,
    total: 1035,
    eligible: true,
  })
})
test('5 medium-dog daycare days total R$337.50 with promotion', () => {
  const booking = valid()
  booking.service = 'daycare'
  booking.endDate = '2027-01-05'
  booking.promo = 'MAISDIAS'
  assert.equal(calculateQuote(booking).total, 337.5)
})
test('invalid and ineligible coupons block advancement', () => {
  const booking = valid()
  booking.promo = 'OTHER'
  assert.ok(
    validateStep(booking, 0, '2026-12-01').some((error) =>
      error.includes('código'),
    ),
  )
  booking.promo = 'MAISDIAS'
  booking.endDate = '2027-01-03'
  assert.ok(
    validateStep(booking, 0, '2026-12-01').some((error) =>
      error.includes('5 diárias'),
    ),
  )
})
test('hotel and daycare enforce their separate departure windows', () => {
  const booking = valid()
  booking.departure = '09:30'
  assert.ok(validateStep(booking, 0, '2026-12-01').length)
  booking.service = 'daycare'
  booking.departure = '17:00'
  assert.equal(validateStep(booking, 0, '2026-12-01').length, 0)
  booking.arrival = '17:00'
  assert.ok(validateStep(booking, 0, '2026-12-01').length)
})
test('past dates and periods longer than 60 days block requests', () => {
  const booking = valid()
  assert.ok(validateStep(booking, 0, '2027-02-01').length)
  booking.endDate = '2027-04-01'
  assert.ok(
    validateStep(booking, 0, '2026-12-01').some((error) =>
      error.includes('60 dias'),
    ),
  )
})
test('tutor requires complete emergency and contact information', () => {
  const booking = valid()
  assert.equal(validateStep(booking, 1).length, 0)
  booking.tutor.emergencyPhone = '71'
  booking.tutor.email = 'wrong'
  assert.equal(validateStep(booking, 1).length, 2)
})
test('each additional pet must be completed and weight must be finite', () => {
  const booking = valid()
  booking.pets.push(emptyPet())
  assert.equal(validateStep(booking, 2).length, 1)
  booking.pets.pop()
  booking.pets[0].weight = 'not a number'
  assert.equal(validateStep(booking, 2).length, 1)
})
test('consent must be given before opening WhatsApp', () => {
  const booking = valid()
  booking.consent = false
  assert.equal(validateStep(booking, 3).length, 1)
})
test('Bahia calendar is used close to midnight UTC', () => {
  assert.equal(todayInBahia(new Date('2026-10-02T01:00:00Z')), '2026-10-01')
})
test('one encoded message contains all supplied data and the new destination', () => {
  const booking = valid()
  booking.promo = 'MAISDIAS'
  booking.pets[0].health = 'Alergia a frango'
  booking.pets[0].medication = 'Medicação às 08h'
  booking.pets[0].notes = 'Medo de chuva'
  booking.notes = 'Chegada combinada'
  booking.payment = 'Cartão de crédito'
  booking.transport = 'Buscar e levar'
  const url = new URL(bookingWhatsAppUrl(booking))
  assert.equal(url.pathname, '/5571993972239')
  assert.equal(url.searchParams.get('text'), buildBookingMessage(booking))
  for (const value of [
    'Ana Teste',
    'Bento',
    'Carlos Teste',
    'Ração habitual',
    'Alergia a frango',
    'Medicação às 08h',
    'Medo de chuva',
    'Chegada combinada',
    'Cartão de crédito',
    'Buscar e levar',
    'R$ 517,50',
    'Nenhum pagamento',
  ])
    assert.ok(url.searchParams.get('text')?.includes(value), value)
})

test('published prices and five-day promotions apply to each size and service', () => {
  for (const [service, size, rate, total] of [
    ['hotel', 'Pequeno', 105, 472.5],
    ['hotel', 'Médio', 115, 517.5],
    ['daycare', 'Pequeno', 65, 292.5],
    ['daycare', 'Médio', 75, 337.5],
  ] as const) {
    const booking = valid()
    booking.service = service
    booking.endDate = service === 'hotel' ? '2027-01-06' : '2027-01-05'
    booking.pets[0].size = size
    booking.promo = 'MAISDIAS'
    assert.deepEqual(calculateQuote(booking).rates, [rate])
    assert.equal(calculateQuote(booking).total, total)
  }
})
test('mixed sizes are priced separately, including the WhatsApp breakdown', () => {
  const booking = valid()
  booking.pets.push({ ...booking.pets[0], name: 'Mel', size: 'Pequeno' })
  booking.promo = 'MAISDIAS'
  assert.equal(calculateQuote(booking).subtotal, 1100)
  assert.equal(calculateQuote(booking).total, 990)
  assert.match(buildBookingMessage(booking), /Bento \(Médio\): R\$\s115,00/)
  assert.match(buildBookingMessage(booking), /Mel \(Pequeno\): R\$\s105,00/)
  booking.pets.pop()
  booking.service = 'daycare'
  booking.endDate = '2027-01-05'
  assert.equal(calculateQuote(booking).total, 337.5)
})
test('missing and unpriced sizes never display a misleading complete total', () => {
  for (const size of ['', 'Grande', 'Gigante', 'unknown']) {
    const booking = valid()
    booking.pets.push({ ...booking.pets[0], size })
    booking.promo = 'MAISDIAS'
    const quote = calculateQuote(booking)
    assert.equal(quote.complete, false)
    assert.equal(quote.total, null)
    assert.equal(quote.subtotal, null)
    assert.equal(quote.discount, 0)
    assert.match(buildBookingMessage(booking), /Total estimado: \*Sob consulta\*/)
  }
})
