# Presença digital — auditoria e execução

Data: 12/10/2026. **Status geral: PARCIAL.** Site publicado e validado; plataformas externas têm pendências específicas, descritas abaixo. Não houve ativação de anúncios, inclusão de pagamento ou verificação de identidade.

## Inventário e limites

Repositório independente `JRaamos/auzen-pet-resort`, branch `main`, Git local `jraamos <jhonyramos46@gmail.com>`. Checkout utilizado: `/Users/jonathanfebraio/auzen-pet-resort`; o volume portátil informado não estava montado. A árvore estava limpa antes do trabalho. Nenhum histórico foi reescrito.

Stack: React 19, TypeScript, Vite 8, React Router, styled-components, Motion, Node 24 e pnpm. Hospedagem Vercel, equipe `jraamos-projects`, projeto `auzen-pet-resort`, deploy automático pelo GitHub. Não foi criado backend, banco de leads ou API de WhatsApp.

Identidade existente preservada: verde, creme, terracota, fontes locais, fotografias do acervo e assinatura Febraio Tech. A skill de frontend orientou a continuidade do design, a hierarquia editorial e a validação móvel, sem reconstrução do site.

## Resultado por frente

| Frente | Status real | Evidência / próximo passo |
|---|---|---|
| Auditoria, domínio e HTTPS | CONCLUÍDO | Apex e www com TLS válido; redirecionamentos preservam rota e query. DNS não alterado. |
| SEO técnico/local | CONCLUÍDO | Onze rotas com HTML pré-renderizado, metas únicas, canonical oficial, schema, robots e sitemap. 404 HTTP real. |
| Hotel, Creche e WhatsApp | CONCLUÍDO | Páginas próprias, fotografias reais, FAQs, CTAs e reserva existente testados em produção. |
| Search Console | PARCIAL | Propriedade verificada. Home já indexada. Indexação solicitada para home, Hotel e Creche. Sitemap enviado; leitura pelo Google pendente de correção/confirmação. |
| Perfil da Empresa/Maps | PARCIAL | Sessão acessível, gerente sem empresas. Nome/categoria/endereço preparados; campo CEP obrigatório bloqueia avanço. |
| GA4 | PARCIAL | Implementação testada; assistente na conta autorizada preparado, mas exige porte da empresa. Sem fluxo/ID real instalado. |
| GTM | BLOQUEADO POR VERIFICAÇÃO | Conta autenticada sem contêineres. Formulário Auzen/Web/Brasil preparado; aceite explícito dos termos pendente do responsável. |
| Instagram/Facebook | BLOQUEADO POR VERIFICAÇÃO | Instagram público existente; Meta Business solicita login do Instagram. Sem administração ou publicação alegada. |
| WhatsApp Business | PARCIAL | Links e mensagens do site funcionando; perfil Business/gestão do número não comprovados. Respostas prontas sem migração. |
| Google Ads | PENDENTE DE PAGAMENTO | Assistente autenticado acessado; cadastro sem campanha chegou à confirmação de faturamento, não confirmada. Rascunho completo em arquivo, não campanha salva/pausada na plataforma. |
| Conteúdo | CONCLUÍDO | Sete PNGs, legendas, capa e calendário inicial; não publicados nas redes. |
| Painel de resultados | PARCIAL | HTML gratuito local e importação de agregados testados. Não conectado a GA4; métricas reais indisponíveis. |
| Bing/Apple/diretórios | PARCIAL | Viabilidade avaliada; adiar cadastro até consolidar endereço exato e propriedade. Nenhum cadastro em massa. |
| Testes/publicação | CONCLUÍDO | Build/lint, 14 unitários, 9 de medição isolada e 18 E2E em produção. Ver `test-evidence.md`. |

## Problemas encontrados e tratados

- Canonical/fallback ainda apontavam para Vercel, confirmado também no rastreamento antigo da home pelo Google; corrigidos para o domínio próprio.
- SPA entregava shell HTML; adicionada pré-renderização sem migração de framework.
- Hotel/Creche não tinham destinos próprios completos para pesquisa; criadas `/hotel` e `/creche`.
- Rastreamento sem instalação validada; criado contrato de eventos, consentimento básico e filtros de dados sensíveis. Não instalar IDs de propriedades alheias.
- Contraste de links/legendas ajustado e hero visível no HTML inicial. Home: desempenho móvel de laboratório passou de 77 para 96 nesta amostra.
- Site já oferecia preços provisórios; preservados com ressalvas. Não usados nos anúncios.

## Ações estritamente do proprietário

1. Confirmar CEP exato, número/pin e dias de recepção, dados ausentes do site.
2. Informar faixa de funcionários exigida pelo GA4 e aceitar termos das ferramentas quando solicitado.
3. Autenticar a conta que administra o Instagram/Meta do Auzen e realizar 2FA/verificação quando exigida.
4. Resolver o faturamento do Ads apenas após revisão; não confirmar oferta que exija gasto acima de R$ 150. Depois, ativação exige autorização separada.
5. Realizar a verificação presencial/documental do Perfil da Empresa, se Google a solicitar após completar o endereço.

As demais configurações (tags, conversão real, campanha dentro do Ads, vínculos e publicação social) continuam sendo trabalho técnico após desbloqueio, não um tutorial transferido ao proprietário. Não prometer posição no Google, retorno comercial ou conformidade jurídica integral.

## Recursos

- [Site oficial](https://auzenpetresort.com.br/) · [Hotel](https://auzenpetresort.com.br/hotel) · [Creche](https://auzenpetresort.com.br/creche) · [Privacidade](https://auzenpetresort.com.br/privacidade).
- [Search Console](https://search.google.com/search-console?resource_id=https%3A%2F%2Fauzenpetresort.com.br%2F), [Analytics](https://analytics.google.com/), [Tag Manager](https://tagmanager.google.com/).
- [Perfil da Empresa](https://business.google.com/locations), [Google Ads](https://ads.google.com/), [Meta Business Suite](https://business.facebook.com/), [Instagram existente](https://www.instagram.com/auzenpetresort/).
- [Dados comerciais](business-information.md), [evidências](test-evidence.md), [checklist](launch-checklist.md), [painel local](results-dashboard.html).
