# Auzen Pet Resort

Website institucional em português para hotel e creche de cães. React, TypeScript, Vite, pnpm e styled-components, com Motion para transições discretas. Conversão pelo WhatsApp; sem backend ou reservas próprias.

Site publicado: https://auzen-pet-resort.vercel.app

Projeto Vercel: https://vercel.com/jraamos-projects/auzen-pet-resort. A branch `main` está conectada ao ambiente Production. Detalhes e ressalva do plano atual em `docs/deploy.md`.

## Executar

O deploy usa Node 24 e pnpm 10.15.1.

```sh
pnpm install
pnpm dev
pnpm lint
pnpm build
pnpm preview
```

O build estático é gerado em `dist/`. `vercel.json` define Vite, instalação com lockfile e os comandos do deploy. Com a integração Git conectada na Vercel, pushes na branch de produção geram novos deploys.

## Editar conteúdo e identidade

- `src/styles/theme.ts`: cores, fontes, espaçamentos, raios, sombras e transições.
- `src/config/contact.ts`: telefone, mensagens contextuais e campos comerciais opcionais.
- `src/config/navigation.ts`: navegação por âncoras.
- `src/data/gallery.ts`: seleção e enquadramentos da galeria.
- `src/data/faq.ts`: perguntas e respostas.
- `src/data/testimonials.ts`: vazio até receber depoimentos reais aprovados.
- `src/components/Brand.tsx` e `public/favicon.svg`: wordmark e favicon provisórios.

Endereço, Instagram, horário e links legais ficam ausentes enquanto seus campos forem `null`/vazios. Preencha somente com dados confirmados. Informações sobre preços, alimentação, vacinação, adaptação e atendimento veterinário não foram presumidas.

## Domínio e SEO

Na Vercel, Production usa `VITE_SITE_URL=https://auzen-pet-resort.vercel.app`. Para migrar para um domínio próprio confirmado, atualize essa variável e gere novo deploy. A URL deve ser uma origem HTTP(S), sem caminhos, parâmetros ou credenciais. O arquivo local `.env.example` permanece sem domínio para não presumir o ambiente de desenvolvimento.

O build inclui título, descrição, Open Graph, favicon, idioma e `robots.txt`. Com a URL configurada, gera canonical, `og:url`, imagem Open Graph absoluta e `sitemap.xml`; a referência ao sitemap entra no robots. Sem domínio, canonical e sitemap são omitidos. A informação estruturada `LocalBusiness` só aparece após domínio e endereço serem preenchidos.

## Imagens e vídeo

As 19 fotografias e 2 vídeos fornecidos foram analisados. Veja `docs/curadoria.md`. Os originais permanecem intactos na pasta de origem do usuário.

`public/images` contém derivados AVIF com fallback JPEG, nas larguras 480/900 e 1600 quando a fonte permite. `ResponsiveImage` fornece `srcset`, dimensões, carregamento lazy e recortes por CSS. O hero tem fotografia específica para mobile e preload condicionado à largura.

O vídeo do quintal é um trecho de 18 segundos, sem áudio, de aproximadamente 1,5 MB. Seu `src` só é definido no primeiro clique; a reprodução pausa ao sair da tela. Não há autoplay. O poster e a descrição permanecem disponíveis sem reprodução.

## Interação e acessibilidade

Menu mobile com controle de foco, Escape, fundo inerte e fechamento ao navegar. Lightbox usa `<dialog>` modal, suporta setas, Escape, fechamento pelo fundo e restauração de foco. FAQ usa `<details>`. Há skip link, foco visível, HTML semântico e suporte a `prefers-reduced-motion` nas transições e efeitos de scroll. O botão flutuante aparece entre o hero e o contato, evitando sobrepor os CTAs dessas seções.

`trackEvent` despacha apenas um `CustomEvent` local (`auzen:analytics`) com nome e contexto do evento. Nenhum tracking, cookie ou envio externo foi instalado. Uma integração futura pode ouvir esse evento.

## Verificação

Confira `docs/validacao.md` para a revisão local e `docs/deploy.md` para a publicação. Domínio próprio, adequação do plano ao uso comercial e dados comerciais permanecem decisões do negócio.
