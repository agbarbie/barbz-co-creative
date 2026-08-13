import type { Testimonial } from '../types';

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="card-premium">
      <div className="flex gap-1 text-gold-400">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>
      <p className="mt-4 font-accent text-lg italic leading-relaxed text-royal-600 dark:text-sky-100">
        “{testimonial.quote}”
      </p>
      <p className="mt-5 font-secondary text-sm font-semibold text-royal-700 dark:text-white">{testimonial.name}</p>
      <p className="font-secondary text-xs text-royal-400 dark:text-sky-200/70">{testimonial.role}</p>
    </div>
  );
}
