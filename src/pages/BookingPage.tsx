import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Copy,
  CreditCard,
  MessageCircle,
  PawPrint,
  Plus,
  Trash2,
  UserRound,
} from 'lucide-react'
import { useRef, useState, type ReactNode, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import styled from 'styled-components'
import { Container } from '../components/Container'
import {
  DisplayTitle,
  Eyebrow,
  Heading,
  Note,
  PageShell,
  Section,
} from '../styles/pages'
import {
  bookingConfig,
  paymentOptions,
  transportOptions,
} from '../config/booking'
import { contactConfig } from '../config/contact'
import {
  bookingWhatsAppUrl,
  buildBookingMessage,
  calculateQuote,
  displayDate,
  emptyPet,
  money,
  newBooking,
  todayInBahia,
  validateStep,
  type Booking,
  type Pet,
} from '../utils/booking'

const Intro = styled.div`
  padding: 3rem 0 2rem;
  h1 {
    font-size: clamp(2.8rem, 5vw, 4.6rem);
    margin-bottom: 1rem;
  }
  p:last-child {
    max-width: 40rem;
    color: ${({ theme }) => theme.colors.brown};
  }
`
const Progress = styled.ol`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 0;
  margin: 0 0 3rem;
  list-style: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  li {
    min-width: 0;
  }
  button {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    min-height: 3.6rem;
    padding: 0.6rem 0.3rem;
    border: 0;
    border-bottom: 2px solid transparent;
    color: ${({ theme }) => theme.colors.forestMuted};
    background: none;
    font-size: 0.78rem;
    font-weight: 650;
    cursor: pointer;
    width: 100%;
  }
  button[aria-current='step'] {
    color: ${({ theme }) => theme.colors.forest};
    border-bottom-color: ${({ theme }) => theme.colors.terracotta};
  }
  button:disabled {
    cursor: default;
  }
  svg {
    flex-shrink: 0;
  }
  @media (max-width: 520px) {
    button {
      flex-direction: column;
      font-size: 0.62rem;
      gap: 0.4rem;
      padding-bottom: 0.9rem;
    }
  }
`
const Workspace = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.75fr) minmax(17rem, 1fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: start;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`
const FormArea = styled.div`
  min-width: 0;
  h2 {
    font-size: clamp(2rem, 3vw, 2.8rem);
  }
  fieldset {
    border: 0;
    padding: 0;
    margin: 0 0 2rem;
    min-width: 0;
  }
  legend {
    font-weight: 750;
    margin: 0 0 1rem;
  }
  h3 {
    margin: 2rem 0 1rem;
    font-size: 1rem;
  }
  hr {
    border: 0;
    border-top: 1px solid ${({ theme }) => theme.colors.line};
    margin: 2rem 0;
  }
`
const Fields = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
  > div {
    min-width: 0;
  }
  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`
const FieldShell = styled.div<{ $wide: boolean }>`
  grid-column: ${({ $wide }) => ($wide ? '1 / -1' : 'auto')};
  label {
    display: block;
    font-size: 0.8rem;
    font-weight: 650;
    margin-bottom: 0.45rem;
  }
  input,
  select,
  textarea {
    display: block;
    width: 100%;
    min-height: 3.2rem;
    padding: 0.85rem 1rem;
    color: ${({ theme }) => theme.colors.ink};
    background: ${({ theme }) => theme.colors.warmWhite};
    border: 1px solid ${({ theme }) => theme.colors.line};
    border-radius: 0.5rem;
    font-size: 1rem;
    line-height: 1.4;
  }
  textarea {
    resize: vertical;
    min-height: 6.5rem;
  }
  input:focus,
  select:focus,
  textarea:focus {
    border-color: ${({ theme }) => theme.colors.forest};
  }
  small {
    display: block;
    margin-top: 0.4rem;
    color: ${({ theme }) => theme.colors.brown};
    font-size: 0.72rem;
  }
`
function Field({
  name,
  label,
  hint,
  wide = false,
  children,
}: {
  name: string
  label: string
  hint?: string
  wide?: boolean
  children: ReactNode
}) {
  return (
    <FieldShell $wide={wide}>
      <label htmlFor={name}>{label}</label>
      {children}
      {hint && <small id={`${name}-hint`}>{hint}</small>}
    </FieldShell>
  )
}
const Choices = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  label {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    padding: 1.1rem;
    border: 1px solid ${({ theme }) => theme.colors.line};
    border-radius: 0.75rem;
    background: ${({ theme }) => theme.colors.warmWhite};
    cursor: pointer;
    min-width: 0;
  }
  label:has(input:checked) {
    border-color: ${({ theme }) => theme.colors.forest};
    background: ${({ theme }) => theme.colors.sand};
  }
  input {
    accent-color: ${({ theme }) => theme.colors.forest};
  }
  span {
    display: block;
    font-size: 0.85rem;
    font-weight: 700;
  }
  small {
    display: block;
    font-size: 0.72rem;
    font-weight: 500;
    margin-top: 0.3rem;
  }
  @media (max-width: 410px) {
    grid-template-columns: 1fr;
  }
`
const ActionButton = styled.button<{ $secondary?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  min-height: 3.25rem;
  padding: 0.8rem 1.3rem;
  border: 1px solid
    ${({ theme, $secondary }) => ($secondary ? theme.colors.line : 'transparent')};
  border-radius: 999px;
  color: ${({ theme, $secondary }) => ($secondary ? theme.colors.forest : theme.colors.white)};
  background: ${({ theme, $secondary }) => ($secondary ? 'transparent' : theme.colors.terracotta)};
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition:
    transform 180ms,
    background 180ms;
  &:hover {
    transform: translateY(-2px);
  }
  &:disabled {
    opacity: 0.55;
    cursor: wait;
  }
`
const FormActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1.5rem;
  margin-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.line};
