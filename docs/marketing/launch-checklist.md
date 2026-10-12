# Checklist de continuidade

## Site e conteúdo

- [x] Preservar projeto, identidade e formulário de reserva.
- [x] Páginas próprias de Hotel e Creche, SEO local e privacidade.
- [x] HTML estático, canonical e sitemap do domínio oficial.
- [x] Testes locais de reserva, navegação e consentimento.
- [x] Sete peças sociais e legendas com fotografias reais.
- [x] Painel gratuito local com dados ausentes explicitamente indisponíveis.
- [x] Registrar commit, deploy e testes de produção em `test-evidence.md`.

## Integrações

- [x] Search Console: propriedade verificada e inspeções/indexação solicitada registradas.
- [ ] Search Console: confirmar leitura bem-sucedida do sitemap (envio aceito, leitura com erro no painel).
- [x] GA4 do Auzen: propriedade 558547876, fluxo G-Y0Z1M3Z4RX do domínio oficial, medição automática desligada e integração publicada.
- [x] Teste de produção: ausência de coleta antes do consentimento; eventos enviados ao Google com HTTP 204; revogação validada.
- [x] Eventos reais de QA confirmados no DebugView; cliques não confundidos com reservas.
- [x] `whatsapp_click` marcado como evento principal, sem valor monetário fictício e sem duplicar o evento do código.
- [ ] Confirmar consolidação nos relatórios normais de aquisição/engajamento e atribuição UTM após processamento.
- [ ] GTM, se adotado, sem tag/visualização duplicada; Preview validado.
- [ ] Perfil da Empresa: controle legítimo, endereço/pin e dias confirmados, verificação humana quando exigida.
- [ ] Instagram/Facebook/WhatsApp Business: acesso administrativo legítimo e publicação confirmada.

## Campanha — NÃO ATIVAR nesta missão

- [x] Rascunho local: Pesquisa, dois grupos, frase/exata, negativas, URLs e textos validados.
- [x] Plano financeiro: teto total de R$ 150, duração de 15 dias, datas ainda não iniciadas.
- [x] Display, parceiros de pesquisa e expansão automática não previstos.
- [ ] Verificar conta/BRL/fuso, inventário de campanhas, Planejador e CPC na plataforma.
- [ ] Vincular GA4/Ads e validar conversão sem duplicidade.
- [ ] Confirmar suporte ao teto total na interface; se indisponível, revisar alternativa antes de qualquer ativação.
- [ ] Proprietário resolve confirmação de faturamento exigida pelo Ads, sem seguir oferta que supere o teto.
- [ ] Autorização explícita e separada para ativar os anúncios.

Não adotar recomendações automáticas que ampliem orçamento, geografia ou redes. Não mexer em campanhas, administradores ou ativos de outras empresas. IDs públicos de medição e verificação podem integrar o site; senhas, tokens privados e dados de pagamento não podem integrar o repositório.

Para manutenção: fonte do site em `src/`, metadados em `src/config/seo.ts`, dados comerciais em `src/config/contact.ts`, serviços em `src/data/services.ts`, campanha e conteúdo nesta pasta. Os relatórios devem distinguir implementado, publicado, recebido pela plataforma e resultado comercial.
