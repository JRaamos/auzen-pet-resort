export interface Testimonial {
  quote: string
  author: string
  context?: string
}

// A seção só entra em produção quando houver depoimentos reais e aprovados.
export const testimonials: Testimonial[] = []
