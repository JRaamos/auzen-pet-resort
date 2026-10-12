# Evidências de qualidade e publicação

Data: 12/10/2026. Status técnico: **CONCLUÍDO**. Integrações de terceiros: **PARCIAL**, conforme relatórios específicos.

## Versão testada

- `d8231af`: SEO local, páginas, privacidade, consentimento, metatag Search Console, pré-renderização e testes.
- `5096d7c0331c75d7102bb40efeebed5fb40fcbfe`: correção de contraste e hero imediatamente visível.
- Push de ambos em `origin/main`, com identidade Git solicitada. Vercel confirmou deploy `dpl_CfsxE14o3sGo2LcEE4PNzoGDcJZk` **READY** para `5096d7c`.
- Domínio de produção usado nos testes: `https://auzenpetresort.com.br`.
- Variável pública `VITE_SITE_URL` de produção corrigida para esse domínio. Nenhum segredo ou arquivo `.env` foi commitado.
- Continuação GA4: `e6f5c94`, deploy `dpl_8prEPYSGX5byyoawQmUmWxZRsFm7` READY, com `VITE_GA4_ID=G-Y0Z1M3Z4RX` em produção. `VITE_GTM_ID` permanece ausente.

## Validação adicional do Analytics — 12/10/2026

- 9/9 testes isolados de consentimento/eventos passaram novamente.
- Teste real em produção: sem Google antes de consentir, ID correto, três pageviews para três rotas, eventos de Hotel/Creche e um clique WhatsApp por sessão, HTTP 204 do endpoint Google e script removido após revogação. Nenhuma mensagem enviada ou informação de formulário usada. Sessões de QA não representam leads.
- Após a consulta inicial sem dados, o **DebugView confirmou às 07h27 (Bahia)** sete eventos da sessão consentida de 07h23: dois pageviews, dois CTAs, Hotel, Creche e WhatsApp. Evidência local `qa/ga4-debugview-confirmed.png`. A primeira visualização não estava em debug; o site enviou três visualizações para três rotas. A confirmação no painel é distinta do HTTP 204 e foi observada, não inferida.
- `whatsapp_click` salvo como evento principal, sem valor monetário padrão, uma vez por evento e usando o código já instalado. Confirmado na lista de eventos principais (`qa/ga4-keyevent.png`). Nenhuma integração ou ativação de anúncios nesta etapa.
- A primeira execução E2E com a nova configuração passou 15/18: três fluxos móveis encontraram o banner de consentimento sobre os controles. Os testes funcionais agora recusam cookies pela interface, mantendo a cobertura do consentimento na suíte específica. Nova execução em produção: **18/18 em 9,5 s**; lint passou. O site não foi alterado para esconder ou contornar o consentimento.

## Testes executados

| Verificação | Resultado |
|---|---|
| `pnpm lint` | Passou |
| `pnpm build` | Passou; onze rotas e 404 pré-renderizadas |
| `pnpm test` | 14/14 unitários da reserva |
| `pnpm test:e2e` local | 18/18 |
| `QA_BASE_URL=https://auzenpetresort.com.br pnpm test:e2e` | 18/18 na produção `5096d7c`, 11,6 s |
| `pnpm exec playwright test --config playwright.marketing.config.ts` | 9/9, fornecedores interceptados, IDs exclusivamente de teste |
| `node scripts/verify-marketing.mjs` | Campanha local inativa, teto/duração, RSA, sete peças e painel agregado passaram |

E2E: desktop 1440×1000, tablet 768×1024, mobile 320×568. Navegação/back, menu lateral, imagens, ausência de overflow, Hotel/Creche/Privacidade, contato Renata, reserva com dois cães, validações e mensagem WhatsApp completa. Nenhuma mensagem foi enviada ao negócio. Emulação Chromium não equivale a teste físico de WhatsApp em Android/iOS; a entrega final da mensagem depende da ação do visitante no aplicativo.

Medição: sem scripts ou armazenamento de atribuição antes de consentimento, recusa persistente, um pageview por rota e um clique, prioridade GTM, UTMs/GCLID limitados, exclusão de dados pessoais e revogação. **Não são testes de recebimento real no GA4/DebugView ou GTM Preview.**

## HTTP/SEO/HTTPS

- `/`, `/hotel`, `/creche`, `/privacidade`, `/reservar`, `/contato`: HTTP 200, título específico, um H1, HTML real sem depender de execução JS.
- Rota inexistente: HTTP 404 com página própria; não retorna home 200.
- `robots.txt`: 200, domínio correto, rastreamento permitido. Sitemap: 200, XML, onze URLs oficiais.
- `www.auzenpetresort.com.br/reservar?servico=hotel`: 308 para o domínio sem www preservando rota/query.
- Host antigo `auzen-pet-resort.vercel.app/hotel?utm_source=google`: 308 para domínio próprio preservando rota/query.
- TLS validado sem `--insecure`/ignorar certificado. Ambos os IPs A entregaram sitemap 200 com verificação TLS resultado 0. Nenhuma alteração de DNS nesta execução.

## Lighthouse móvel — produção

| Página | Desempenho | Acessibilidade | Boas práticas | SEO |
|---|---:|---:|---:|---:|
| Home | 96 | 96 | 100 | 100 |
| Hotel | 95 | 100 | 100 | 100 |

Home: LCP 2,2 s; FCP 2,1 s nesta amostra. Antes do ajuste do hero, desempenho 77/LCP 4,7 s. São testes de laboratório com variação por execução, não promessa de Core Web Vitals de todos os visitantes. A home mantém uma marca d'água decorativa de contraste baixo, excluída da leitura assistiva; não alegar acessibilidade integral a partir da pontuação. O build ainda avisa sobre chunk principal acima de 500 kB bruto; não é erro de build e permanece oportunidade futura de divisão de código.

Relatórios locais: `qa/lighthouse-home-mobile.json`, `qa/lighthouse-hotel-mobile.json`; screenshots E2E e das integrações em `qa/`. Peças exportadas em `docs/marketing/assets/`, mantidas no Git. Não publicar capturas de faturamento, perfis pessoais, cookies ou credenciais.

## Limites de homologação

Search Console confirmou propriedade e solicitações de indexação; a home já estava indexada. Sitemap ainda com falha de leitura no Google, apesar de testes HTTP/XML válidos. CEP e porte foram confirmados: Perfil da Empresa avançou até exigir o pin exato; GA4 foi criado/publicado, com transporte HTTP e recebimento no DebugView confirmados. GTM exige termos; Meta exige login; Ads exige confirmação de faturamento. Nenhuma cobrança foi executada por este trabalho; histórico financeiro global da conta não foi auditado.
