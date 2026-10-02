# Auzen Pet Resort

Website em português para hotel e creche de cães em Lauro de Freitas, com páginas institucionais, serviços, promoções e solicitação de reserva. React, TypeScript, Vite, React Router, pnpm e styled-components, com Motion para transições discretas. O formulário calcula a estimativa e prepara uma mensagem única para o WhatsApp; a equipe confirma a vaga e o pagamento.

Site publicado: https://auzen-pet-resort.vercel.app

Projeto Vercel: https://vercel.com/jraamos-projects/auzen-pet-resort. A branch `main` está conectada ao ambiente Production. Detalhes e ressalva do plano atual em `docs/deploy.md`.

## Executar

O deploy usa Node 24 e pnpm 10.15.1.

```sh
pnpm install
pnpm dev
pnpm lint
pnpm test
pnpm test:e2e
pnpm build
pnpm preview
```

O build estático é gerado em `dist/`. `vercel.json` define Vite, instalação com lockfile e os comandos do deploy. Com a integração Git conectada na Vercel, pushes na branch de produção geram novos deploys.

## Editar conteúdo e identidade

- `src/styles/theme.ts`: cores, fontes, espaçamentos, raios, sombras e transições.
- `src/config/contact.ts`: telefone, mensagens contextuais e campos comerciais opcionais.
- `src/config/navigation.ts`: páginas da navegação principal.
- `src/config/booking.ts`: tabela inicial de diárias, cupom MAISDIAS, horários e limites.
- `src/pages/ContentPages.tsx`: história familiar, serviços, promoções, espaço, contato e orientações.
- `src/pages/BookingPage.tsx`: formulário em quatro etapas, revisão e link para WhatsApp.
- `src/utils/booking.ts`: cálculo, validação e mensagem consolidada.
- `src/data/gallery.ts`: seleção e enquadramentos da galeria.
- `src/data/faq.ts`: perguntas e respostas.
- `src/data/testimonials.ts`: vazio até receber depoimentos reais aprovados.
- `src/components/Brand.tsx` e `public/favicon.svg`: wordmark e favicon provisórios.

WhatsApp, Instagram, endereço regional, história e horários vieram dos materiais enviados em 01/10/2026. O número do imóvel aguarda confirmação. Os preços e a promoção são provisórios, definidos a pedido do usuário e centralizados para revisão. As orientações usam o rascunho fornecido. Dados dos formulários não são persistidos; nenhum pagamento ou confirmação automática é realizado pelo site. Consulte `docs/expansao-reservas.md` para as decisões de conteúdo e fluxo.

## Domínio e SEO

Na Vercel, Production usa `VITE_SITE_URL=https://auzen-pet-resort.vercel.app`. Para migrar para um domínio próprio confirmado, atualize essa variável e gere novo deploy. A URL deve ser uma origem HTTP(S), sem caminhos, parâmetros ou credenciais. O arquivo local `.env.example` permanece sem domínio para não presumir o ambiente de desenvolvimento.

O build inclui título, descrição, Open Graph, favicon, idioma, `robots.txt` e sitemap com as páginas públicas. O domínio publicado é o fallback de configuração. Títulos e canonical acompanham a navegação no navegador. Dados estruturados `LocalBusiness` incluem o contato e endereço fornecidos.

## Imagens e vídeo

As 19 fotografias e 2 vídeos fornecidos foram analisados. Veja `docs/curadoria.md`. Os originais permanecem intactos na pasta de origem do usuário.

`public/images` contém derivados AVIF com fallback JPEG, nas larguras 480/900 e 1600 quando a fonte permite. `ResponsiveImage` fornece `srcset`, dimensões, carregamento lazy e recortes por CSS. O hero tem fotografia específica para mobile e preload condicionado à largura.

O vídeo do quintal é um trecho de 18 segundos, sem áudio, de aproximadamente 1,5 MB. Seu `src` só é definido no primeiro clique; a reprodução pausa ao sair da tela. Não há autoplay. O poster e a descrição permanecem disponíveis sem reprodução.

## Interação e acessibilidade

Menu mobile com controle de foco, Escape, fundo inerte e fechamento ao navegar. Lightbox usa `<dialog>` modal, suporta setas, Escape, fechamento pelo fundo e restauração de foco. FAQ usa `<details>`. Há skip link, foco visível, HTML semântico e suporte a `prefers-reduced-motion` nas transições e efeitos de scroll. O botão flutuante aparece entre o hero e o contato, evitando sobrepor os CTAs dessas seções.

`trackEvent` despacha apenas um `CustomEvent` local (`auzen:analytics`) com nome e contexto do evento. Nenhum tracking, cookie ou envio externo foi instalado. Uma integração futura pode ouvir esse evento.

## Verificação

Confira `docs/validacao.md` para a revisão local e `docs/deploy.md` para a publicação. Domínio próprio, adequação do plano ao uso comercial e dados comerciais permanecem decisões do negócio.
