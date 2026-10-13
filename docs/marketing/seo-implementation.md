# SEO técnico e local

## Expansão orgânica — 13/10/2026

Implementado localmente, ainda sem commit, push ou publicação nesta etapa:

- Hub `/guias` e dois conteúdos próprios: `/guias/hotel-ou-creche` e `/guias/hospedagem-feriados`, com fotos reais, índice de leitura, links para serviços, preparação da estadia e reserva.
- Pré-renderização de rotas aninhadas, sitemap com 14 URLs, metadados únicos e dados estruturados Article, BreadcrumbList, WebPage e WebSite.
- CEP 42725-430 e recepção todos os dias das 7h às 17h, confirmados pelo proprietário, no contato, rodapé e LocalBusiness. Pernoite não implica recepção 24 horas.
- Teste adicional de descoberta dos guias, navegação, imagens, JSON-LD, canonical e ausência de overflow em desktop, tablet e celular de 320 px.

Validação concluída: build, lint, 17 testes unitários, verificador de 14 páginas públicas + 404 e 24 testes E2E aprovados. Após ajustar o enquadramento das fotos, os três testes dos guias foram repetidos e aprovados. Prévia validada em `http://127.0.0.1:4182/guias`. O servidor em 4178 pertencia a outra cópia local (`/Users/jonathanfebraio/auzen-pet-resort`); não foi encerrado ou alterado. Para evitar validar essa cópia antiga, esta rodada usou `QA_BASE_URL=http://127.0.0.1:4182 pnpm test:e2e`.

Rotina recomendada depois da publicação: acompanhar consultas, impressões e cliques no Search Console semanalmente; comparar períodos completos de 28 dias. No GA4, acompanhar Organic Search e contatos por WhatsApp, sem classificá-los como reservas confirmadas. Revisar mensalmente conteúdo a partir de dúvidas reais dos tutores. Publicar fotos reais e solicitar avaliações honestas de clientes, sem incentivos ou seleção apenas de avaliações positivas.

Prioridade externa: concluir a verificação do Perfil da Empresa e confirmar o pin exato da entrada. O Google confirmou `/hotel` e `/creche` indexados nesta auditoria; o relatório do sitemap ainda mostra falha de leitura, apesar de o endpoint responder 200 XML com HTTPS válido. Não prometer posição nem prazo para tráfego.

Referências: [guia de SEO do Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) e [visibilidade local](https://support.google.com/business/answer/7091?hl=pt-BR).

## Implementação

- React 19, TypeScript, Vite 8, React Router e styled-components mantidos; sem migração e sem backend novo.
- Domínio padrão corrigido para `https://auzenpetresort.com.br`; antigo fallback `vercel.app` removido da geração de canonical/sitemap/robots.
- 11 páginas públicas com títulos e descrições próprios em `src/config/seo.ts`; Open Graph e Twitter atualizados no HTML estático e na navegação SPA.
- Páginas novas `/hotel`, `/creche` e `/privacidade`; links internos na home, Serviços e rodapé. Cada serviço tem fotos reais, horários, orientações, quatro perguntas frequentes, solicitação de reserva e contato específico pelo WhatsApp.
- O build gera HTML completo, CSS e Schema.org para cada página com o próprio React. Antes, o documento inicial trazia apenas a raiz vazia. Crawler e visitante sem JavaScript recebem conteúdo; o formulário interativo continua exigindo JavaScript, com alternativa direta pelo WhatsApp.
- `LocalBusiness`, `Service` e `FAQPage` somente com informações e respostas presentes na página. Sem avaliações, coordenadas, horários semanais ou preços definitivos inventados.
- `robots.txt` permite páginas públicas e referencia o sitemap oficial. Sitemap contém as 11 rotas; não inclui 404 nem parâmetros de campanha.
- A Vercel usa arquivos estáticos com clean URLs em vez de encaminhar qualquer endereço ao index. `404.html` recebe `noindex`; o HTTP 404 precisa ser conferido após deploy.
- Redirecionamento permanente do host antigo `auzen-pet-resort.vercel.app` para o domínio oficial, preservando caminho; www permanece na configuração do projeto.
- Favicons, fontes locais, imagens responsivas e identidade existentes preservados. Imagem de hero não é pré-carregada em páginas internas.
- Cabeçalhos `nosniff`, `Referrer-Policy: strict-origin-when-cross-origin` e `X-Frame-Options: SAMEORIGIN` adicionados.

## Verificação reproduzível

```sh
pnpm build
node scripts/verify-static.mjs
pnpm test:e2e
```

O verificador examina 11 páginas e 404: corpo estático, um H1, títulos únicos, canonical, robots, JSON-LD válido e sitemap. Testes de navegador cobrem imagens, FAQs, mobile de 320 px, metadados e navegação.

## Limites

HTML rastreável e Search Console não garantem indexação, rich results nem posição. Core Web Vitals de campo dependem de tráfego e processamento do Google. O build ainda sinaliza bundle principal acima de 500 KB; otimização incremental é preferível a uma troca de framework. O prerender resolve conteúdo inicial, não substitui medição real de desempenho.

Referências: [JavaScript e SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), [erros de rastreamento e soft 404](https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors).
