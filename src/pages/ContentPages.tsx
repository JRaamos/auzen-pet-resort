import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Heart,
  Leaf,
  MapPin,
  Moon,
  PawPrint,
  ShieldCheck,
  Sun,
  Truck,
  Users,
} from 'lucide-react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ButtonLink } from '../components/Button'
import { Container } from '../components/Container'
import { PageIntro, ReserveCallout } from '../components/PageLayout'
import {
  Actions,
  DisplayTitle,
  Eyebrow,
  Heading,
  Lead,
  Note,
  PageShell,
  Photo,
  RuleList,
  Section,
  Split,
} from '../styles/pages'
import { Reveal } from '../components/Reveal'
import { InstagramIcon, WhatsAppIcon } from '../components/SocialIcons'
import { bookingConfig, preparationItems } from '../config/booking'
import { contactConfig, createWhatsAppUrl } from '../config/contact'
import { Faq } from '../sections/Faq'
import { Gallery } from '../sections/Gallery'
import { Space } from '../sections/Space'
import { money } from '../utils/booking'

const Portrait = styled.figure`
  margin: 0;
  > div {
    position: relative;
    aspect-ratio: 4/5;
    overflow: hidden;
    border-radius: 0 3rem 0 0;
    background: ${({ theme }) => theme.colors.sand};
  }
  img {
    position: absolute;
    width: 300%;
    max-width: none;
    left: -167%;
    top: -42%;
  }
  figcaption {
    font-size: 0.78rem;
    margin-top: 1rem;
    color: ${({ theme }) => theme.colors.brown};
  }
`
const StoryQuote = styled(Section)`
  background: ${({ theme }) => theme.colors.forest};
  color: ${({ theme }) => theme.colors.warmWhite};
  blockquote {
    max-width: 24ch;
    font: 450 clamp(2rem, 4.6vw, 4.4rem)/1.08
      ${({ theme }) => theme.typography.display};
    letter-spacing: -0.03em;
    margin: 0 auto;
    text-align: center;
  }
  p {
    text-align: center;
    margin: 2rem 0 0;
    color: ${({ theme }) => theme.colors.sand};
  }
`
export function AboutPage() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="Nossa história"
        title="Um nome. Uma família. Um legado."
      >
        <Lead>
          O Auzen nasce do amor de Auzencio pela família, pela simplicidade e
          pelos animais.
        </Lead>
      </PageIntro>
      <Section style={{ paddingTop: 0 }}>
        <Container>
          <Split>
            <Reveal>
              <Portrait>
                <div>
                  <img
                    src="/images/family-story.jpeg"
                    alt="Auzencio, patriarca da família, acompanhado por seu cão Richard"
                  />
                </div>
                <figcaption>
                  Auzencio e Richard, em uma lembrança da família.
                </figcaption>
              </Portrait>
            </Reveal>
            <Reveal delay={0.12}>
              <Eyebrow>Quem somos nós</Eyebrow>
              <Heading>O carinho vem de casa.</Heading>
              <Lead>
                Somos a história de um homem extraordinário, nosso patriarca
                Auzencio, que sempre viveu com simplicidade, amor e coragem.
              </Lead>
              <p>
                Nascido em agosto de 1925, faleceu em agosto de 2024. Pai de 12
                filhos e filhas, construiu uma família grande e uma vida marcada
                pelo trabalho e pela generosidade.
              </p>
              <p>
                Trabalhou na agricultura rural e, com muitos sacrifícios, veio
                para a cidade grande em busca de melhores condições de vida. Era
                simples, amável, sensível e sincero, apaixonado por animais —
                principalmente cães e aves.
              </p>
              <p>
                Ao longo da vida, teve vários cachorros. Richard, seu último
                companheiro, partiu pouco antes dele.
              </p>
            </Reveal>
          </Split>
        </Container>
      </Section>
      <StoryQuote>
        <Container>
          <blockquote>
            “Aqui, cada pet é recebido com o mesmo carinho que ele sempre
            dedicou aos seus.”
          </blockquote>
          <p>O legado de Auzencio vive em cada cuidado.</p>
        </Container>
      </StoryQuote>
      <Section>
        <Container>
          <Split>
            <div>
              <Eyebrow>Por que existimos</Eyebrow>
              <Heading>Honrar a história. Cuidar do presente.</Heading>
              <Lead>
                Existimos para honrar o legado de nosso patriarca, que
                acreditava no valor da família, do trabalho, da simplicidade e
                do amor pelos animais.
              </Lead>
              <RuleList>
                <article>
                  <Heart />
                  <div>
                    <h3>Cuidado próximo</h3>
                    <p>Respeito ao jeito e à rotina de cada cão.</p>
                  </div>
                </article>
                <article>
                  <Users />
                  <div>
                    <h3>Espírito de família</h3>
                    <p>
                      Uma relação aberta e acolhedora com quem confia seu
                      companheiro a nós.
                    </p>
                  </div>
                </article>
                <article>
                  <Leaf />
                  <div>
                    <h3>Natureza por perto</h3>
                    <p>
                      Gramado, jardim e espaço para aproveitar o lado de fora.
                    </p>
                  </div>
                </article>
              </RuleList>
            </div>
            <Photo>
              <img
                src="/images/human-care-900.jpg"
                alt="Carinho e companhia com os cães no jardim real do Auzen"
                loading="lazy"
              />
              <figcaption>
                Uma segunda casa, com o jeito Auzen de acolher.
              </figcaption>
            </Photo>
          </Split>
        </Container>
      </Section>
      <ReserveCallout />
    </PageShell>
  )
}

