# Google Search Console

Status: **PARCIAL** — propriedade efetivamente verificada; sitemap enviado, mas a plataforma ainda informa falha de leitura. Não declarar o sitemap processado.

## Configuração realizada

- Sessão Google já autenticada e autorizada pelo proprietário.
- Propriedade de prefixo de URL: `https://auzenpetresort.com.br/`.
- Método oficial Tag HTML: metatag pública em `index.html`, replicada na pré-renderização, publicada e validada pelo Google. A tela confirmou **Propriedade verificada** em 12/10/2026.
- Não houve alteração DNS nem necessidade de aceitar acesso a outro projeto.
- Sitemap cadastrado: `https://auzenpetresort.com.br/sitemap.xml`, com onze URLs canônicas. Houve uma nova tentativa de envio após conferir o arquivo nos dois IPs do domínio.

Manter a metatag de verificação nas próximas versões. [Abrir propriedade](https://search.google.com/search-console?resource_id=https%3A%2F%2Fauzenpetresort.com.br%2F).

## Inspeções reais

| URL | Estado observado | Ação confirmada |
|---|---|---|
| `/` | O URL está no Google; página indexada e HTTPS. Último rastreamento exibido: 03/10/2026 13:56:43, Googlebot Smartphone. | Nova indexação solicitada e confirmada para atualizar o conteúdo/canonical. |
| `/hotel` | Google ainda não conhecia a URL. | Indexação solicitada; tela confirmou inclusão em fila de rastreamento prioritário. |
| `/creche` | Google ainda não conhecia a URL. | Indexação solicitada; tela confirmou inclusão em fila de rastreamento prioritário. |

No rastreamento antigo da home, o canonical declarado ainda era `https://auzen-pet-resort.vercel.app/`, embora o Google tenha escolhido a URL inspecionada no domínio próprio. O HTML atualmente publicado já declara `https://auzenpetresort.com.br/`; a nova solicitação não prova que esse rastreamento antigo foi atualizado.

## Falha de leitura do sitemap

O Google aceitou o envio, mas mostrou **Não foi possível buscar/ler o sitemap**, sem causa detalhada. Em testes independentes, o mesmo arquivo respondeu HTTP 200, `application/xml`, XML válido e TLS validado, tanto por DNS normal quanto por cada IP A publicado (`216.198.79.1` e `64.29.17.1`). Não há AAAA publicado no teste. `robots.txt` permite `/` e referencia esse sitemap. Requisição com user-agent Googlebot também retornou 200 (isso não simula integralmente o crawler do Google).

Não foi encontrada falha reproduzível no arquivo ou no HTTPS. A causa no Google permanece **não confirmada**; não atribuir automaticamente a propagação DNS, firewall ou simples espera. Reavaliar o relatório depois do processamento; se persistir, consultar diagnóstico de rastreamento e regras/logs da Vercel antes de qualquer mudança DNS. Não reenviar repetidamente as mesmas URLs para tentar alterar a fila.

## Relatórios ainda sem dados

Desempenho, indexação agregada e experiência indicaram dados em processamento, com orientação do próprio painel para voltar em cerca de um dia. Não há Core Web Vitals de campo confirmado nesta propriedade. Os resultados Lighthouse documentados são medições de laboratório, não esse relatório.

Evidências locais em `qa/search-console-verified.png`, `search-console-sitemap-submitted.png`, `search-console-home-indexed.png`, `search-console-home-last-crawl.png` e `search-console-{home,hotel,creche}-indexing-requested.png`. A pasta QA é ignorada no Git; os resultados essenciais estão registrados aqui, sem cookies ou credenciais.
