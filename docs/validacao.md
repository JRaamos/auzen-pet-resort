# Validação local — 29/09/2026

## Compilação e código

- `pnpm lint`: sem erros ou avisos.
- `pnpm build`: TypeScript e build de produção concluídos.
- Bundle JavaScript: aproximadamente 457 kB / 143 kB gzip. Fontes hospedadas no próprio site.
- WhatsApp: todos os links renderizados usam o número centralizado e mensagem codificada; nenhuma mensagem foi enviada durante a validação.
- Nenhum depoimento ou dado estruturado de negócio local é renderizado com a configuração atual.

## Navegador

Revisão feita no navegador integrado, incluindo o build estático servido localmente por `pnpm preview`.

| Largura × altura | Resultado |
| --- | --- |
| 375 × 667 | Sem overflow horizontal; os dois CTAs do hero cabem na primeira dobra |
| 430 × 932 | Sem overflow horizontal; CTAs visíveis |
| 768 × 1024 | Sem overflow horizontal; navegação mobile; composição do espaço revisada |
| 1024 × 768 | Sem overflow horizontal; hero e CTAs contidos na tela |
| 1366 × 768 | Sem overflow horizontal; navegação desktop |
| 1440 × 900 | Sem overflow horizontal; composição desktop revisada |

Verificações funcionais:

- Menu mobile abre, foca o primeiro link, bloqueia o fundo e fecha com Escape, devolvendo foco ao botão.
- Galeria abre em diálogo modal; botão de próxima foto e seta esquerda mudam o conteúdo; Escape fecha e retorna o foco à miniatura original.
- FAQ expande a resposta selecionada.
- Vídeo começa sem `src`; após ação do usuário, carrega o trecho de aproximadamente 18 s e reproduz; botão pausa.
- Navegação para seções e mudança do header durante o scroll verificadas.
- Botão flutuante oculto no hero/contato/rodapé para evitar colisões com os CTAs.
- Nenhum link sem texto ou nome acessível encontrado na inspeção DOM.
- Contraste do botão principal em terracota com texto branco superior a 4,5:1. Não se trata de certificação de acessibilidade ou teste com leitor de tela físico.
- `prefers-reduced-motion` é tratado no CSS, reveals, hero e progresso da jornada; vídeo depende de clique.

Capturas e medições locais ficam em `qa/` (ignorado pelo Git). Não há benchmark Lighthouse ou teste em dispositivo físico registrado nesta entrega.

## SEO

Um build separado, em `qa/domain-build`, foi executado com `https://example.invalid` exclusivamente para testar configuração. Asserções confirmaram canonical, Open Graph absoluto, sitemap e referência no robots. O build de entrega em `dist/` continua sem domínio configurado.

## Refinamento mobile

- Hero com fotografia de altura limitada, sem alongar para preencher telas muito altas; sem parallax no mobile.
- 320 × 568: hero de aproximadamente 562 px, segundo CTA termina em aproximadamente 514 px; sem overflow horizontal.
- 375 × 667: hero de aproximadamente 612 px; os dois rostos e CTAs visíveis.
- 375 × 1121: hero de aproximadamente 682 px, sem o vazio excessivo da versão anterior.
- 430 × 932: composição compacta e sem overflow horizontal.
- 1440 × 900: hero de 900 px, fotografia original `hero-garden-1600.avif`, navegação desktop e ausência de overflow confirmados após o refinamento.
- Largura útil de 305 px (viewport de 320 px com scrollbar): `scrollWidth = clientWidth = 305`, sem rolagem horizontal.
- Menu agora desliza da direita, com fotografia, navegação numerada e CTA de contato; permanece rolável quando necessário.
- Abertura/fechamento, Escape com retorno de foco, foco no primeiro link após transição, fundo `inert`, navegação para `#espaco` e fechamento pelo backdrop em 768 px verificados no navegador.
- Imagem gerada por IA aplicada apenas até 800 px, com derivados AVIF/JPEG responsivos. Originais preservados; prompt e procedência em `hero-mobile-image.md`.

## Pendências comerciais e publicação

O site ainda não foi publicado. Domínio, endereço, Instagram, horários, políticas e depoimentos precisam de conteúdo confirmado do negócio. Essas lacunas não impedem o uso do frontend local ou a conversão pelo WhatsApp, mas permanecem ausentes do conteúdo público.
