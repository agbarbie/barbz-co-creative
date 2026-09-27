import type { Service } from '../types';

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="card-premium">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-300/60 bg-gold-50 text-gold-500 dark:border-gold-400/30 dark:bg-gold-400/10 dark:text-gold-300">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="8" />
          <path d="M9 12h6M12 9v6" />
        </svg>
      </div>
      <h3 className="mt-5 font-accent text-xl italic font-medium text-royal-700 dark:text-white">{service.title}</h3>
      <p className="mt-2 font-secondary text-sm font-light leading-relaxed text-royal-400 dark:text-sky-200/70">{service.description}</p>
    </div>
  );
}