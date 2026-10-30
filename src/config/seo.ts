import { guides } from '../data/guides'

export const pageMetadata: Record<string, { title: string; description: string; image?: string }> = {
  '/guias': { title: 'Guias de hotel e creche para cães | Auzen Pet Resort', description: 'Planeje a estadia do seu cachorro: diferenças entre hotel e creche, preparação para viagens e orientações do Auzen em Lauro de Freitas.' },
  ...Object.fromEntries(guides.map(guide => [`/guias/${guide.slug}`, { title: `${guide.title} | Auzen`, description: guide.description, image: `${guide.image}-900.jpg` }])),
  '/': { title: 'Hotel e creche para cães em Lauro de Freitas | Auzen Pet Resort', description: 'Conheça o Auzen Pet Resort em Quingoma de Fora, Lauro de Freitas: hotel e creche para cães com espaço ao ar livre. Consulte datas pelo WhatsApp.' },
  '/hotel': { title: 'Hotel para cachorros em Lauro de Freitas | Auzen', description: 'Hospedagem para cães no Auzen Pet Resort, em Lauro de Freitas, BA. Conheça os horários, cuidados e orientações e consulte disponibilidade pelo WhatsApp.', image: 'hotel-rest-900.jpg' },
  '/creche': { title: 'Creche para cães em Lauro de Freitas | Auzen', description: 'Creche Auzen: segunda a sexta, das 7h às 18h. Diária R$ 60 e pacotes a partir de R$ 220 por mês. Natureza e brincadeiras em Lauro de Freitas.', image: 'garden-friends-900.jpg' },
  '/quem-somos': { title: 'Nossa história e o legado de Auzencio | Auzen Pet Resort', description: 'Conheça a história da família e o amor pelos animais que inspiraram o Auzen Pet Resort, hotel e creche para cães em Lauro de Freitas.' },
  '/servicos': { title: 'Serviços, horários e estimativa de diárias | Auzen', description: 'Compare hotel e creche para cães no Auzen. Consulte horários, estimativas de diárias e transporte mediante disponibilidade em Lauro de Freitas.' },
  '/promocoes': { title: 'Condições para estadias e consultas | Auzen Pet Resort', description: 'Veja as condições iniciais para estadias no Auzen e planeje os dias do seu cão. Valores, descontos e disponibilidade sujeitos à confirmação da equipe.' },
  '/espaco': { title: 'Conheça o espaço e o jardim | Auzen Pet Resort', description: 'Veja fotos do jardim e dos cães no Auzen Pet Resort, em Quingoma de Fora, Lauro de Freitas. Combine uma visita com a equipe pelo WhatsApp.' },
  '/contato': { title: 'Contato e localização em Lauro de Freitas | Auzen', description: 'Fale com a equipe do Auzen pelo WhatsApp: (71) 99397-2239. Rua da Jurema, Quingoma de Fora, Lauro de Freitas, BA. Visitas combinadas.' },
  '/informacoes': { title: 'O que levar e como preparar seu cão | Auzen Pet Resort', description: 'Prepare a carteira de vacinação, alimentação habitual e informações sobre saúde e rotina do seu cão. Confira as orientações para hotel e creche Auzen.' },
  '/reservar': { title: 'Solicitar reserva de hotel ou creche | Auzen Pet Resort', description: 'Escolha serviço e datas, informe a rotina do seu cão e prepare sua solicitação pelo WhatsApp. A equipe do Auzen confirma valores e disponibilidade.' },
  '/privacidade': { title: 'Privacidade e preferências de cookies | Auzen Pet Resort', description: 'Saiba como o Auzen trata os dados da solicitação de reserva, o contato pelo WhatsApp e suas preferências de medição de visitas.' },
}
export const notFoundMetadata = { title: 'Página não encontrada | Auzen Pet Resort', description: 'Este caminho não existe. Volte ao início ou conheça o hotel e a creche do Auzen Pet Resort.' }
export const publicPaths = Object.keys(pageMetadata)
