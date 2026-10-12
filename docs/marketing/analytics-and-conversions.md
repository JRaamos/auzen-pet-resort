# Medição, consentimento e conversões

Status: **PARCIAL**. Implementação e testes locais concluídos; recebimento real em GA4/DebugView e GTM Preview não se presume pelo código ou pela fila do navegador.

## Estado das contas em 12/10/2026

Na sessão Google autorizada, as propriedades existentes eram de outros projetos; nenhuma foi reutilizada. O assistente do Auzen foi preparado com nome próprio, Brasil, fuso Bahia, BRL, setor Animais de estimação e animais, e compartilhamentos opcionais desligados. A etapa exige faixa de funcionários, ausente do site e já solicitada ao proprietário. A conta/propriedade/fluxo Auzen ainda não foi concluída; não há ID real instalado nem coleta ativa em produção.

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

Marcar `whatsapp_click` como evento principal no GA4 apenas após validação. No Google Ads, importar uma única origem dessa ação, se adequado, evitando tag Ads + importação GA4 duplicadas. Não chamar esse evento de reserva/venda.

## Consentimento

Consentimento básico: antes da escolha positiva não há script Google nem armazenamento de atribuição. Aceitar e recusar têm destaque equivalente. Preferência local expira em 180 dias. UTMs podem permanecer em memória para não perder a origem durante navegação anterior à escolha; só são gravadas na sessão após aceitação.

`analytics_storage` só é concedido por escolha do usuário. `ad_storage`, `ad_user_data` e `ad_personalization` permanecem negados. Revogação pelo rodapé limpa cookies analíticos acessíveis e recarrega a página para remover scripts/listeners do fornecedor. A página de privacidade avisa que dados de formulário ainda não enviados podem ser perdidos nessa recarga.

Não houve implantação de banco de leads, API de WhatsApp ou pagamento. O formulário existente guarda dados na memória da página e prepara mensagem externa revisada pelo usuário.

Isso é uma implementação técnica, não parecer nem garantia de conformidade jurídica. Revisar a política quando novos fornecedores ou finalidades forem adicionados.

## Evidência e relatórios

`pnpm exec playwright test --config playwright.marketing.config.ts`: nove testes em desktop, mobile de 320 px e tablet, com requisições dos fornecedores interceptadas. Eles verificam ausência de chamadas antes da autorização, recusa persistente, um pageview e clique, prioridade GTM, SPA, atribuição e revogação. IDs fictícios ficam exclusivamente nos servidores dos testes, não no deploy.

DebugView/Preview e recebimento de eventos reais são uma etapa distinta e precisam ser registrados depois da configuração da conta. Antes da ativação de anúncios, executar uma visita de teste consentida com UTM e conferir `whatsapp_click` real (sem enviar mensagem ao negócio).

[Painel local gratuito](results-dashboard.html) e [modelo agregado](results-template.json) preparados. Abra o HTML no navegador e importe o JSON preenchido com resultados reais do mesmo período. O arquivo fica local, não é enviado nem persistido. Dados ausentes aparecem como indisponíveis; nenhuma métrica comercial foi inventada. Cliques, conversas, leads qualificados e reservas são medidas distintas. Para reservas futuras, usar inicialmente controle comercial agregado, sem introduzir dados pessoais no GA4.

Referências: [GA4 para SPA](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications), [visualizações manuais](https://developers.google.com/analytics/devguides/collection/ga4/views), [consentimento Google](https://developers.google.com/tag-platform/security/guides/consent), [orientações da ANPD sobre cookies](https://www.gov.br/anpd/pt-br/assuntos/noticias/anpd-emite-recomendacoes-para-adequacao-da-pratica-de-coleta-de-cookies-do-portal-gov.br).