const PricingRow = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 6vw, 5rem);
  padding: 3rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.line};
  align-items: center;
  img {
    width: 100%;
    height: 28rem;
    object-fit: cover;
    border-radius: 0 2.5rem 0 0;
  }
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    img {
      height: 20rem;
    }
  }
`
const Price = styled.p`
  font-family: ${({ theme }) => theme.typography.display};
  font-size: 3.5rem;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.forest};
  letter-spacing: -0.04em;
  margin: 1.5rem 0 0.6rem;
  small {
    font-family: ${({ theme }) => theme.typography.body};
    font-size: 0.8rem;
    letter-spacing: 0;
  }
`
const Schedule = styled.p`
  display: flex;
  gap: 0.65rem;
  align-items: flex-start;
  font-size: 0.88rem;
  svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.terracotta};
  }
`
export function ServicesPage() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="Serviços & valores"
        title="O dia deles. A sua tranquilidade."
      >
        <Lead>
          Para uma viagem, um compromisso ou um dia cheio de brincadeiras.
          Escolha como seu cão vai viver o Auzen.
        </Lead>
        <Note>
          Valores iniciais para estimativa, sujeitos à confirmação da equipe.
          Diárias por cão; transporte combinado à parte.
        </Note>
      </PageIntro>
      <Section style={{ paddingTop: 0 }}>
        <Container>
          <PricingRow id="hotel">
            <img
              src="/images/hotel-rest-900.jpg"
              alt="Cão descansando no espaço do Auzen"
              loading="lazy"
            />
            <div>
              <Eyebrow>
                <Moon size={16} /> Hotel para cães
              </Eyebrow>
              <Heading>Uma estadia com clima de casa.</Heading>
              <Lead>
                Acolhimento durante viagens e períodos de ausência, com espaço
                ao ar livre e atenção à rotina do seu cão.
              </Lead>
              <Price>
                {money(bookingConfig.rates.hotel)}{' '}
                <small>/ diária por cão</small>
              </Price>
              <Schedule>
                <Clock3 size={18} /> Check-in das 07h às 17h · Check-out até 09h
                do dia seguinte.
              </Schedule>
              <Note>
                Uma diária corresponde a uma noite. A alimentação habitual deve
                ser trazida pelo tutor.
              </Note>
              <ButtonLink href="/reservar?servico=hotel">
                Planejar hospedagem <ArrowRight size={17} />
              </ButtonLink>
            </div>
          </PricingRow>
          <PricingRow id="creche">
            <img
              src="/images/daycare-play-900.jpg"
              alt="Dois cães explorando o gramado"
              loading="lazy"
            />
            <div>
              <Eyebrow>
                <Sun size={16} /> Creche · Day Care
              </Eyebrow>
              <Heading>Mais quintal no dia a dia.</Heading>
              <Lead>
                Socialização, exploração e brincadeiras durante o dia, com tempo
                para descansar entre uma descoberta e outra.
              </Lead>
              <Price>
                {money(bookingConfig.rates.daycare)}{' '}
                <small>/ dia por cão</small>
              </Price>
              <Schedule>
                <Clock3 size={18} /> Funcionamento das 07h às 17h.
              </Schedule>
              <Note>
                Cada data incluída no período conta como um dia de creche.
                Combine a adaptação e a convivência com a equipe.
              </Note>
              <ButtonLink href="/reservar?servico=daycare">
                Planejar dia de creche <ArrowRight size={17} />
              </ButtonLink>
            </div>
          </PricingRow>
          <PricingRow id="transporte">
            <div>
              <Eyebrow>
                <Truck size={16} /> Transporte Pet
              </Eyebrow>
              <Heading>Do seu endereço ao Auzen.</Heading>
              <Lead>
                Consulte o serviço de transporte para buscar e levar seu cão com
                mais comodidade.
              </Lead>
              <Schedule>
                <MapPin size={18} /> Rota, valor e disponibilidade combinados
                pelo WhatsApp.
              </Schedule>
              <ButtonLink href="/reservar">
                Incluir transporte na solicitação <ArrowRight size={17} />
              </ButtonLink>
            </div>
            <RuleList>
              <article>
                <PawPrint />
                <div>
                  <h3>Conte o que seu cão precisa</h3>
                  <p>
                    Saúde, alimentação, comportamento e cuidados especiais fazem
                    parte da solicitação.
                  </p>
                </div>
              </article>
              <article>
                <CalendarDays />
                <div>
                  <h3>Antecipe sua reserva</h3>
                  <p>
                    Especialmente em finais de semana e feriados prolongados.
                  </p>
                </div>
              </article>
              <article>
                <ShieldCheck />
                <div>
                  <h3>Prepare a chegada</h3>
                  <p>
                    Confira vacinação, proteção contra parasitas e alimentação
                    habitual.
                  </p>
                  <Link to="/informacoes">
                    Ver orientações antes da estadia →
                  </Link>
                </div>
              </article>
            </RuleList>
          </PricingRow>
        </Container>
      </Section>
      <ReserveCallout />
    </PageShell>
  )
}

const Campaign = styled.section`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.warmWhite};
  background: ${({ theme }) => theme.colors.forest};
  min-height: 36rem;
  display: flex;
  align-items: center;
  > img {
    position: absolute;
    z-index: -2;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 65% 50%;
  }
  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(14, 42, 31, 0.97),
      rgba(14, 42, 31, 0.75) 40%,
      rgba(14, 42, 31, 0.08)
    );
  }
  > div {
    padding-block: 4rem;
  }
  h1 {
    color: inherit;
    max-width: 10ch;
  }
  p {
    color: ${({ theme }) => theme.colors.sand};
    max-width: 25rem;
  }
  @media (max-width: 650px) {
    min-height: 44rem;
    align-items: flex-end;
    > img {
      object-position: 70% 0;
    }
    &::after {
      background: linear-gradient(
        0deg,
        #183e32 8%,
        rgba(24, 62, 50, 0.93) 38%,
        rgba(24, 62, 50, 0.08) 82%
      );
    }
    > div {
      padding-bottom: 3rem;
    }
    h1 {
      font-size: 3.4rem;
    }
  }