`
const Summary = styled.aside`
  position: sticky;
  top: 7rem;
  background: ${({ theme }) => theme.colors.sand};
  border-radius: 0 1.5rem 0 0;
  padding: 1.8rem;
  min-width: 0;
  img {
    width: 100%;
    height: 8rem;
    object-fit: cover;
    border-radius: 0.35rem;
    margin-bottom: 1.5rem;
  }
  h2 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }
  dl {
    margin: 0;
  }
  dl > div {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.7rem 0;
    font-size: 0.8rem;
  }
  dd {
    margin: 0;
    text-align: right;
    font-weight: 700;
  }
  dt {
    color: ${({ theme }) => theme.colors.brown};
  }
  .total {
    border-top: 1px solid ${({ theme }) => theme.colors.line};
    margin-top: 0.5rem;
    padding-top: 1rem;
    align-items: center;
    dd {
      font-size: 1.7rem;
      letter-spacing: -0.04em;
      color: ${({ theme }) => theme.colors.forest};
    }
  }
  summary {
    cursor: pointer;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
  }
  summary::-webkit-details-marker {
    display: none;
  }
  summary svg {
    flex-shrink: 0;
    transition: transform 200ms;
  }
  details[open] summary svg {
    transform: rotate(180deg);
  }
  .compact-total {
    display: none;
  }
  @media (max-width: 900px) {
    position: static;
    order: -1;
    padding: 1.25rem;
    img {
      display: none;
    }
    h2 {
      font-size: 1.5rem;
      margin: 0;
    }
    details:not([open]) .compact-total {
      display: inline;
      font-size: 0.75rem;
      font-weight: 750;
      margin-left: auto;
    }
    details[open] summary {
      margin-bottom: 1rem;
    }
  }
`
const ErrorBox = styled.div`
  padding: 1rem 1.2rem;
  margin: 1.2rem 0;
  background: #fae9df;
  border-left: 3px solid ${({ theme }) => theme.colors.terracotta};
  color: ${({ theme }) => theme.colors.terracottaDark};
  font-size: 0.85rem;
  ul {
    margin: 0;
    padding-left: 1rem;
  }
