import { testimonials } from '../data/testimonials'

export function Testimonials() {
  if (testimonials.length === 0) return null

  return (
    <section aria-labelledby="testimonials-title">
      <h2 id="testimonials-title">Histórias de quem já viveu o Auzen</h2>
      {testimonials.map((testimonial) => (
        <figure key={`${testimonial.author}-${testimonial.quote}`}>
          <blockquote>{testimonial.quote}</blockquote>
          <figcaption>{testimonial.author}</figcaption>
        </figure>
      ))}
    </section>
  )
}
