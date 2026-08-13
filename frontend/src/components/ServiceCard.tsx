import type { Service } from '../types';

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="card-premium">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-royal-600 text-gold-300">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12h8M12 8v8" />
        </svg>
      </div>
      <h3 className="mt-4 font-primary text-lg font-semibold text-royal-700 dark:text-white">{service.title}</h3>
      <p className="mt-2 font-secondary text-sm leading-relaxed text-royal-400 dark:text-sky-200/70">{service.description}</p>
    </div>
  );
}
