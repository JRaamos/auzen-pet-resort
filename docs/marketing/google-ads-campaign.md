# Google Ads — teste de pesquisa local

Status: **PENDENTE DE PAGAMENTO** na plataforma; campanha em **rascunho local, não enviada à plataforma**. Isso não equivale a uma campanha pausada dentro de uma conta Google Ads. Fonte executável de conferência: [campaign-draft.json](campaign-draft.json).

## Acesso real e ponto de parada

O navegador autenticado abriu o assistente de primeira campanha. Nome Auzen Pet Resort, domínio e descrição real foram preparados. Sugestões automáticas de imagens e vínculo do canal pessoal do YouTube não foram aceitos para a campanha. Foi usada a opção **Configure apenas a conta**, para alcançar o gerenciamento sem publicar anúncios. Brasil, Bahia (GMT-03) e BRL foram conferidos.

A etapa seguinte exige confirmar configurações de conta/pagamento e mostra forma de pagamento preexistente, aviso de autorização temporária no cartão e oferta com requisito de gasto superior ao teto deste teste. **Não houve confirmação dessa etapa, alteração do perfil/cartão, cobrança iniciada, publicação ou ativação.** Não registrar dados financeiros nos documentos. O proprietário deve resolver essa etapa apenas após revisão; não seguir a oferta automática como orçamento de campanha.

O painel completo, inventário de campanhas, Planejador, conversões, teto total disponível na interface e campanha salva/pausada ainda não foram validados. Nenhuma campanha de outro projeto foi alterada. Não declarar que toda a conta está sem campanhas ativas com base somente nesse assistente.

## Estrutura pronta

- `AUZEN | Pesquisa Local | Hotel e Creche | Teste 01`.
- Pesquisa Google apenas; parceiros de pesquisa e Display desligados. Sem Performance Max, YouTube, remarketing ou expansão automática.
- Dois grupos: Hotel/Hospedagem e Creche/Day Care. Cada grupo tem palavras de frase e exatas, 10 títulos e 4 descrições, respeitando limites de 30/90 caracteres.
- Destinos: `/hotel` e `/creche`. Quatro sitelinks: Hotel, Creche, Espaço e Solicitar reserva.
- Português; município de Lauro de Freitas/BA com opção de presença. Não acrescentar Salvador ou um raio sem validar área de atendimento e estimativas.
- Negativas preparadas: adoção, doação, vaga/vagas de emprego, currículo, curso, treinamento profissional, cachorro para comprar, grátis, gratuito e hotel para gatos. Não negativar `vaga` isoladamente: isso bloquearia busca por hospedagem disponível.
- UTMs: `utm_source=google&utm_medium=cpc&utm_campaign=auzen_pesquisa_local_teste_01&utm_content=hotel` ou `creche`. Manter marcação automática para GCLID; não preencher `utm_term` com texto arbitrário no evento do site.
- Nenhum preço, desconto, avaliação ou diferencial não comprovado nos anúncios.

## Limite financeiro obrigatório

**R$ 150 no total por 15 dias.** Não confundir com R$ 150 por dia. Datas permanecem vazias até autorização separada: início escolhido pelo proprietário e fim 14 dias depois, inclusive. O teste não começa com a preparação deste arquivo.

A documentação oficial consultada informa orçamento total para campanhas Search com duração de 3 a 90 dias, sujeito à disponibilidade da conta. Preferir teto total de R$ 150. Não converter automaticamente para R$ 10/dia: orçamento diário médio não é limite diário rígido e não garante esse teto de teste.

Se não houver orçamento total, **não ativar** até revisar uma alternativa que imponha o teto. Alertas e regras automáticas podem atrasar; não tratá-los como garantia financeira.

## Lances e conversão

Hipótese inicial: Maximizar cliques com limite de CPC, por se tratar de teste novo, pequeno e sem histórico comprovado de reservas. O limite de CPC fica pendente do Planejador de Palavras-chave da conta; não foi inventado um valor nem uma previsão de resultados. Maximizar conversões só deve ser reconsiderado com medição confiável e volume real. Não aceitar recomendações automáticas de aumento de orçamento.

`whatsapp_click` é um indicador de intenção, não mensagem enviada. Configurar evento principal no GA4 e importar/vincular ao Ads somente após confirmar acesso e recebimento real; evitar contar simultaneamente a mesma ação pelo GA4 e por tag Ads independente. Pagamento e ativação são ações do proprietário, em etapa separada.

## Checklist que impede lançamento acidental

1. Confirmar conta, proprietário, moeda BRL e fuso. Revisar campanhas ativas sem alterar outras empresas.
2. Conferir destinos publicados, conversão real no GA4, atribuição e consentimento.
3. Revisar estimativas, geografia de presença, negativas, CPC e anúncios.
4. Confirmar teto total de R$ 150 e 15 dias na interface.
5. Proprietário faz pagamento, se exigido; nenhum cartão ou cobrança é autorizado nesta missão.
6. Obter autorização explícita de ativação. Sem ela, permanecer em rascunho, sem publicar anúncios.

Validação local: `node scripts/verify-marketing.mjs`. O teste garante orçamento/duração no artefato, status inativo, duas estruturas e limites de texto. Não verifica saldo, cobrança ou estado de uma conta externa.

Referências: [orçamento total](https://support.google.com/google-ads/answer/10486938), [criar campanha de pesquisa](https://support.google.com/google-ads/answer/9510373/create-a-search-campaign). Documentação consultada em 12/10/2026; conferir novamente na ativação.
