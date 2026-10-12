# Medição, consentimento e conversões

Status: **CONFIGURADO, PUBLICADO E RECEBIMENTO CONFIRMADO NO DEBUGVIEW**. Fluxo real e integração de produção concluídos. Além do HTTP 204, o painel do Google exibiu os eventos consentidos do site.

## Estado das contas em 12/10/2026

Na sessão Google autorizada, as propriedades existentes eram de outros projetos; nenhuma foi reutilizada. O cadastro próprio do Auzen foi concluído com Brasil, fuso Bahia, BRL, setor Animais de estimação e animais, compartilhamentos opcionais desligados e faixa de 1 a 10 funcionários (9 confirmados pelo proprietário). Objetivos: gerar leads e entender o tráfego.

Conta **Auzen Pet Resort**, propriedade **Auzen Pet Resort - Site** (`558547876`). Fluxo Web: **Auzen Pet Resort - Site**, URL `https://auzenpetresort.com.br`, ID público de medição **`G-Y0Z1M3Z4RX`**. A métrica otimizada foi desativada na criação, evitando eventos automáticos de formulários, links de saída e histórico. Integração direta por `VITE_GA4_ID` de produção na Vercel, sem depender do contêiner GTM pendente.

Deploy `e6f5c94` confirmado READY e testado no domínio oficial em 12/10/2026. Em sessões isoladas de QA, nenhum pedido ao Google antes do consentimento; após aceitar, `page_view`, `view_hotel`, `view_daycare` e `whatsapp_click` foram enviados ao ID correto, com respostas HTTP 204. Três rotas produziram três pageviews; o clique não abriu/enviou mensagem WhatsApp. Revogar consentimento descarregou o script. Nenhum formulário foi preenchido nessas sessões de medição.

Na consulta inicial, Tempo real/DebugView ainda não mostravam os eventos. A confirmação chegou no **DebugView às 07h27 (Bahia)**: sete eventos da sessão de 07h23, sendo dois `page_view`, dois `cta_click`, um `view_hotel`, um `view_daycare` e um `whatsapp_click`. A primeira página não estava em debug. A tela também mostrou `non_personalized_ads = 1`. Evidência local: `qa/ga4-debugview-confirmed.png`. Debug foi limitado ao navegador de QA; não está ligado globalmente na produção. Cliques de teste não são leads comerciais.

O Tag Manager abriu autenticado sem contas/contêineres. Formulário preparado para Auzen Pet Resort, país Brasil e contêiner Web `auzenpetresort.com.br`, sem compartilhamento anônimo. A criação chegou ao contrato e aceite dos termos de tratamento de dados. Não foi aceito em nome do responsável. Portanto, não há contêiner publicado nem Preview validado. Após consentimento do proprietário e conclusão do GA4, concluir a configuração e testar recebimento real antes de habilitar anúncios.

## Contrato implementado

| Evento | Significado |
|---|---|
| `page_view` | Uma visualização por mudança de rota, inclusive SPA |
| `view_hotel` / `view_daycare` | Visita à página específica |
| `whatsapp_click` | Clique válido para abrir WhatsApp, não mensagem enviada |
| `phone_click` / `email_click` | Clique em link tel/mailto, se existir |
| `location_click` | Clique no link de localização |
| `reservation_start` | Clique para iniciar solicitação |
| `cta_click` | Outros CTAs de serviço/Instagram |
| `gallery_open` / `video_toggle` | Interações já existentes no site |

Parâmetros: `page_path`, `page_location`, `button_location`, `service` (`hotel`, `daycare`, `general`) e UTMs permitidas. Nunca enviar formulário, nome, telefone, e-mail, mensagem WhatsApp ou URL `wa.me` aos sistemas analíticos. URLs desconhecidas são normalizadas para `/404`; parâmetros arbitrários são descartados. `gclid` é preservado somente se compatível com formato limitado, dentro da URL de atribuição, após consentimento.

## Configuração e prevenção de duplicação

