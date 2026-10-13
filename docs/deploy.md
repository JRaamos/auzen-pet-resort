# Publicação na Vercel — 29/09/2026

- Repositório: https://github.com/JRaamos/auzen-pet-resort
- Branch de produção: `main`.
- Projeto: https://vercel.com/jraamos-projects/auzen-pet-resort
- Endereço público estável: https://auzen-pet-resort.vercel.app
- Nome sem números ou sufixos aleatórios. URLs imutáveis de cada deployment podem conter identificadores; não são o endereço público escolhido.
- Framework: Vite; raiz `./`; saída `dist`; Node `24.x` declarado no `package.json`; pnpm `10.15.1`.
- Instalação: `pnpm install --frozen-lockfile`; build: `pnpm build`.
- Variável Production: `VITE_SITE_URL=https://auzen-pet-resort.vercel.app`.
- Integração Git conectada: novos pushes na `main` disparam deploys Production.

## Primeiro deploy verificado

- Fonte: `535f9eeb97c90e512ebf592e0ea2ec4ef1af16c4`.
- Detalhe: https://vercel.com/jraamos-projects/auzen-pet-resort/DKqFymYhQTVjsc5m2oEXwVqux76H
- Estado observado na Vercel: `Ready`.
- Site público responde HTTP 200, sem autenticação.
- Canonical, `og:url`, `robots.txt` e `sitemap.xml` apontam para o endereço escolhido.
- Fotografia mobile AVIF e vídeo MP4 acessíveis via HTTPS.
- Navegador em 375 × 667: hero de aproximadamente 612 px, imagem mobile correta e sem overflow horizontal.
- `pnpm lint` e `pnpm build` passaram localmente. O Node local era 20.19.6, com aviso de engine; o build da Vercel usa a versão configurada para o projeto.

## Plano e custos

A conta usada está no plano Hobby. A Vercel restringe esse plano a uso pessoal e não comercial: https://vercel.com/docs/plans/hobby. Como o site divulga serviços de uma empresa, é necessário adequar o plano/hospedagem para uso comercial. Nenhuma assinatura, compra de domínio, upgrade, integração paga ou analytics foi contratado nesta publicação. O subdomínio `vercel.app` não é um domínio próprio adquirido.

Arquivos de ambiente e `.vercel/` estão ignorados pelo Git. Nenhum `.env.production` foi criado ou alterado.

## Atualização comercial — 13/10/2026

- Domínio oficial atual: https://auzenpetresort.com.br.
- Alteração `6ccd37d`: preços por porte, simulador, WhatsApp comercial, duas novas fotos e revisão de textos.
- Vercel confirmou sucesso no deployment `3o5hXyjMrQLxWPj4uoqDn5s2hFLm`; `/contato` já entregou o novo WhatsApp em HTTPS, sem o número antigo.
- Validação local: lint, build, 17 testes de reserva, 21 verificações de navegador em desktop/tablet/celular e 12 páginas pré-renderizadas. O build conserva o aviso de tamanho do bundle principal.
- Ajuste complementar da galeria: colunas equilibradas para acomodar as novas fotos sem lacunas entre as linhas no desktop.