`
const Promotion = styled(Section)`
  background: ${({ theme }) => theme.colors.sand};
`
export function PromotionsPage() {
  return (
    <PageShell>
      <Campaign>
        <img
          src="/images/campaign-garden.jpg"
          alt="Cena ilustrativa de dois cães brincando em um jardim florido"
          fetchPriority="high"
        />
        <Container>
          <Eyebrow>Mais dias. Mais momentos.</Eyebrow>
          <DisplayTitle>Deixe a diversão com a gente.</DisplayTitle>
          <Lead>
            Vai viajar ou quer um dia diferente para seu cão? Um lugar de
            carinho espera por ele em Lauro de Freitas.
          </Lead>
          <ButtonLink href="/reservar?cupom=MAISDIAS">
            Simular minha reserva <ArrowUpRight size={18} />
          </ButtonLink>
          <Note>Imagem ilustrativa de campanha.</Note>
        </Container>
      </Campaign>
      <Promotion>
        <Container>
          <Split>
            <div>
              <Eyebrow>Condição inicial · MAISDIAS</Eyebrow>
              <Heading>
                Fique mais.
                <br />
                Aproveite 10% a menos.
              </Heading>
              <Lead>
                Use o código MAISDIAS em reservas de 5 diárias ou mais de hotel
                ou creche. O desconto aparece na sua estimativa.
              </Lead>
              <Actions>
                <ButtonLink href="/reservar?cupom=MAISDIAS">
                  Aplicar MAISDIAS <ArrowRight size={17} />
                </ButtonLink>
                <ButtonLink href="/servicos" variant="text">
                  Ver valores
                </ButtonLink>
              </Actions>
            </div>
            <div>
              <Price>
                10% <small>sobre as diárias</small>
              </Price>
              <RuleList>
                <article>
                  <Moon />
                  <div>
                    <h3>5 noites de hotel</h3>
                    <p>
                      De {money(500)} por {money(450)}, para um cão.
                    </p>
                  </div>
                </article>
                <article>
                  <Sun />
                  <div>
                    <h3>5 dias de creche</h3>
                    <p>
                      De {money(325)} por {money(292.5)}, para um cão.
                    </p>
                  </div>
                </article>
              </RuleList>
              <Note>
                Condição e tabela provisórias, sujeitas à confirmação pelo
                Auzen. Não cumulativo; não inclui transporte. Sem cobrança pelo
                site.
              </Note>
            </div>
          </Split>
        </Container>
      </Promotion>
      <Section>
        <Container>
          <Split>
            <Photo>
              <img
                src="/images/garden-dog-900.jpg"
                alt="Cão no jardim real do Auzen"
                loading="lazy"
              />
            </Photo>
            <div>
              <Eyebrow>Finais de semana & feriados</Eyebrow>
              <Heading>Sua viagem começa com um bom planejamento.</Heading>
              <Lead>
                Consulte com antecedência as datas desejadas e conte à equipe
                sobre seu cão. A confirmação acontece em uma conversa pelo
                WhatsApp.
              </Lead>
              <ButtonLink href="/reservar">
                Escolher minhas datas <CalendarDays size={18} />
              </ButtonLink>
            </div>
          </Split>
        </Container>
      </Section>
    </PageShell>
  )
}

export function SpacePage() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="Nosso espaço"
        title="Natureza para viver, não só para ver."
      >
        <Lead>
          Conheça o jardim e os momentos reais no Auzen, em Lauro de Freitas.
        </Lead>
      </PageIntro>
      <Space />
      <Gallery />
      <ReserveCallout />
    </PageShell>
  )
}

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Rua da Jurema, Quingoma de Fora, Lauro de Freitas, Bahia')}`
const ContactDetails = styled(RuleList)`
  > article {
    grid-template-columns: 3.25rem minmax(0, 1fr);
    gap: 1.1rem;
    padding: 1.75rem 0;
    &:first-child {
      padding-top: 0;
    }
    &:last-child {
      border-bottom: 0;
    }
    h3 {
      color: ${({ theme }) => theme.colors.forest};
      font-size: 1.1rem;
      margin-bottom: 0.55rem;
    }
    p + p {
      margin-top: 0.6rem;
    }
    a {
      margin-top: 0.75rem;
      min-height: 2.75rem;
      text-align: left;
      justify-content: flex-start;
    }
    .contact-person {
      font-size: 0.8rem;
      margin-bottom: 0.65rem;
    }
    .contact-phone {
      display: inline-block;
      margin: 0;
      min-height: 0;
      font-size: 1.05rem;
      font-weight: 650;
      color: ${({ theme }) => theme.colors.forest};
    }
  }
  @media (max-width: 520px) {
    > article {
      grid-template-columns: 2.75rem minmax(0, 1fr);
      gap: 0.8rem;
    }
  }
`
const ContactIcon = styled.span`
  display: grid;
  place-items: center;
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.sand};
  color: ${({ theme }) => theme.colors.forest};
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  @media (max-width: 520px) {
    width: 2.75rem;
    height: 2.75rem;
    svg {
      width: 1.3rem;
      height: 1.3rem;
    }
  }
`
const ContactHours = styled.dl`
  margin: 0.5rem 0 0.75rem;
  font-size: 0.88rem;
  > div {
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.25rem 0;
  }
  dt {
    color: ${({ theme }) => theme.colors.brown};
  }
  dd {
    margin: 0;
    font-weight: 650;
    color: ${({ theme }) => theme.colors.forest};
    white-space: nowrap;
  }
  @media (max-width: 380px) {
    > div {
      flex-direction: column;
      gap: 0;
    }
  }
`
export function ContactPage() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="Contato & localização"
        title="A conversa começa com um oi."
      >
        <Lead>
          Dúvidas, uma visita ao espaço ou os detalhes da estadia: fale com a
          equipe Auzen.
        </Lead>
      </PageIntro>
      <Section style={{ paddingTop: 0 }}>
        <Container>
          <Split>
            <div>
              <ContactDetails id="contato" aria-label="Canais de contato e informações">
                <article>
                  <ContactIcon>
                    <WhatsAppIcon />
                  </ContactIcon>
                  <div>
                    <h3>Fale pelo WhatsApp</h3>
                    <p className="contact-person">
                      {contactConfig.whatsapp.role} - {contactConfig.whatsapp.name}
                    </p>
                    <p>
                      <a
                        className="contact-phone"
                        href={`tel:+${contactConfig.whatsapp.digits}`}
                      >
                        {contactConfig.whatsapp.display}
                      </a>
                    </p>
                    <ButtonLink
                      href={createWhatsAppUrl()}
                      target="_blank"
                      rel="noreferrer"
                      variant="text"
                    >
                      Conversar com a {contactConfig.whatsapp.name}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </ButtonLink>
                  </div>
                </article>
                <article>
                  <ContactIcon>
                    <InstagramIcon />
                  </ContactIcon>
                  <div>
                    <h3>Nosso Instagram</h3>
                    <ButtonLink
                      href={contactConfig.instagram!}
                      target="_blank"
                      rel="noreferrer"
                      variant="text"
                    >
                      @auzenpetresort
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </ButtonLink>
                  </div>
                </article>
                <article>
                  <ContactIcon>
                    <MapPin strokeWidth={1.7} aria-hidden="true" />
                  </ContactIcon>
                  <div>
                    <h3>Como chegar</h3>
                    <p>{contactConfig.address}</p>
                    <p>Próximo ao Terraço Mineira e à Capela São José.</p>
                    <Note>
                      Combine a visita e confirme o ponto exato com a equipe
                      antes de sair.
                    </Note>
                    <ButtonLink
                      href={mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      variant="text"
                    >
                      Abrir a região no mapa
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </ButtonLink>
                  </div>
                </article>
                <article>
                  <ContactIcon>
                    <Clock3 strokeWidth={1.7} aria-hidden="true" />
                  </ContactIcon>
                  <div>
                    <h3>Horários</h3>
                    <ContactHours>
                      <div>
                        <dt>Creche</dt><dd>07h às 17h</dd>
                      </div>
                      <div>
                        <dt>Hotel · check-in</dt><dd>07h às 17h</dd>
                      </div>
                      <div>
                        <dt>Hotel · check-out</dt><dd>Até 09h</dd>
                      </div>
                    </ContactHours>
                    <Note>
                      Transporte e visitas: mediante combinação com a equipe.
                    </Note>
                  </div>
                </article>
              </ContactDetails>
            </div>
            <Photo>
              <img
                src="/images/garden-detail-900.jpg"
                alt="O jardim florido do Auzen em Lauro de Freitas"
                loading="lazy"
              />
              <figcaption>
                Antes de visitar, combine sua chegada pelo WhatsApp.
              </figcaption>
            </Photo>
          </Split>
        </Container>
      </Section>
      <ReserveCallout />
    </PageShell>
  )
}