`
const PetHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.2rem 0;
  margin-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.line};
  h3 {
    margin: 0;
    display: flex;
    gap: 0.6rem;
    align-items: center;
  }
  button {
    border: 0;
    background: none;
    color: ${({ theme }) => theme.colors.terracotta};
    display: flex;
    gap: 0.4rem;
    align-items: center;
    cursor: pointer;
    font-size: 0.75rem;
    min-height: 2.75rem;
  }
`
const CheckLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.84rem;
  line-height: 1.7;
  padding: 1.2rem 0;
  input {
    flex-shrink: 0;
    width: 1.1rem;
    height: 1.1rem;
    margin-top: 0.25rem;
    accent-color: ${({ theme }) => theme.colors.forest};
  }
  a {
    text-decoration: underline;
  }
`
const ReviewBlock = styled.div`
  padding: 1.3rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }
  h3 {
    margin: 0 0 0.65rem;
  }
  button {
    color: ${({ theme }) => theme.colors.terracotta};
    background: transparent;
    border: 0;
    text-decoration: underline;
    cursor: pointer;
    min-height: 2.5rem;
    font-size: 0.78rem;
  }
  p {
    margin: 0.3rem 0;
    font-size: 0.86rem;
    overflow-wrap: anywhere;
  }
  strong {
    color: ${({ theme }) => theme.colors.forest};
  }
`
const MessagePreview = styled.details`
  margin: 1.5rem 0;
  font-size: 0.82rem;
  summary {
    cursor: pointer;
    font-weight: 700;
    padding: 0.75rem 0;
  }
  pre {
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    font-family: inherit;
    background: ${({ theme }) => theme.colors.warmWhite};
    padding: 1.2rem;
    border: 1px solid ${({ theme }) => theme.colors.line};
    max-height: 23rem;
    overflow: auto;
    font-size: 0.78rem;
  }
