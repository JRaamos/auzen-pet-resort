# Evidências de qualidade e publicação

Data: 12/10/2026. Status técnico: **CONCLUÍDO**. Integrações de terceiros: **PARCIAL**, conforme relatórios específicos.

## Versão testada

- `d8231af`: SEO local, páginas, privacidade, consentimento, metatag Search Console, pré-renderização e testes.
- `5096d7c0331c75d7102bb40efeebed5fb40fcbfe`: correção de contraste e hero imediatamente visível.
- Push de ambos em `origin/main`, com identidade Git solicitada. Vercel confirmou deploy `dpl_CfsxE14o3sGo2LcEE4PNzoGDcJZk` **READY** para `5096d7c`.
- Domínio de produção usado nos testes: `https://auzenpetresort.com.br`.
- Variável pública `VITE_SITE_URL` de produção corrigida para esse domínio. Nenhum segredo ou arquivo `.env` foi commitado; IDs GA4/GTM continuam ausentes porque contas/fluxos não foram concluídos.

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

Search Console confirmou propriedade e solicitações de indexação; a home já estava indexada. Sitemap ainda com falha de leitura no Google, apesar de testes HTTP/XML válidos. Perfil da Empresa exige CEP; GA4 exige porte; GTM exige termos; Meta exige login; Ads exige confirmação de faturamento. Nenhum desses bloqueios deve ser descrito como integração funcionando. Nenhuma cobrança foi executada por este trabalho; histórico financeiro global da conta não foi auditado.
