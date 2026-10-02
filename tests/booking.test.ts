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
  assert.equal(calculateQuote(booking).total, 200)
})
test('daycare includes both dates and accepts a single day', () => {
  const booking = valid()
  booking.service = 'daycare'
  booking.endDate = booking.startDate
  assert.equal(calculateQuote(booking).units, 1)
  assert.equal(calculateQuote(booking).total, 65)
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
    rate: 100,
    subtotal: 1000,
    discount: 100,
    total: 900,
    eligible: true,
  })
})
test('5 daycare days total R$292.50 with promotion', () => {
  const booking = valid()
  booking.service = 'daycare'
  booking.endDate = '2027-01-05'
  booking.promo = 'MAISDIAS'
  assert.equal(calculateQuote(booking).total, 292.5)
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
  assert.equal(url.pathname, '/5571982412339')
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
    'R$ 450,00',
    'Nenhum pagamento',
  ])
    assert.ok(url.searchParams.get('text')?.includes(value), value)
})