IDs públicos opcionais: `VITE_GA4_ID` e `VITE_GTM_ID`. Se ambos forem válidos, somente GTM carrega. Não configurar IDs fictícios em produção. Sem ID válido, nenhum script Google de medição é carregado e não aparece um banner pedindo consentimento para uma ferramenta inexistente.

GA4 direto usa `send_page_view: false`; o app envia as visualizações. Na propriedade, desativar medição automática de alterações de histórico e de formulários/links de saída, para não duplicar eventos nem capturar URLs de WhatsApp com dados. Google Signals e personalização de anúncios ficam desativados no código.

Se optar por GTM, configurar uma Google tag para a propriedade correta, com pageview automático desativado. Criar acionador de evento personalizado para os nomes da tabela e mapear somente as variáveis documentadas; não criar acionadores genéricos de cliques/formulários. Verificar consentimento obrigatório de analytics em cada tag. Não publicar tags de anúncios nesta missão.

Após confirmação no DebugView, **`whatsapp_click` foi marcado como evento principal** no GA4, com contagem uma vez por evento e **sem valor monetário padrão**. Usada a opção “Criar com código”, aproveitando o evento já emitido pelo site, sem regra derivada de pageview que duplicaria cliques. A lista de eventos principais confirmou a configuração (`qa/ga4-keyevent.png`). No Google Ads, importar uma única origem dessa ação, se adequado, evitando tag Ads + importação GA4 duplicadas. Não chamar esse evento de reserva/venda. Ads não foi vinculado nem ativado nesta etapa.

## Consentimento

Consentimento básico: antes da escolha positiva não há script Google nem armazenamento de atribuição. Aceitar e recusar têm destaque equivalente. Preferência local expira em 180 dias. UTMs podem permanecer em memória para não perder a origem durante navegação anterior à escolha; só são gravadas na sessão após aceitação.

`analytics_storage` só é concedido por escolha do usuário. `ad_storage`, `ad_user_data` e `ad_personalization` permanecem negados. Revogação pelo rodapé limpa cookies analíticos acessíveis e recarrega a página para remover scripts/listeners do fornecedor. A página de privacidade avisa que dados de formulário ainda não enviados podem ser perdidos nessa recarga.

Não houve implantação de banco de leads, API de WhatsApp ou pagamento. O formulário existente guarda dados na memória da página e prepara mensagem externa revisada pelo usuário.

Isso é uma implementação técnica, não parecer nem garantia de conformidade jurídica. Revisar a política quando novos fornecedores ou finalidades forem adicionados.

## Evidência e relatórios

`pnpm exec playwright test --config playwright.marketing.config.ts`: nove testes em desktop, mobile de 320 px e tablet, com requisições dos fornecedores interceptadas. Eles verificam ausência de chamadas antes da autorização, recusa persistente, um pageview e clique, prioridade GTM, SPA, atribuição e revogação. IDs fictícios ficam exclusivamente nos servidores dos testes, não no deploy.

Recebimento dos eventos reais confirmado no DebugView, além do HTTP 204. GTM Preview não se aplica à instalação direta usada; o contêiner continua pendente. Antes da ativação de anúncios, validar também atribuição por UTM e eventual importação de conversão, sem duplicidade. Não classificar cliques de QA como leads comerciais.

[Painel local gratuito](results-dashboard.html) e [modelo agregado](results-template.json) preparados. Abra o HTML no navegador e importe o JSON preenchido com resultados reais do mesmo período. O arquivo fica local, não é enviado nem persistido. Dados ausentes aparecem como indisponíveis; nenhuma métrica comercial foi inventada. Cliques, conversas, leads qualificados e reservas são medidas distintas. Para reservas futuras, usar inicialmente controle comercial agregado, sem introduzir dados pessoais no GA4.

Referências: [GA4 para SPA](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications), [visualizações manuais](https://developers.google.com/analytics/devguides/collection/ga4/views), [consentimento Google](https://developers.google.com/tag-platform/security/guides/consent), [orientações da ANPD sobre cookies](https://www.gov.br/anpd/pt-br/assuntos/noticias/anpd-emite-recomendacoes-para-adequacao-da-pratica-de-coleta-de-cookies-do-portal-gov.br).