export function InformationPage() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="Antes da estadia"
        title="Tudo pronto para um dia feliz."
      >
        <Lead>
          Alguns cuidados ajudam seu cão a chegar mais tranquilo. Conte à equipe
          o que faz parte da rotina dele.
        </Lead>
      </PageIntro>
      <Section style={{ paddingTop: 0 }}>
        <Container>
          <Split>
            <div>
              <RuleList>
                {preparationItems.map((item, index) => (
                  <article key={item.title}>
                    <span>0{index + 1}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  </article>
                ))}
              </RuleList>
            </div>
            <Photo>
              <img
                src="/images/hotel-rest-900.jpg"
                alt="Cão descansando no Auzen"
                loading="lazy"
              />
            </Photo>
          </Split>
        </Container>
      </Section>
      <Faq />
      <ReserveCallout />
    </PageShell>
  )
}

export function NotFoundPage() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="404 · Caminho não encontrado"
        title="Vamos voltar ao jardim?"
      >
        <Lead>
          Essa página não existe. Você pode conhecer o Auzen ou planejar a
          próxima estadia.
        </Lead>
        <Actions>
          <ButtonLink href="/">Voltar ao início</ButtonLink>
          <ButtonLink href="/reservar" variant="text">
            Fazer reserva
          </ButtonLink>
        </Actions>
      </PageIntro>
    </PageShell>
  )
}
