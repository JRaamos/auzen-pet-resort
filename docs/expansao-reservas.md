# Expansão do Auzen — 01/10/2026

O projeto passa de landing page a site com navegação. Páginas: `/`, `/quem-somos`, `/servicos`, `/promocoes`, `/espaco`, `/contato`, `/informacoes` e `/reservar`. URLs diretas usam fallback SPA na Vercel. Títulos, canonical e sitemap acompanham as rotas.

## Conteúdo dos materiais enviados

- WhatsApp: **(71) 98241-2339**, Coordenadora de comunicações - Renata. Todos os contatos usam `5571982412339`.
- Instagram: https://www.instagram.com/auzenpetresort/.
- Rua da Jurema, Quingoma de Fora, Lauro de Freitas–BA. O número do imóvel permanece pendente de confirmação; o mapa busca a região, sem inventar coordenadas.
- Referências de chegada: Terraço Mineira e Capela São José. Visitas devem ser combinadas previamente.
- Creche: 07h–17h. Hotel: entrada 07h–17h e saída até 09h do dia seguinte. Transporte: valor, rota e disponibilidade a combinar.
- História: a arte de 01/10 substitui o rascunho de 30/09. Auzencio nasceu em agosto de 1925 e faleceu em agosto de 2024; patriarca de 12 filhos e filhas, agricultor, apaixonado por cães e aves. Richard era seu último cão.
- O retrato familiar usa o material original, enquadrado por CSS. Não houve recriação do rosto por IA.
- Vacinação, proteção antiparasitária, alimentação habitual, saúde e horários entram nas orientações e na reserva. Ideias de futuras camas, piscinas e brinquedos no caderno não foram anunciadas como estruturas já existentes.

## Configuração comercial inicial

`src/config/booking.ts` centraliza valores, promoção e limites. A pedido do usuário, os valores são iniciais e deverão ser revisados:

- Hotel: R$ 100 por noite e por cão.
- Creche: R$ 65 por dia e por cão; inclui a primeira e a última data.
- MAISDIAS: 10% sobre as diárias, para períodos de pelo menos 5 diárias. Não incide sobre transporte, que não tem valor fixo inventado.
- Preferência de pagamento: Pix, crédito, débito ou dinheiro. Nenhum dado de cartão, comprovante ou pagamento é recebido pelo site. A equipe confirma a disponibilidade, a tabela final e a forma de pagamento.

## Reserva

Quatro etapas: período e serviço; tutor e emergência; dados de até quatro cães; revisão e pagamento preferido. Cálculo de datas usa dias UTC para evitar diferenças de fuso; a data de hoje usa `America/Bahia`. Datas passadas, períodos inválidos, horários incorretos e cupom inelegível impedem avançar. Períodos acima de 60 dias são tratados diretamente pela equipe.

Nome, contato, endereço, emergência, raça, idade, peso, porte, sexo, castração, vacinação, proteção antiparasitária, alimentação e comportamento são validados. Saúde, medicamentos e observações podem ser detalhados. Consentimento obrigatório antes do compartilhamento.

A etapa final prepara **uma única mensagem**, com ícones, os dados preenchidos e a estimativa discriminada. O link oficial `wa.me` abre a conversa no número novo. O visitante ainda precisa tocar em enviar; nenhuma reserva ou pagamento é confirmado automaticamente. Não há armazenamento dos dados em backend, localStorage ou sessionStorage.

Referências de fluxo: [DogHero/Petlove — como funciona a hospedagem](https://suporte.doghero.com.br/hc/pt-br/articles/39070357217691-Como-funciona-a-hospedagem-de-pets), [PetBacker — como reservar](https://www.petbacker.com/help-center-uk/payments/how-to-book-or-make-payment) e [WhatsApp — clique para conversar](https://faq.whatsapp.com/5913398998672934). A implementação usa React Router no modo declarativo, conforme [a documentação oficial](https://reactrouter.com/start/declarative/routing).

## Imagem de campanha

Gerada com a ferramenta integrada imagegen, usando o jardim real como referência. Final no projeto: `public/images/campaign-garden.jpg`; a página promocional identifica a foto como ilustrativa. As demais fotos do espaço continuam reais.

Prompt final: fotografia editorial natural e fotorrealista, horizontal 3:2, de dois cães sem raça definida — um claro e um marrom com focinho preto — brincando juntos em um jardim brasileiro, com gramado, flores amarelas, parede laranja e luz suave de fim de tarde. Câmera ao nível dos cães, textura natural de pelo e grama, vegetação calma à esquerda para o texto. Sem pessoas, piscina, novas instalações, placas, texto, logotipo, colagem ou interface. Referência: `public/images/hero-garden-900.jpg`.

## Verificação

- `pnpm test`: cálculo de noites/dias, cupons, múltiplos cães, fuso da Bahia, validação e integridade da mensagem.
- `pnpm test:e2e`: rotas diretas, navegação/voltar, menu lateral, formulário completo com dois cães e revisão do destino da mensagem. Desktop 1440×1000 e celular 320×568. QA não envia mensagens externas.
- `pnpm lint`, `pnpm build` e `git diff --check`.
- Capturas locais em `qa/`, ignoradas pelo Git.

Marca principal preservada; assinatura Febraio Tech mantida no rodapé. Novos commits usam `jraamos <jhonyramos46@gmail.com>`.