`
const steps = [
  { title: 'Período', icon: CalendarDays },
  { title: 'Tutor', icon: UserRound },
  { title: 'Seu cão', icon: PawPrint },
  { title: 'Revisão', icon: CreditCard },
]
const timeOptions = (end: number) =>
  Array.from(
    { length: (end - 7) * 2 + 1 },
    (_, index) =>
      `${String(7 + Math.floor(index / 2)).padStart(2, '0')}:${index % 2 ? '30' : '00'}`,
  )

export function BookingPage() {
  const [params] = useSearchParams()
  const [booking, setBooking] = useState<Booking>(() =>
    newBooking(
      params.get('servico') === 'daycare' ? 'daycare' : 'hotel',
      params.get('cupom') === 'MAISDIAS' ? 'MAISDIAS' : '',
    ),
  )
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState<string[]>([])
  const [copyStatus, setCopyStatus] = useState('')
  const [opened, setOpened] = useState(false)
  const errorRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const reduced = useReducedMotion()
  const quote = calculateQuote(booking)
  const update = <K extends keyof Booking>(key: K, value: Booking[K]) => {
    setBooking((previous) => ({ ...previous, [key]: value }))
    setOpened(false)
    setErrors([])
  }
  const updateTutor = (key: keyof Booking['tutor'], value: string) =>
    setBooking((previous) => ({
      ...previous,
      tutor: { ...previous.tutor, [key]: value },
    }))
  const updatePet = (index: number, key: keyof Pet, value: string) =>
    setBooking((previous) => ({
      ...previous,
      pets: previous.pets.map((pet, item) =>
        item === index ? { ...pet, [key]: value } : pet,
      ),
    }))
  const showErrors = (messages: string[]) => {
    setErrors(messages)
    requestAnimationFrame(() => errorRef.current?.focus())
  }
  const moveTo = (value: number) => {
    setErrors([])
    setStep(value)
    requestAnimationFrame(() => {
      headingRef.current?.focus({ preventScroll: true })
      headingRef.current?.scrollIntoView({
        behavior: reduced ? 'instant' : 'smooth',
        block: 'start',
      })
    })
  }
  const next = (event: FormEvent) => {
    event.preventDefault()
    const messages = validateStep(booking, step)
    if (messages.length) showErrors(messages)
    else moveTo(Math.min(step + 1, 3))
  }
  const message = buildBookingMessage(booking)
  const tutorField = (
    key: keyof Booking['tutor'],
    label: string,
    type = 'text',
    autoComplete?: string,
    wide = false,
  ) => (
    <Field key={key} name={key} label={label} wide={wide}>
      <input
        id={key}
        name={key}
        type={type}
        autoComplete={autoComplete}
        required
        maxLength={key === 'address' ? 220 : 100}
        value={booking.tutor[key]}
        onChange={(event) => updateTutor(key, event.target.value)}
      />
    </Field>
  )
  const petInput = (
    index: number,
    key: keyof Pet,
    label: string,
    type = 'text',
    wide = false,
    hint?: string,
  ) => (
    <Field
      key={key}
      name={`pet-${index}-${key}`}
      label={label}
      wide={wide}
      hint={hint}
    >
      <input
        id={`pet-${index}-${key}`}
        type={type}
        required
        maxLength={100}
        min={type === 'number' ? (key === 'weight' ? '.1' : '0') : undefined}
        max={
          type === 'number'
            ? key === 'weight'
              ? '120'
              : booking.pets[index].ageUnit === 'meses'
                ? '360'
                : '30'
            : undefined
        }
        step={type === 'number' ? '.1' : undefined}
        value={booking.pets[index][key]}
        onChange={(event) => updatePet(index, key, event.target.value)}
      />
    </Field>
  )
  const petSelect = (
    index: number,
    key: keyof Pet,
    label: string,
    options: string[],
    wide = false,
  ) => (
    <Field key={key} name={`pet-${index}-${key}`} label={label} wide={wide}>
      <select
        id={`pet-${index}-${key}`}
        required
        value={booking.pets[index][key]}
        onChange={(event) => updatePet(index, key, event.target.value)}
      >
        <option value="">Selecione</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </Field>
  )
  const petText = (
    index: number,
    key: keyof Pet,
    label: string,
    required = false,
    hint?: string,
  ) => (
    <Field
      key={key}
      name={`pet-${index}-${key}`}
      label={label}
      wide
      hint={hint}
    >
      <textarea
        id={`pet-${index}-${key}`}
        maxLength={350}
        required={required}
        value={booking.pets[index][key]}
        onChange={(event) => updatePet(index, key, event.target.value)}
      />
    </Field>
  )

  return (
    <PageShell>
      <Container>
        <Intro>
          <Eyebrow>Sua próxima reserva</Eyebrow>
          <DisplayTitle>Vamos planejar os dias do seu cão?</DisplayTitle>
          <p>
            Conte um pouco sobre vocês. Ao final, sua solicitação segue completa
            para a equipe no WhatsApp.
          </p>
        </Intro>
        <Progress aria-label="Etapas da solicitação">
          {steps.map((item, index) => (
            <li key={item.title}>
              <button
                type="button"
                disabled={index > step}
                aria-current={index === step ? 'step' : undefined}
                onClick={() => moveTo(index)}
              >
                <item.icon size={18} />{' '}
                {index < step ? <Check size={14} aria-hidden="true" /> : null}
                {item.title}
              </button>
            </li>
          ))}
        </Progress>
        <Workspace>
          <FormArea>
            <form noValidate onSubmit={next}>
              <Heading
                ref={headingRef}
                tabIndex={-1}
                style={{ scrollMarginTop: '7rem' }}
              >
                {
                  [
                    'Escolha o período.',
                    'Prazer em conhecer você.',
                    'Cada cão tem seu jeito.',
                    'Confira antes de enviar.',
                  ][step]
                }
              </Heading>
              <Note>Campos com * são obrigatórios.</Note>
              {errors.length > 0 && (
                <ErrorBox role="alert" tabIndex={-1} ref={errorRef}>
                  <ul>
                    {errors.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </ErrorBox>
              )}
              <motion.div
                key={step}
                initial={reduced ? false : { opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
              >
                {step === 0 && (
                  <>
                    <fieldset>
                      <legend>Como seu cão vai viver o Auzen? *</legend>
                      <Choices>
                        {(['hotel', 'daycare'] as const).map((service) => (
                          <label key={service}>
                            <input
                              type="radio"
                              name="service"
                              value={service}
                              checked={booking.service === service}
                              onChange={() =>
                                setBooking((previous) => ({
                                  ...previous,
                                  service,
                                  departure:
                                    service === 'hotel' ? '09:00' : '17:00',
                                }))
                              }
                            />
                            <span>
                              {service === 'hotel'
                                ? 'Hotel · hospedagem'
                                : 'Creche · Day Care'}
                              <small>
                                {money(bookingConfig.rates[service])} / diária
                                por cão
                              </small>
                            </span>
                          </label>
                        ))}
                      </Choices>
                    </fieldset>
                    <Fields>
                      <Field name="startDate" label="Data de entrada *">
                        <input
                          id="startDate"
                          type="date"
                          required
                          min={todayInBahia()}
                          value={booking.startDate}
                          onChange={(event) =>
                            update('startDate', event.target.value)
                          }
                        />
                      </Field>
                      <Field
                        name="endDate"
                        label={
                          booking.service === 'hotel'
                            ? 'Data de saída *'
                            : 'Último dia de creche *'
                        }
                      >
                        <input
                          id="endDate"
                          type="date"
                          required
                          min={booking.startDate || todayInBahia()}
                          value={booking.endDate}
                          onChange={(event) =>
                            update('endDate', event.target.value)
                          }
                        />
                      </Field>
                      <Field
                        name="arrival"
                        label="Horário de entrada *"
                        hint="Entre 07h e 17h."
                      >
                        <select
                          id="arrival"
                          value={booking.arrival}
                          onChange={(event) =>
                            update('arrival', event.target.value)
                          }
                        >
                          {timeOptions(17).map((time) => (
                            <option key={time}>{time}</option>
                          ))}
                        </select>
                      </Field>
                      <Field
                        name="departure"
                        label="Horário de saída *"
                        hint={
                          booking.service === 'hotel'
                            ? 'Check-out do hotel até 09h.'
                            : 'Saída da creche até 17h, em cada dia.'
                        }
                      >
                        <select
                          id="departure"
                          value={booking.departure}
                          onChange={(event) =>
                            update('departure', event.target.value)
                          }
                        >
                          {timeOptions(
                            booking.service === 'hotel' ? 9 : 17,
                          ).map((time) => (
                            <option key={time}>{time}</option>
                          ))}
                        </select>
                      </Field>
                      <Field
                        name="transport"
                        label="Precisa de transporte?"
                        wide
                        hint="Valor e disponibilidade serão combinados com a equipe, fora desta estimativa."
                      >
                        <select
                          id="transport"
                          value={booking.transport}
                          onChange={(event) =>
                            update('transport', event.target.value)
                          }
                        >
                          {transportOptions.map((value) => (
                            <option key={value}>{value}</option>
                          ))}
                        </select>
                      </Field>
                      <Field
                        name="promo"
                        label="Código promocional"
                        wide
                        hint="MAISDIAS: 10% nas diárias para períodos de 5 diárias ou mais."
                      >
                        <input
                          id="promo"
                          value={booking.promo}
                          maxLength={20}
                          autoCapitalize="characters"
                          onChange={(event) =>
                            update('promo', event.target.value.toUpperCase())
                          }
                          placeholder="Se tiver um código, informe aqui"
                        />
                      </Field>
                    </Fields>
                    <Note>
                      Hotel: conta-se uma diária por noite. Creche: contam-se
                      todos os dias do período, incluindo a primeira e a última
                      data. A equipe verifica a disponibilidade antes de
                      confirmar.
                    </Note>
                  </>
                )}
                {step === 1 && (
                  <Fields>
                    {tutorField(
                      'name',
                      'Nome completo *',
                      'text',
                      'name',
                      true,
                    )}
                    {tutorField('phone', 'WhatsApp com DDD *', 'tel', 'tel')}
                    {tutorField('email', 'E-mail *', 'email', 'email')}
                    {tutorField(
                      'address',
                      'Endereço, bairro e cidade *',
                      'text',
                      'street-address',
                      true,
                    )}
                    {tutorField(
                      'emergencyName',
                      'Nome do contato de emergência *',
                    )}
                    {tutorField(
                      'emergencyPhone',
                      'Telefone de emergência com DDD *',
                      'tel',
                    )}
                    <Note>
                      Se pedir transporte, inclua o número e o complemento do
                      endereço. O contato de emergência deve poder atender
                      enquanto seu cão estiver conosco.
                    </Note>
                  </Fields>
                )}
                {step === 2 && (
                  <>
                    {booking.pets.map((pet, index) => (
                      <fieldset key={index}>
                        <PetHeading>
                          <h3>
                            <PawPrint size={19} /> Cão {index + 1}
                            {pet.name ? ` · ${pet.name}` : ''}
                          </h3>
                          {booking.pets.length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                update(
                                  'pets',
                                  booking.pets.filter(
                                    (_, item) => item !== index,
                                  ),
                                )
                              }
                              aria-label={`Remover cão ${index + 1}`}
                            >
                              <Trash2 size={15} /> Remover
                            </button>
                          )}
                        </PetHeading>
                        <Fields>
                          {petInput(index, 'name', 'Nome do cão *')}
                          {petInput(
                            index,
                            'breed',
                            'Raça (ou sem raça definida) *',
                          )}
                          {petInput(index, 'age', 'Idade *', 'number')}
                          {petSelect(index, 'ageUnit', 'Idade em *', [
                            'anos',
                            'meses',
                          ])}
                          {petInput(index, 'weight', 'Peso em kg *', 'number')}
                          {petSelect(index, 'size', 'Porte *', [
                            'Pequeno',
                            'Médio',
                            'Grande',
                            'Gigante',
                          ])}
                          {petSelect(index, 'sex', 'Sexo *', [
                            'Macho',
                            'Fêmea',
                          ])}
                          {petSelect(index, 'neutered', 'Castrado? *', [
                            'Sim',
                            'Não',
                          ])}
                          {petSelect(index, 'vaccination', 'Vacinação *', [
                            'Em dia — apresentarei a carteira',
                            'Preciso confirmar com a equipe',
                          ])}
                          {petSelect(
                            index,
                            'parasite',
                            'Proteção contra pulgas e carrapatos *',
                            ['Em dia', 'Preciso atualizar / confirmar'],
                          )}
                          <Field
                            name={`pet-${index}-parasiteDate`}
                            label="Última aplicação (opcional)"
                            wide
                          >
                            <input
                              id={`pet-${index}-parasiteDate`}
                              type="date"
                              max={todayInBahia()}
                              value={pet.parasiteDate}
                              onChange={(event) =>
                                updatePet(
                                  index,
                                  'parasiteDate',
                                  event.target.value,
                                )
                              }
                            />
                          </Field>
                          {petText(
                            index,
                            'health',
                            'Saúde e alergias',
                            false,
                            'Se não houver, escreva “nenhuma”.',
                          )}
                          {petText(
                            index,
                            'medication',
                            'Medicamentos e orientações',
                            false,
                            'Nome, dose, horários e qualquer cuidado que precise ser combinado.',
                          )}
                          {petText(
                            index,
                            'feeding',
                            'Alimentação, porções e horários *',
                            true,
                            'Traga a alimentação habitual do seu cão.',
                          )}
                          {petSelect(
                            index,
                            'behavior',
                            'Como ele convive com outros cães? *',
                            [
                              'Sociável',
                              'Prefere ficar mais tranquilo',
                              'Precisa de adaptação',
                              'Preciso conversar sobre comportamento',
                            ],
                            true,
                          )}
                          {petText(
                            index,
                            'notes',
                            'Outros cuidados ou características',
                            false,
                            'Ex.: medo de chuva, dificuldade para ficar sozinho, rotina de descanso.',
                          )}
                        </Fields>
                      </fieldset>
                    ))}
                    {booking.pets.length < bookingConfig.maxPets && (
                      <ActionButton
                        type="button"
                        $secondary
                        onClick={() =>
                          update('pets', [...booking.pets, emptyPet()])
                        }
                      >
                        <Plus size={17} /> Adicionar outro cão
                      </ActionButton>
                    )}
                    <Note>
                      Até 4 cães por solicitação. A estimativa é calculada por
                      cão. Mais cães? Fale com a equipe pelo WhatsApp.
                    </Note>
                  </>
                )}
                {step === 3 && (
                  <>
                    <ReviewBlock>
                      <div>
                        <h3>📅 Período e serviço</h3>
                        <button type="button" onClick={() => moveTo(0)}>
                          Editar
                        </button>
                      </div>
                      <p>
                        {booking.service === 'hotel' ? 'Hotel' : 'Creche'} ·{' '}
                        {quote.units}{' '}
                        {booking.service === 'hotel' ? 'noite(s)' : 'dia(s)'}
                      </p>
                      <p>
                        {displayDate(booking.startDate)} às {booking.arrival} →{' '}
                        {displayDate(booking.endDate)} às {booking.departure}
                      </p>
                      <p>Transporte: {booking.transport}</p>
                    </ReviewBlock>
                    <ReviewBlock>
                      <div>
                        <h3>👤 Tutor e emergência</h3>
                        <button type="button" onClick={() => moveTo(1)}>
                          Editar
                        </button>
                      </div>
                      <p>
                        {booking.tutor.name} · {booking.tutor.phone}
                      </p>
                      <p>{booking.tutor.email}</p>
                      <p>{booking.tutor.address}</p>
                      <p>
                        Emergência: {booking.tutor.emergencyName} ·{' '}
                        {booking.tutor.emergencyPhone}
                      </p>
                    </ReviewBlock>
                    <ReviewBlock>
                      <div>
                        <h3>🐶 Seus cães</h3>
                        <button type="button" onClick={() => moveTo(2)}>
                          Editar
                        </button>
                      </div>
                      {booking.pets.map((pet, index) => (
                        <div
                          key={index}
                          style={{ display: 'block', paddingBottom: '.7rem' }}
                        >
                          <p>
                            <strong>{pet.name}</strong> · {pet.breed} ·{' '}
                            {pet.age} {pet.ageUnit} · {pet.weight} kg
                          </p>
                          <p>
                            {pet.sex} · {pet.size} · Castrado: {pet.neutered}
                          </p>
                          <p>
                            Vacinação: {pet.vaccination}. Proteção
                            antiparasitária: {pet.parasite}.
                          </p>
                          <p>Alimentação: {pet.feeding}</p>
                          <p>Convivência: {pet.behavior}</p>
                          {pet.health && <p>Saúde: {pet.health}</p>}
                          {pet.medication && (
                            <p>Medicamentos: {pet.medication}</p>
                          )}
                        </div>
                      ))}
                    </ReviewBlock>
                    <h3>💳 Pagamento e observações</h3>
                    <Fields>
                      <Field
                        name="payment"
                        label="Forma de pagamento preferida"
                        wide
                        hint="A equipe confirma as condições pelo WhatsApp. O site não realiza cobranças."
                      >
                        <select
                          id="payment"
                          value={booking.payment}
                          onChange={(event) =>
                            update('payment', event.target.value)
                          }
                        >
                          {paymentOptions.map((value) => (
                            <option key={value}>{value}</option>
                          ))}
                        </select>
                      </Field>
                      <Field
                        name="notes"
                        label="Observações gerais (opcional)"
                        wide
                      >
                        <textarea
                          id="notes"
                          maxLength={500}
                          value={booking.notes}
                          onChange={(event) =>
                            update('notes', event.target.value)
                          }
                        />
                      </Field>
                    </Fields>
                    <CheckLabel>
                      <input
                        type="checkbox"
                        checked={booking.consent}
                        onChange={(event) =>
                          update('consent', event.target.checked)
                        }
                      />
                      <span>
                        Li as{' '}
                        <Link
                          to="/informacoes"
                          target="_blank"
                          rel="noreferrer"
                        >
                          orientações para a estadia
                        </Link>{' '}
                        e autorizo o compartilhamento dos dados com o Auzen pelo
                        WhatsApp para tratar da reserva. Sei que a vaga, o valor
                        final e as condições de pagamento dependem da
                        confirmação da equipe. *
                      </span>
                    </CheckLabel>
                    <MessagePreview>
                      <summary>
                        Ver a mensagem completa que será preparada
                      </summary>
                      <pre>{message}</pre>
                      <ActionButton
                        type="button"
                        $secondary
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(message)
                            setCopyStatus(
                              'Mensagem copiada. Você pode colá-la no WhatsApp.',
                            )
                          } catch {
                            setCopyStatus(
                              'Não foi possível copiar. Selecione a mensagem acima para copiar manualmente.',
                            )
                          }
                        }}
                      >
                        <Copy size={15} /> Copiar mensagem
                      </ActionButton>
                      <p role="status">{copyStatus}</p>
                    </MessagePreview>
                    <Note>
                      Seus dados não são armazenados pelo site. Ao abrir o
                      WhatsApp, revise a mensagem e toque em enviar para{' '}
                      <strong>{contactConfig.whatsapp.display}</strong>.
                      Apresente a carteira de vacinação diretamente à equipe.
                    </Note>
                    {opened && (
                      <p role="status">
                        A solicitação está preparada. Envie a mensagem no
                        WhatsApp e aguarde a confirmação do Auzen.
                      </p>
                    )}
                  </>
                )}
              </motion.div>
              <FormActions>
                {step > 0 ? (
                  <ActionButton
                    type="button"
                    $secondary
                    onClick={() => moveTo(step - 1)}
                  >
                    <ArrowLeft size={17} /> Voltar
                  </ActionButton>
                ) : (
                  <Link to="/servicos">Ver serviços e valores</Link>
                )}
                {step < 3 ? (
                  <ActionButton type="submit">
                    Continuar <ArrowRight size={17} />
                  </ActionButton>
                ) : (
                  <ActionButton
                    as="a"
                    href={bookingWhatsAppUrl(booking)}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(event) => {
                      const allErrors = [0, 1, 2, 3].flatMap((value) =>
                        validateStep(booking, value),
                      )
                      if (allErrors.length) {
                        event.preventDefault()
                        showErrors(allErrors)
                      } else setOpened(true)
                    }}
                  >
                    <MessageCircle size={18} /> Abrir solicitação no WhatsApp
                  </ActionButton>
                )}
              </FormActions>
            </form>
          </FormArea>
          <Summary aria-label="Estimativa da reserva">
            <img
              src="/images/garden-dog-900.jpg"
              alt="Cão no jardim do Auzen"
            />
            <details open={window.matchMedia('(min-width: 901px)').matches}>
              <summary>
                <Heading>Seu resumo</Heading>
                <span className="compact-total">
                  {quote.units ? money(quote.total) : 'Ver estimativa'}
                </span>
                <ChevronDown size={18} />
              </summary>
              <dl>
                <div>
                  <dt>Serviço</dt>
                  <dd>{booking.service === 'hotel' ? 'Hotel' : 'Creche'}</dd>
                </div>
                <div>
                  <dt>Período</dt>
                  <dd>
                    {booking.startDate
                      ? displayDate(booking.startDate)
                      : 'Escolha as datas'}
                    {booking.endDate
                      ? ` — ${displayDate(booking.endDate)}`
                      : ''}
                  </dd>
                </div>
                <div>
                  <dt>Diárias × cães</dt>
                  <dd>
                    {quote.units || '—'} × {booking.pets.length}
                  </dd>
                </div>
                <div>
                  <dt>Por diária / cão</dt>
                  <dd>{money(quote.rate)}</dd>
                </div>
                <div>
                  <dt>Subtotal</dt>
                  <dd>{money(quote.subtotal)}</dd>
                </div>
                {quote.discount > 0 && (
                  <div>
                    <dt>MAISDIAS · 10%</dt>
                    <dd>− {money(quote.discount)}</dd>
                  </div>
                )}
                <div className="total">
                  <dt>Total estimado</dt>
                  <dd aria-live="polite">
                    {quote.units ? money(quote.total) : '—'}
                  </dd>
                </div>
              </dl>
              <Note>
                {booking.transport !== 'Não preciso'
                  ? '+ Transporte: valor a combinar. '
                  : ''}
                Tabela provisória. Valor final e disponibilidade confirmados
                pela equipe. Sem pagamento pelo site.
              </Note>
            </details>
          </Summary>
        </Workspace>
      </Container>
      <Section style={{ paddingBlock: '2.5rem' }} />
    </PageShell>
  )
}
