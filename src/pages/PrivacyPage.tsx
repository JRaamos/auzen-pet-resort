import { ButtonLink } from '../components/Button'
import { Container } from '../components/Container'
import { openConsentPreferences } from '../utils/analytics'
import { PageIntro } from '../components/PageLayout'
import { contactConfig, createWhatsAppUrl } from '../config/contact'
import { Heading, Lead, PageShell, Section } from '../styles/pages'

export function PrivacyPage() {
  return <PageShell><PageIntro eyebrow="Privacidade" title="Seus dados, com clareza."><Lead>Entenda o que acontece ao visitar o site ou solicitar uma reserva. Atualizado em 12 de outubro de 2026.</Lead></PageIntro>
    <Section style={{ paddingTop: 0 }}><Container style={{ maxWidth: '52rem' }}>
      <Heading as="h2">Solicitações e atendimento</Heading>
      <p>O Auzen Pet Resort recebe informações para responder consultas e organizar estadias. O formulário pede dados do tutor, contato de emergência, período e rotina do cão. Compartilhe apenas o necessário e tenha autorização para informar o contato de outra pessoa.</p>
      <p>Enquanto você preenche, os dados ficam na memória da página. O site não mantém um cadastro de reservas nem armazena esses campos no navegador. Fechar ou recarregar a página descarta o preenchimento.</p>
      <p>Ao abrir a solicitação, o WhatsApp recebe um link com a mensagem preparada. Você revisa e decide se envia. O WhatsApp/Meta tem sua própria política de privacidade. A equipe usa a conversa para atender sua solicitação e combinar a reserva. Evite incluir documentos, dados bancários ou informações de saúde de pessoas.</p>
      <Heading as="h2">Visitas, cookies e preferências</Heading>
      <p>A hospedagem na Vercel pode tratar registros técnicos de acesso, como endereço IP, para entregar e proteger o site. A preferência de cookies é guardada no navegador por até 180 dias; isso não contém os dados da reserva.</p>
      <p>Quando configurada, a análise pelo Google Analytics só é carregada após sua aceitação. Podemos medir páginas visitadas, serviço de interesse, origem de campanha e cliques de contato. Não enviamos o texto das mensagens, nomes, telefones, e-mails nem campos do formulário à análise.</p>
      <p>Após sua aceitação, identificadores de campanha podem ser mantidos durante a sessão. Não habilitamos publicidade personalizada nem remarketing. Um clique no WhatsApp não significa mensagem enviada ou reserva confirmada.</p>
      <p>Você pode recusar os opcionais ou mudar sua escolha a qualquer momento. A revogação remove os cookies de análise acessíveis ao site e recarrega a página para interromper a medição. Se estiver preenchendo uma reserva, finalize ou guarde suas informações antes de mudar a preferência.</p>
      <button type="button" onClick={openConsentPreferences} style={{ padding: '1rem', cursor: 'pointer' }}>Revisar preferências de cookies</button>
      <Heading as="h2" style={{ marginTop: '3rem' }}>Contato sobre seus dados</Heading>
      <p>Para solicitar informações, correção ou exclusão dos dados tratados no atendimento, fale com o Auzen pelo WhatsApp {contactConfig.whatsapp.display}. A equipe avaliará a solicitação e eventuais obrigações de conservação.</p>
      <ButtonLink href={createWhatsAppUrl('general')} target="_blank" rel="noreferrer">Falar com o Auzen</ButtonLink>
      <p>Os serviços Google, Meta e Vercel podem processar informações fora do Brasil. Consulte suas políticas: <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google</a>, <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noreferrer">WhatsApp</a> e <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer">Vercel</a>.</p>
    </Container></Section></PageShell>
}
